import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

const locks = new Map<string, Promise<unknown>>();

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

async function readRaw<T>(name: string, fallback: T): Promise<T> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(filePath(name), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(filePath(name), JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

async function writeRaw<T>(name: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath(name), JSON.stringify(data, null, 2), "utf-8");
}

/** Queue reads/writes per-collection to avoid concurrent write corruption in dev. */
function withLock<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(name) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  locks.set(
    name,
    next.catch(() => undefined)
  );
  return next;
}

export function collection<T extends { id: string }>(name: string, seed: T[] = []) {
  return {
    async all(): Promise<T[]> {
      return withLock(name, () => readRaw<T[]>(name, seed));
    },
    async find(predicate: (item: T) => boolean): Promise<T | undefined> {
      const items = await this.all();
      return items.find(predicate);
    },
    async filter(predicate: (item: T) => boolean): Promise<T[]> {
      const items = await this.all();
      return items.filter(predicate);
    },
    async insert(item: T): Promise<T> {
      return withLock(name, async () => {
        const items = await readRaw<T[]>(name, seed);
        items.unshift(item);
        await writeRaw(name, items);
        return item;
      });
    },
    async update(id: string, patch: Partial<T>): Promise<T | undefined> {
      return withLock(name, async () => {
        const items = await readRaw<T[]>(name, seed);
        const idx = items.findIndex((i) => i.id === id);
        if (idx === -1) return undefined;
        items[idx] = { ...items[idx], ...patch };
        await writeRaw(name, items);
        return items[idx];
      });
    },
    async remove(id: string): Promise<boolean> {
      return withLock(name, async () => {
        const items = await readRaw<T[]>(name, seed);
        const next = items.filter((i) => i.id !== id);
        await writeRaw(name, next);
        return next.length !== items.length;
      });
    },
    async replaceAll(items: T[]): Promise<void> {
      return withLock(name, () => writeRaw(name, items));
    },
  };
}

export function singleton<T>(name: string, seed: T) {
  return {
    async get(): Promise<T> {
      return withLock(name, () => readRaw<T>(name, seed));
    },
    async set(data: T): Promise<T> {
      return withLock(name, async () => {
        await writeRaw(name, data);
        return data;
      });
    },
    async patch(patch: Partial<T>): Promise<T> {
      return withLock(name, async () => {
        const current = await readRaw<T>(name, seed);
        const next = { ...current, ...patch };
        await writeRaw(name, next);
        return next;
      });
    },
  };
}

export function genId(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

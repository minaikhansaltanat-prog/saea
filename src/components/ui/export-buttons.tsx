"use client";

import { FileDown, FileSpreadsheet } from "lucide-react";
import { Button } from "./primitives";

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => JSON.stringify(row[h] ?? "")).join(","));
  }
  return lines.join("\n");
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportButtons({ rows, filename }: { rows: Record<string, unknown>[]; filename: string }) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        size="sm"
        variant="outlineNavy"
        onClick={() => download(`${filename}.csv`, toCsv(rows), "text/csv;charset=utf-8;")}
      >
        <FileSpreadsheet className="h-4 w-4" /> Excel (CSV)
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => window.print()}
      >
        <FileDown className="h-4 w-4" /> PDF
      </Button>
    </div>
  );
}

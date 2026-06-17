export const COUNTRIES = [
  { code: "KZ", label: "Қазақстан" },
  { code: "UZ", label: "Өзбекстан" },
  { code: "KG", label: "Қырғызстан" },
  { code: "TJ", label: "Тәжікстан" },
  { code: "TM", label: "Түрікменстан" },
  { code: "INTL", label: "Халықаралық" },
] as const;

export const INDUSTRIES = [
  { id: "agro", label: "Агро өнеркәсіп" },
  { id: "food", label: "Тағам өнімдері" },
  { id: "it", label: "IT" },
  { id: "digital", label: "Digital / Tech" },
  { id: "logistics", label: "Логистика" },
  { id: "customs", label: "Кеден қызметтері" },
  { id: "manufacturing", label: "Өнеркәсіп / Өндіріс" },
  { id: "trade", label: "Сауда" },
  { id: "medicine", label: "Медицина" },
  { id: "pharma", label: "Фармацевтика" },
  { id: "finance", label: "Қаржы" },
  { id: "construction", label: "Құрылыс" },
  { id: "textile", label: "Тоқыма" },
  { id: "energy", label: "Энергетика" },
  { id: "tourism", label: "Туризм" },
  { id: "education", label: "Білім беру" },
  { id: "telecom", label: "Телекоммуникация" },
  { id: "retail", label: "Бөлшек сауда" },
  { id: "real_estate", label: "Жылжымайтын мүлік" },
  { id: "automotive", label: "Автомобиль өнеркәсібі" },
] as const;

export const COMPANY_TYPES = [
  { id: "manufacturer", label: "Өндіруші" },
  { id: "seller", label: "Сатушы" },
  { id: "service", label: "Қызмет көрсетуші" },
  { id: "investor", label: "Инвестор" },
] as const;

export const SERVICE_DIRECTIONS = [
  { slug: "export-import", label: "Экспорт-Импорт" },
  { slug: "regional-collaboration", label: "Аймақтық коллаборация" },
  { slug: "science-business", label: "Ғылым–Бизнес" },
  { slug: "turnkey-consulting", label: "Өкілдік басқару" },
  { slug: "partner-network", label: "Серіктестік желісі" },
  { slug: "ai-digital", label: "ЖИ / Digital" },
  { slug: "investment", label: "Инвестиция" },
  { slug: "government-support", label: "Мемлекеттік қолдау" },
  { slug: "legal", label: "Заңдық-рәсімдік" },
  { slug: "financial-management", label: "Қаржылық басқару" },
] as const;

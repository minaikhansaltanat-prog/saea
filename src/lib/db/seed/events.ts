import type { EventItem } from "../types";

export const eventsSeed: EventItem[] = [
  {
    id: "event_1",
    slug: "ca-export-forum-2026",
    title: {
      kk: "Орта Азия Экспорт Форумы 2026",
      ru: "Форум экспорта Центральной Азии 2026",
      en: "Central Asia Export Forum 2026",
    },
    description: {
      kk: "5 елден экспорттаушылар, инвесторлар және мемлекеттік өкілдер бір алаңда жиналады.",
      ru: "Экспортёры, инвесторы и представители государства из 5 стран соберутся на одной площадке.",
      en: "Exporters, investors and government representatives from 5 countries gather on one platform.",
    },
    date: "2026-09-18",
    format: "offline",
    location: "Алматы, Қазақстан",
    cover: "/images/bg/meeting-room.webp",
    participantsCount: 184,
    capacity: 300,
  },
  {
    id: "event_2",
    slug: "ai-for-business-webinar",
    title: {
      kk: "Бизнес үшін ЖИ: тегін вебинар",
      ru: "ИИ для бизнеса: бесплатный вебинар",
      en: "AI for Business: free webinar",
    },
    description: {
      kk: "CRM/ERP автоматтандыру және AI-аудиттің бизнеске тигізетін нақты пайдасы туралы онлайн сессия.",
      ru: "Онлайн-сессия о реальной пользе автоматизации CRM/ERP и AI-аудита для бизнеса.",
      en: "An online session on the real business value of CRM/ERP automation and AI audits.",
    },
    date: "2026-07-05",
    format: "online",
    cover: "/images/bg/dashboard-presentation.webp",
    participantsCount: 412,
    capacity: 1000,
  },
  {
    id: "event_3",
    slug: "investor-matchmaking-day",
    title: {
      kk: "Инвестор Матчмейкинг Күні",
      ru: "День инвестор-мэтчмейкинга",
      en: "Investor Matchmaking Day",
    },
    description: {
      kk: "PREMIUM+ мүшелеріне арналған жабық кездесу — 30+ инвестор тікелей пітч тыңдайды.",
      ru: "Закрытая встреча для членов PREMIUM+ — 30+ инвесторов выслушают питчи напрямую.",
      en: "A closed-door meeting for PREMIUM+ members — 30+ investors hear pitches directly.",
    },
    date: "2026-08-22",
    format: "offline",
    location: "Ташкент, Өзбекстан",
    cover: "/images/bg/boardroom-analytics.webp",
    participantsCount: 56,
    capacity: 80,
  },
  {
    id: "event_4",
    slug: "regional-networking-mixer",
    title: {
      kk: "Аймақтық нетворкинг кеші",
      ru: "Вечер регионального нетворкинга",
      en: "Regional Networking Mixer",
    },
    description: {
      kk: "5 елдің кәсіпкерлерін біріктіретін бейресми кездесу — жаңа байланыс пен серіктестік мүмкіндіктері.",
      ru: "Неформальная встреча, объединяющая предпринимателей 5 стран — новые контакты и возможности партнёрства.",
      en: "An informal gathering bringing together entrepreneurs from 5 countries — new contacts and partnership opportunities.",
    },
    date: "2026-05-30",
    format: "offline",
    location: "Бішкек, Қырғызстан",
    cover: "/images/bg/handshake-network.webp",
    participantsCount: 97,
    capacity: 150,
  },
];

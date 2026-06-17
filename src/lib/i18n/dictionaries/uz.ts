import type { Dictionary } from "./kk";
import type { DeepPartial } from "../deep-merge";

const uz: DeepPartial<Dictionary> = {
  meta: { siteName: "OATU", siteNameFull: "Markaziy Osiyo Tadbirkorlari Uyushmasi", tagline: "Birgalikda Kuchlimiz" },
  nav: {
    home: "Bosh sahifa", about: "Biz haqimizda", services: "Xizmatlar", membership: "A'zolik",
    catalog: "B2B Katalog", news: "Yangiliklar", events: "Tadbirlar", team: "Jamoa", contact: "Aloqa",
    login: "Kirish", register: "Ro'yxatdan o'tish", dashboard: "Shaxsiy kabinet", admin: "Admin panel",
    partnerRegister: "Hamkor bo'lish", logout: "Chiqish",
  },
  header: { getQuote: "A'zo bo'lish", languages: "Tillar", topBarText: "Markaziy Osiyo tadbirkorlarining rasmiy uyushmasi" },
  footer: {
    about: "OATU — Markaziy Osiyo tadbirkorlarini birlashtiradigan, eksport, investitsiya va raqamli transformatsiya bo'yicha bepul/pullik maslahat beradigan va uni amalda joriy qiladigan mintaqaviy biznes-uyushma.",
    quickLinks: "Tezkor havolalar", servicesTitle: "Xizmatlar", contactsTitle: "Aloqa ma'lumotlari", legalTitle: "Yuridik ma'lumot",
    workingHours: "Dush–Juma 09:00 – 18:00", rights: "Barcha huquqlar himoyalangan.",
    legalName: "Yuridik nomi", bin: "BIN", address: "Joylashgan manzili", head: "Rahbar",
    registeredDate: "Ro'yxatdan o'tgan sana", followUs: "Bizni kuzating",
    addressValue: "Qozogʻiston, Almati shahri, Jetisu tumani, Ryskulov xiyoboni, 52-uy, 050050",
    headValue: "Yuridik shaxsning vakolatli organi tomonidan tayinlanadi", registeredDateValue: "2005-yil 14-avgust",
    legalNameValue: "“Central Asian Entrepreneurs Association” MChJ", binValue: "250840013754",
  },
  common: {
    learnMore: "Batafsil", readMore: "O'qish", viewAll: "Barchasini ko'rish", send: "Yuborish", submit: "Yuborish",
    cancel: "Bekor qilish", close: "Yopish", search: "Qidiruv", filter: "Filtr", filters: "Filtrlar", all: "Barchasi",
    save: "Saqlash", edit: "Tahrirlash", delete: "O'chirish", approve: "Tasdiqlash", reject: "Rad etish", back: "Orqaga",
    next: "Keyingisi", loading: "Yuklanmoqda...", comingSoon: "Tez kunda", required: "Majburiy", optional: "Ixtiyoriy",
    yes: "Ha", no: "Yo'q", download: "Yuklab olish", upload: "Yuklash", export: "Eksport", status: "Holat",
    actions: "Amallar", name: "Ism", email: "Email", phone: "Telefon", country: "Mamlakat", industry: "Soha",
    date: "Sana", company: "Kompaniya", success: "Muvaffaqiyatli bajarildi", error: "Xatolik yuz berdi",
    seeDetails: "Batafsil ko'rish", perMonth: "/ oy", perYear: "/ yil", free: "Bepul", contactUs: "Biz bilan bog'lanish", minutesShort: "daq",
  },
  home: {
    heroEyebrow: "Markaziy Osiyo Tadbirkorlari Uyushmasi",
    heroTitle: "Markaziy Osiyo tadbirkorlarini jahon bozoriga olib chiqamiz",
    heroSubtitle: "Biz faqat maslahat bilan cheklanmaymiz — eksport, investitsiya, davlat qo'llovi va raqamli transformatsiyani birgalikda, aniq natijagacha amalga oshiramiz.",
    heroCta1: "A'zo bo'lish", heroCta2: "Xizmatlar bilan tanishish", heroBadge: "5 davlatda 1800+ tadbirkor qo'llab-quvvatlandi",
    statTrustedBy: "Ishonch bildirgan tadbirkor", statProjects: "Yakunlangan loyiha", statSuccessRate: "Muvaffaqiyat darajasi", statExperience: "Yillik tajriba",
    servicesEyebrow: "11 asosiy yo'nalish", servicesTitle: "Biznesingiz uchun barcha xizmatlar — bir markazda",
    servicesSubtitle: "Eksportdan investitsiyaga, yuridik rasmiylashtirishdan AI auditigacha — har bir yo'nalishda chuqur ekspertiza.",
    viewAllServices: "Barcha 11 yo'nalishni ko'rish",
    ctaBannerTitle: "Biznes maqsadlaringizni birga muhokama qilaylik", ctaBannerButton: "Bepul maslahat olish",
    membershipTeaserTitle: "Biznesingizga mos tarifni tanlang",
  },
  about: { pageTitle: "Markaziy Osiyo Tadbirkorlari Uyushmasi", pageSubtitle: "2005-yildan beri tadbirkorlarga amaliy yordam ko'rsatib kelayotgan mintaqaviy uyushma" },
  services: { pageTitle: "Xizmatlar katalogi", ctaButton: "Ariza qoldirish" },
  membership: { pageTitle: "Biznesingizga mos tarifni tanlang", mostPopular: "Eng mashhur", choosePlan: "Shu tarifni tanlash" },
  catalog: { pageTitle: "Hamkorlar katalogi", searchPlaceholder: "Kompaniya, soha yoki kalit so'z bo'yicha qidirish...", viewProfile: "Profilni ko'rish", becomePartner: "Hamkor bo'lish" },
  news: { pageTitle: "Yangiliklar va maqolalar" },
  events: { pageTitle: "Forumlar, vebinarlar, networking", register: "Ro'yxatdan o'tish" },
  team: { pageTitle: "Ishonch va tajriba jamoasi" },
  contact: {
    pageTitle: "Biz bilan bog'laning", formName: "Ismingiz", formEmail: "Email manzilingiz", formMessage: "Xabaringiz",
    formSubmit: "Xabar yuborish", addressTitle: "Manzil", phoneTitle: "Telefon", emailTitle: "Email",
  },
  auth: {
    loginTitle: "Shaxsiy kabinetga kirish", registerTitle: "Ro'yxatdan o'tish", email: "Email", password: "Parol",
    fullName: "F.I.Sh.", companyName: "Kompaniya nomi", loginButton: "Kirish", registerButton: "Ro'yxatdan o'tish",
    withGoogle: "Google orqali kirish", withTelegram: "Telegram orqali kirish", memberTab: "A'zo sifatida", partnerTab: "Hamkor sifatida",
  },
  partner: {
    pageTitle: "Hamkor sifatida ro'yxatdan o'tish", companyName: "Kompaniya nomi", countryCity: "Mamlakat / Shahar",
    businessIndustry: "Biznes sohasi", contactName: "Mas'ul shaxs ismi", email: "Email", whatsapp: "Telefon (WhatsApp)",
    submit: "Arizani yuborish", successTitle: "Arizangiz qabul qilindi!",
  },
  dashboard: { sidebarOverview: "Umumiy ko'rinish", sidebarProfile: "Profil", sidebarInquiries: "B2B so'rovlar", sidebarTenders: "Tenderlar", welcomeBack: "Qaytib kelganingizdan xursandmiz" },
  admin: { sidebarDashboard: "Boshqaruv paneli", sidebarMembers: "A'zolar", sidebarPartners: "Hamkor arizalari", welcomeAdmin: "Boshqaruv markazi — Super Admin Panel" },
};

export default uz;

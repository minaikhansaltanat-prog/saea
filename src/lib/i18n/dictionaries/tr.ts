import type { Dictionary } from "./kk";
import type { DeepPartial } from "../deep-merge";

const tr: DeepPartial<Dictionary> = {
  meta: { siteName: "OAGD", siteNameFull: "Orta Asya Girişimciler Derneği", tagline: "Birlikte Güçlüyüz" },
  nav: {
    home: "Ana Sayfa", about: "Hakkımızda", services: "Hizmetler", membership: "Üyelik",
    catalog: "B2B Katalog", news: "Haberler", events: "Etkinlikler", team: "Ekip", contact: "İletişim",
    login: "Giriş", register: "Kayıt Ol", dashboard: "Kişisel Panel", admin: "Yönetim Paneli",
    partnerRegister: "Ortak Ol", logout: "Çıkış",
  },
  header: { getQuote: "Üye ol", languages: "Diller", topBarText: "Orta Asya girişimcilerinin resmi derneği" },
  footer: {
    about: "OAGD, Orta Asya girişimcilerini bir araya getiren; ihracat, yatırım ve dijital dönüşüm konularında ücretsiz/ücretli danışmanlık veren ve bunu uygulamada gerçekleştiren bölgesel bir iş derneğidir.",
    quickLinks: "Hızlı Bağlantılar", servicesTitle: "Hizmetler", contactsTitle: "İletişim Bilgileri", legalTitle: "Yasal Bilgiler",
    workingHours: "Pzt–Cum 09:00 – 18:00", rights: "Tüm hakları saklıdır.",
    legalName: "Tüzel adı", bin: "Vergi/Sicil No (BIN)", address: "Adres", head: "Yönetici",
    registeredDate: "Kayıt tarihi", followUs: "Bizi takip edin",
    addressValue: "Kazakistan, Almatı, Zhetısu bölgesi, Ryskulov Cad. 52, 050050",
    headValue: "Tüzel kişinin yetkili organı tarafından atanır", registeredDateValue: "14 Ağustos 2005",
    legalNameValue: "“Central Asian Entrepreneurs Association” Ltd. Şti.", binValue: "250840013754",
  },
  common: {
    learnMore: "Daha fazla", readMore: "Oku", viewAll: "Tümünü gör", send: "Gönder", submit: "Gönder",
    cancel: "İptal", close: "Kapat", search: "Ara", filter: "Filtre", filters: "Filtreler", all: "Tümü",
    save: "Kaydet", edit: "Düzenle", delete: "Sil", approve: "Onayla", reject: "Reddet", back: "Geri",
    next: "İleri", loading: "Yükleniyor...", comingSoon: "Yakında", required: "Zorunlu", optional: "İsteğe bağlı",
    yes: "Evet", no: "Hayır", download: "İndir", upload: "Yükle", export: "Dışa aktar", status: "Durum",
    actions: "İşlemler", name: "Ad", email: "E-posta", phone: "Telefon", country: "Ülke", industry: "Sektör",
    date: "Tarih", company: "Şirket", success: "İşlem başarılı", error: "Bir hata oluştu", seeDetails: "Detayları gör",
    perMonth: "/ ay", perYear: "/ yıl", free: "Ücretsiz", contactUs: "Bize ulaşın", minutesShort: "dk",
  },
  home: {
    heroEyebrow: "Orta Asya Girişimciler Derneği",
    heroTitle: "Orta Asya girişimcilerini dünya pazarına taşıyoruz",
    heroSubtitle: "Sadece danışmanlıkla sınırlı kalmıyoruz — ihracat, yatırım, devlet desteği ve dijital dönüşümü birlikte, somut sonuca kadar gerçekleştiriyoruz.",
    heroCta1: "Üye ol", heroCta2: "Hizmetleri incele", heroBadge: "5 ülkede 1800+ girişimciye destek verildi",
    statTrustedBy: "Bize güvenen girişimci", statProjects: "Tamamlanan proje", statSuccessRate: "Başarı oranı", statExperience: "Yıllık deneyim",
    servicesEyebrow: "11 temel alan", servicesTitle: "İşletmeniz için gereken her hizmet — tek noktada",
    servicesSubtitle: "İhracattan yatırıma, yasal kayıttan yapay zeka denetimine — her alanda derin uzmanlık.",
    viewAllServices: "11 alanın tümünü gör",
    ctaBannerTitle: "İş hedeflerinizi birlikte ele alalım", ctaBannerButton: "Ücretsiz danışmanlık al",
    membershipTeaserTitle: "İşletmenize uygun planı seçin",
  },
  about: { pageTitle: "Orta Asya Girişimciler Derneği", pageSubtitle: "2005'ten beri girişimcilere pratik destek sağlayan bölgesel dernek" },
  services: { pageTitle: "Hizmet kataloğu", ctaButton: "Talep gönder" },
  membership: { pageTitle: "İşletmenize uygun planı seçin", mostPopular: "En popüler", choosePlan: "Bu planı seç" },
  catalog: { pageTitle: "Ortak kataloğu", searchPlaceholder: "Şirket, sektör veya anahtar kelimeyle ara...", viewProfile: "Profili gör", becomePartner: "Ortak ol" },
  news: { pageTitle: "Haberler ve makaleler" },
  events: { pageTitle: "Forumlar, web seminerleri, networking", register: "Kayıt ol" },
  team: { pageTitle: "Güven ve deneyim ekibi" },
  contact: {
    pageTitle: "Bizimle iletişime geçin", formName: "Adınız", formEmail: "E-posta adresiniz", formMessage: "Mesajınız",
    formSubmit: "Mesaj gönder", addressTitle: "Adres", phoneTitle: "Telefon", emailTitle: "E-posta",
  },
  auth: {
    loginTitle: "Kişisel panele giriş", registerTitle: "Kayıt Ol", email: "E-posta", password: "Şifre",
    fullName: "Ad Soyad", companyName: "Şirket adı", loginButton: "Giriş yap", registerButton: "Kayıt ol",
    withGoogle: "Google ile giriş yap", withTelegram: "Telegram ile giriş yap", memberTab: "Üye olarak", partnerTab: "Ortak olarak",
  },
  partner: {
    pageTitle: "Ortak olarak kaydolun", companyName: "Şirket adı", countryCity: "Ülke / Şehir",
    businessIndustry: "İş sektörü", contactName: "Yetkili kişi adı", email: "E-posta", whatsapp: "Telefon (WhatsApp)",
    submit: "Başvuruyu gönder", successTitle: "Başvurunuz alındı!",
  },
  dashboard: { sidebarOverview: "Genel bakış", sidebarProfile: "Profil", sidebarInquiries: "B2B talepleri", sidebarTenders: "İhaleler", welcomeBack: "Tekrar hoş geldiniz" },
  admin: { sidebarDashboard: "Kontrol paneli", sidebarMembers: "Üyeler", sidebarPartners: "Ortak başvuruları", welcomeAdmin: "Komuta merkezi — Süper Yönetim Paneli" },
};

export default tr;

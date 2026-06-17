import type { Dictionary } from "./kk";
import type { DeepPartial } from "../deep-merge";

const ky: DeepPartial<Dictionary> = {
  meta: { siteName: "БАКА", siteNameFull: "Борбордук Азия Ишкерлер Коому", tagline: "Биргеликте Күчтүүбүз" },
  nav: {
    home: "Башкы бет", about: "Биз жөнүндө", services: "Кызматтар", membership: "Мүчөлүк",
    catalog: "B2B Каталог", news: "Жаңылыктар", events: "Иш-чаралар", team: "Команда", contact: "Байланыш",
    login: "Кирүү", register: "Каттоо", dashboard: "Жеке кабинет", admin: "Админ панели",
    partnerRegister: "Өнөктөш болуу", logout: "Чыгуу",
  },
  header: { getQuote: "Мүчө болуу", languages: "Тилдер", topBarText: "Борбордук Азия ишкерлеринин расмий коому" },
  footer: {
    about: "БАКА — Борбордук Азия ишкерлерин бириктирген, экспорт, инвестиция жана санариптик трансформация боюнча акысыз/акылуу кеңеш берген жана аны иш жүзүнде ишке ашырган аймактык бизнес-кошуун.",
    quickLinks: "Тез шилтемелер", servicesTitle: "Кызматтар", contactsTitle: "Байланыш маалыматы", legalTitle: "Юридикалык маалымат",
    workingHours: "Дүй–Жума 09:00 – 18:00", rights: "Бардык укуктар корголгон.",
    legalName: "Юридикалык аталышы", bin: "БИН", address: "Жайгашкан жери", head: "Жетекчи",
    registeredDate: "Каттоо күнү", followUs: "Бизди ээрчиңиз",
    addressValue: "Казакстан, Алматы шаары, Жетысу району, Рыскулов проспекти, 52-үй, 050050",
    headValue: "Юридикалык жактын ыйгарым укуктуу органы тарабынан дайындалат", registeredDateValue: "2005-жылдын 14-августу",
    legalNameValue: "“Central Asian Entrepreneurs Association” ЖЧК", binValue: "250840013754",
  },
  common: {
    learnMore: "Толугу менен", readMore: "Окуу", viewAll: "Баарын көрүү", send: "Жөнөтүү", submit: "Жөнөтүү",
    cancel: "Жокко чыгаруу", close: "Жабуу", search: "Издөө", filter: "Чыпка", filters: "Чыпкалар", all: "Баары",
    save: "Сактоо", edit: "Өзгөртүү", delete: "Өчүрүү", approve: "Бекитүү", reject: "Кабыл албоо", back: "Артка",
    next: "Кийинки", loading: "Жүктөлүп жатат...", comingSoon: "Жакында", required: "Милдеттүү", optional: "Каалоо боюнча",
    yes: "Ооба", no: "Жок", download: "Жүктөп алуу", upload: "Жүктөө", export: "Экспорт", status: "Статус",
    actions: "Аракеттер", name: "Аты", email: "Email", phone: "Телефон", country: "Өлкө", industry: "Тармак",
    date: "Күн", company: "Компания", success: "Ийгиликтүү аткарылды", error: "Ката кетти", seeDetails: "Толугу менен көрүү",
    perMonth: "/ ай", perYear: "/ жыл", free: "Акысыз", contactUs: "Бизге кайрылуу", minutesShort: "мүн",
  },
  home: {
    heroEyebrow: "Борбордук Азия Ишкерлер Коому",
    heroTitle: "Борбордук Азия ишкерлерин дүйнөлүк рынокко алып чыгабыз",
    heroSubtitle: "Биз кеңеш берүү менен чектелбейбиз — экспорт, инвестиция, мамлекеттик колдоо жана санариптик трансформацияны чогуу, так жыйынтыкка чейин ишке ашырабыз.",
    heroCta1: "Мүчө болуу", heroCta2: "Кызматтар менен таанышуу", heroBadge: "5 өлкөдө 1800+ ишкер колдоо алды",
    statTrustedBy: "Ишеним көрсөткөн ишкер", statProjects: "Аяктаган долбоор", statSuccessRate: "Ийгилик деңгээли", statExperience: "Жылдык тажрыйба",
    servicesEyebrow: "11 негизги багыт", servicesTitle: "Бизнесиңизге керектүү бардык кызмат — бир жерде",
    servicesSubtitle: "Экспорттон инвестицияга, юридикалык каттоодон AI-аудитке чейин — ар бир багытта терең тажрыйба.",
    viewAllServices: "Бардык 11 багытты көрүү",
    ctaBannerTitle: "Бизнес максаттарыңызды чогуу талкуулайлы", ctaBannerButton: "Акысыз кеңеш алуу",
    membershipTeaserTitle: "Бизнесиңизге ылайык тарифти тандаңыз",
  },
  about: { pageTitle: "Борбордук Азия Ишкерлер Коому", pageSubtitle: "2005-жылдан бери ишкерлерге практикалык колдоо көрсөтүп келе жаткан аймактык коом" },
  services: { pageTitle: "Кызматтар каталогу", ctaButton: "Арыз калтыруу" },
  membership: { pageTitle: "Бизнесиңизге ылайык тарифти тандаңыз", mostPopular: "Эң популярдуу", choosePlan: "Бул тарифти тандоо" },
  catalog: { pageTitle: "Өнөктөштөр каталогу", searchPlaceholder: "Компания, тармак же ачкыч сөз боюнча издөө...", viewProfile: "Профилди көрүү", becomePartner: "Өнөктөш болуу" },
  news: { pageTitle: "Жаңылыктар жана макалалар" },
  events: { pageTitle: "Форумдар, вебинарлар, тармактык иш-чаралар", register: "Катталуу" },
  team: { pageTitle: "Ишеним жана тажрыйба командасы" },
  contact: {
    pageTitle: "Биз менен байланышыңыз", formName: "Атыңыз", formEmail: "Email дарегиңиз", formMessage: "Билдирүүңүз",
    formSubmit: "Билдирүү жөнөтүү", addressTitle: "Дарек", phoneTitle: "Телефон", emailTitle: "Email",
  },
  auth: {
    loginTitle: "Жеке кабинетке кирүү", registerTitle: "Каттоо", email: "Email", password: "Сырсөз",
    fullName: "Аты-жөнү", companyName: "Компания аталышы", loginButton: "Кирүү", registerButton: "Каттоо",
    withGoogle: "Google аркылуу кирүү", withTelegram: "Telegram аркылуу кирүү", memberTab: "Мүчө катары", partnerTab: "Өнөктөш катары",
  },
  partner: {
    pageTitle: "Өнөктөш катары катталуу", companyName: "Компания аталышы", countryCity: "Өлкө / Шаар",
    businessIndustry: "Бизнес тармагы", contactName: "Жооптуу адамдын аты", email: "Email", whatsapp: "Телефон (WhatsApp)",
    submit: "Арызды жөнөтүү", successTitle: "Арызыңыз кабыл алынды!",
  },
  dashboard: { sidebarOverview: "Жалпы көрүнүш", sidebarProfile: "Профиль", sidebarInquiries: "B2B сурамдар", sidebarTenders: "Тендерлер", welcomeBack: "Кайра кош келдиңиз" },
  admin: { sidebarDashboard: "Башкаруу панели", sidebarMembers: "Мүчөлөр", sidebarPartners: "Өнөктөш арыздары", welcomeAdmin: "Башкаруу борбору — Super Admin Panel" },
};

export default ky;

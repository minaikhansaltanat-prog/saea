import type { TeamMember } from "../types";

// NOTE: Per the association's official charter, the head of the legal entity is
// "appointed by the authorized body" rather than a fixed named individual — so the
// lead card intentionally uses the role title (matching the legal document) instead
// of a personal name. The remaining seats are left as open role placeholders for the
// admin to fill in via the Team CRUD module once real staff are confirmed.
export const teamSeed: TeamMember[] = [
  {
    id: "team_head",
    name: "Қауымдастық басшысы",
    position: {
      kk: "Басшы — заңды тұлғаның уәкілетті органымен тағайындалған",
      ru: "Руководитель — назначается уполномоченным органом юридического лица",
      en: "Director — appointed by the authorized body of the legal entity",
    },
    bio: {
      kk: "Қауымдастықтың операциялық қызметін басқарады, стратегиялық бағыттар мен серіктестік келісімдерге жауап береді.",
      ru: "Руководит операционной деятельностью ассоциации, отвечает за стратегические направления и партнёрские соглашения.",
      en: "Oversees the association's operations and is responsible for strategic direction and partnership agreements.",
    },
    photo: "/images/team/leader-square.webp",
    order: 1,
  },
  {
    id: "team_partnerships",
    name: "Серіктестік бағыты жетекшісі",
    position: {
      kk: "Серіктестік және B2B бағыты жетекшісі",
      ru: "Руководитель направления партнёрства и B2B",
      en: "Head of Partnerships & B2B",
    },
    bio: {
      kk: "Серіктес өтінімдерін қарап, B2B каталогты және аймақаралық коллаборацияны басқарады.",
      ru: "Рассматривает заявки партнёров, управляет B2B-каталогом и межрегиональной коллаборацией.",
      en: "Reviews partner applications and oversees the B2B catalog and cross-regional collaboration.",
    },
    photo: "",
    order: 2,
  },
  {
    id: "team_legal",
    name: "Заң бөлімі жетекшісі",
    position: { kk: "Заңдық-рәсімдік қолдау жетекшісі", ru: "Руководитель юридической поддержки", en: "Head of Legal & Compliance" },
    bio: {
      kk: "Тіркеу, лицензиялау және заңдық дауларды шешу бойынша мүшелерге қолдау көрсетеді.",
      ru: "Поддерживает членов по вопросам регистрации, лицензирования и разрешения юридических споров.",
      en: "Supports members with incorporation, licensing and dispute resolution.",
    },
    photo: "",
    order: 3,
  },
  {
    id: "team_finance",
    name: "Қаржы бөлімі жетекшісі",
    position: { kk: "Қаржылық басқару жетекшісі", ru: "Руководитель финансового направления", en: "Head of Financial Management" },
    bio: {
      kk: "Бухгалтерия аутсорсингі, субсидия және CFO аутсорсинг қызметтерін үйлестіреді.",
      ru: "Координирует услуги бухгалтерского аутсорсинга, субсидий и CFO на аутсорсе.",
      en: "Coordinates accounting outsourcing, subsidy navigation and outsourced CFO services.",
    },
    photo: "",
    order: 4,
  },
];

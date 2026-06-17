import type { Dictionary } from "./kk";
import type { DeepPartial } from "../deep-merge";

// Best-effort translation (Simplified Chinese). Chrome (nav/common/footer/auth) is complete;
// long-form marketing copy falls back to Kazakh where not yet localized.
const zh: DeepPartial<Dictionary> = {
  meta: { siteName: "中亚协会", siteNameFull: "中亚企业家协会", tagline: "团结更强大" },
  nav: {
    home: "首页", about: "关于我们", services: "服务", membership: "会员",
    catalog: "B2B 名录", news: "新闻", events: "活动", team: "团队", contact: "联系我们",
    login: "登录", register: "注册", dashboard: "个人中心", admin: "管理后台",
    partnerRegister: "成为合作伙伴", logout: "退出",
  },
  header: { getQuote: "成为会员", languages: "语言", topBarText: "中亚企业家官方协会" },
  footer: {
    about: "中亚企业家协会是联合中亚地区企业家的区域性商业协会，提供出口、投资和数字化转型方面的免费/付费咨询，并协助落地实施。",
    quickLinks: "快速链接", servicesTitle: "服务", contactsTitle: "联系信息", legalTitle: "法律信息",
    workingHours: "周一至周五 09:00–18:00", rights: "保留所有权利。",
    legalName: "法定名称", bin: "商业登记号", address: "注册地址", head: "负责人",
    registeredDate: "注册日期", followUs: "关注我们",
    addressValue: "哈萨克斯坦, 阿拉木图市, Zhetysu 区, Ryskulov 大街 52 号, 050050",
    headValue: "由法人授权机构任命", registeredDateValue: "2005年8月14日",
    legalNameValue: "“Central Asian Entrepreneurs Association” 有限责任公司", binValue: "250840013754",
  },
  common: {
    learnMore: "了解更多", readMore: "阅读", viewAll: "查看全部", send: "发送", submit: "提交",
    cancel: "取消", close: "关闭", search: "搜索", filter: "筛选", filters: "筛选条件", all: "全部",
    save: "保存", edit: "编辑", delete: "删除", approve: "批准", reject: "拒绝", back: "返回",
    next: "下一步", loading: "加载中...", comingSoon: "即将上线", required: "必填", optional: "可选",
    yes: "是", no: "否", download: "下载", upload: "上传", export: "导出", status: "状态",
    actions: "操作", name: "姓名", email: "邮箱", phone: "电话", country: "国家", industry: "行业",
    date: "日期", company: "公司", success: "操作成功", error: "发生错误", seeDetails: "查看详情",
    perMonth: "/月", perYear: "/年", free: "免费", contactUs: "联系我们", minutesShort: "分钟",
  },
  home: {
    heroEyebrow: "中亚企业家协会", heroTitle: "助力中亚企业家走向全球市场",
    heroSubtitle: "我们不止于建议——携手企业完成出口、投资、政府支持及数字化转型的全过程，直到取得实际成果。",
    heroCta1: "成为会员", heroCta2: "查看服务", heroBadge: "已为5个国家1800+企业家提供支持",
    statTrustedBy: "信赖我们的企业", statProjects: "已完成项目", statSuccessRate: "成功率", statExperience: "年经验",
    servicesEyebrow: "11大核心方向", servicesTitle: "您企业所需的一切服务，一站搞定",
    servicesSubtitle: "从出口到投资，从法律注册到AI审计——每个方向均有深厚专业经验。",
    viewAllServices: "查看全部11个方向",
    ctaBannerTitle: "让我们一起讨论您的业务目标", ctaBannerButton: "获取免费咨询",
    membershipTeaserTitle: "选择适合您企业的方案",
  },
  about: { pageTitle: "中亚企业家协会", pageSubtitle: "自2005年起为企业家提供切实支持的区域协会" },
  services: { pageTitle: "服务目录", ctaButton: "提交申请" },
  membership: { pageTitle: "选择适合您企业的方案", mostPopular: "最受欢迎", choosePlan: "选择此方案" },
  catalog: { pageTitle: "合作伙伴名录", searchPlaceholder: "按公司、行业或关键词搜索...", viewProfile: "查看资料", becomePartner: "成为合作伙伴" },
  news: { pageTitle: "新闻与文章" },
  events: { pageTitle: "论坛、网络研讨会与社交活动", register: "报名" },
  team: { pageTitle: "信任与专业的团队" },
  contact: {
    pageTitle: "联系我们", formName: "您的姓名", formEmail: "您的邮箱", formMessage: "您的留言",
    formSubmit: "发送留言", addressTitle: "地址", phoneTitle: "电话", emailTitle: "邮箱",
  },
  auth: {
    loginTitle: "登录个人中心", registerTitle: "注册", email: "邮箱", password: "密码",
    fullName: "姓名", companyName: "公司名称", loginButton: "登录", registerButton: "注册",
    withGoogle: "使用 Google 登录", withTelegram: "使用 Telegram 登录", memberTab: "会员身份", partnerTab: "合作伙伴身份",
  },
  partner: {
    pageTitle: "合作伙伴注册", companyName: "公司名称", countryCity: "国家/城市", businessIndustry: "业务行业",
    contactName: "联系人姓名", email: "邮箱", whatsapp: "电话 (WhatsApp)", submit: "提交申请",
    successTitle: "申请已收到！",
  },
  dashboard: { sidebarOverview: "概览", sidebarProfile: "资料", sidebarInquiries: "B2B 咨询", sidebarTenders: "招标", welcomeBack: "欢迎回来" },
  admin: { sidebarDashboard: "控制面板", sidebarMembers: "会员", sidebarPartners: "合作伙伴申请", welcomeAdmin: "指挥中心 — 超级管理面板" },
};

export default zh;

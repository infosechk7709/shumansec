import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  Cloud,
  Crosshair,
  ExternalLink,
  Fingerprint,
  KeyRound,
  LaptopMinimal,
  LockKeyhole,
  MailWarning,
  Menu,
  Network,
  Radar,
  Search,
  Shield,
  ShieldAlert,
  Siren,
  Sparkles,
  Target,
  TriangleAlert,
  X,
} from "lucide-react";

type Language = "en" | "zh";
type Bilingual = { en: string; zh: string };
type FAQ = {
  id: number;
  category: Bilingual;
  icon: LucideIcon;
  question: Bilingual;
  answer: Bilingual;
  bullets: Bilingual[];
};

const t = (value: Bilingual, lang: Language) => value[lang];

const copy = {
  eyebrow: { en: "SHUMAN / INFOSEC FIELD GUIDE", zh: "SHUMAN / 資安實戰指南" },
  heroTitle: { en: "Security is a habit,\nnot a panic button.", zh: "資安係一種習慣，\n唔係出事先撳嘅掣。" },
  heroBody: {
    en: "A practical field guide for teams who want to turn information security from a vague worry into a clear, repeatable operating rhythm.",
    zh: "俾想將資訊安全由一種模糊嘅擔心，變成清晰、可重複落實嘅日常工作節奏嘅團隊。",
  },
  explore: { en: "Explore the guide", zh: "睇下實戰指南" },
  viewTopics: { en: "View threat topics", zh: "睇威脅主題" },
  language: { en: "Language", zh: "語言" },
  searchTitle: { en: "Search the field guide", zh: "搜尋資安指南" },
  searchPlaceholder: { en: "Try ransomware, VPN, or MFA", zh: "試下搜尋「勒索病毒」、「VPN」或「MFA」" },
  allTopics: { en: "All topics", zh: "全部主題" },
  incident: { en: "If something happens", zh: "萬一出事" },
  responseTitle: { en: "Slow the blast radius.", zh: "先控制擴散，再處理問題。" },
  responseBody: {
    en: "A calm response starts before the incident. Keep this five-step sequence visible, rehearsed and owned by named people.",
    zh: "冷靜應變要喺事件發生之前開始。將以下五步放喺當眼位置，定期演練，並清楚分配負責人。",
  },
  readMore: { en: "Read the answer", zh: "睇答案" },
  showing: { en: "Showing", zh: "而家顯示" },
  topics: { en: "topics", zh: "個主題" },
  noResults: { en: "No matching field notes", zh: "搵唔到相關嘅資安筆記" },
  noResultsBody: { en: "Try a broader keyword or reset the filters.", zh: "試下用闊啲嘅關鍵字，或者重設篩選。" },
  reset: { en: "Reset search", zh: "重設搜尋" },
  footer: { en: "Security clarity for teams building what comes next.", zh: "俾建立未來嘅團隊，一份清晰嘅資安方向。" },
};

const categories: Bilingual[] = [
  { en: "Foundations", zh: "基本概念" },
  { en: "Threats", zh: "常見威脅" },
  { en: "Response", zh: "事件應變" },
  { en: "Operations", zh: "日常管理" },
];

const faqs: FAQ[] = [
  {
    id: 1,
    category: categories[0],
    icon: Shield,
    question: { en: "What are the three non-negotiables of information security?", zh: "資訊安全有邊三樣基本要求？" },
    answer: {
      en: "The CIA triad is a useful starting point: keep the right data private, keep it trustworthy, and keep it available when the business needs it.",
      zh: "CIA 三要素係一個好實用嘅起點：保護資料機密、確保資料冇畀人改過，同埋喺業務需要嗰陣可以用到。",
    },
    bullets: [
      { en: "Confidentiality — only the right people can see it.", zh: "機密性 — 只畀應該睇到嘅人存取。" },
      { en: "Integrity — the information stays accurate and untampered.", zh: "完整性 — 資料保持準確，冇畀人偷偷改動。" },
      { en: "Availability — people and systems can access it when needed.", zh: "可用性 — 需要嗰陣，人同系統都可以正常使用。" },
    ],
  },
  {
    id: 2,
    category: categories[2],
    icon: Siren,
    question: { en: "What should happen when a security incident is detected?", zh: "發現資安事件之後應該點做？" },
    answer: {
      en: "Move quickly, but do not destroy evidence. A named incident lead should coordinate detection, containment, investigation, recovery and the lessons learned.",
      zh: "要快，但唔好破壞證據。由指定嘅事件負責人統籌偵測、隔離、調查、復原，同埋事後檢討。",
    },
    bullets: [
      { en: "Detect and notify through a known escalation path.", zh: "即時偵測，跟既定通報路線通知相關人員。" },
      { en: "Isolate affected devices and limit lateral movement.", zh: "隔離受影響設備，限制攻擊橫向擴散。" },
      { en: "Preserve logs, investigate, restore, then improve.", zh: "保存紀錄、調查、復原，最後改善流程。" },
    ],
  },
  {
    id: 3,
    category: categories[0],
    icon: Network,
    question: { en: "What is the difference between network security and information security?", zh: "網絡安全同資訊安全有咩分別？" },
    answer: {
      en: "Network security protects connections and traffic. Information security protects the data across its whole lifecycle. They work together; neither is enough on its own.",
      zh: "網絡安全主要守住連線同流量；資訊安全就保護資料由儲存、處理到使用嘅成個生命周期。兩者要一齊做，單靠其中一樣唔夠。",
    },
    bullets: [
      { en: "Network security guards the doorway and the path.", zh: "網絡安全守住入口同傳輸條路。" },
      { en: "Information security protects the asset itself.", zh: "資訊安全保護資料本身。" },
      { en: "Identity, access and internal process close the gap between them.", zh: "身份、權限同內部流程，先可以填補兩者之間嘅缺口。" },
    ],
  },
  {
    id: 4,
    category: categories[1],
    icon: LockKeyhole,
    question: { en: "How do we prepare for ransomware?", zh: "點樣預防同應對勒索病毒？" },
    answer: {
      en: "Assume one device will eventually be compromised. Resilience comes from fast isolation, least privilege, offline or immutable backups and a tested recovery path.",
      zh: "假設總有一部設備會中招。真正嘅韌性來自快速隔離、最小權限、離線或不可刪改嘅備份，同埋試過真係行得通嘅復原流程。",
    },
    bullets: [
      { en: "Isolate the infected device immediately; do not wait for certainty.", zh: "一發現感染就即時隔離，唔好等到百分百肯定先做。" },
      { en: "Confirm affected systems, accounts and data before restoring.", zh: "復原之前先確認受影響嘅系統、帳號同資料。" },
      { en: "Keep versions and an off-site copy so recovery is possible.", zh: "保留版本，同埋存一份異地副本，先有得還原。" },
    ],
  },
  {
    id: 5,
    category: categories[1],
    icon: MailWarning,
    question: { en: "How can people spot a phishing email?", zh: "點樣快速辨認釣魚郵件？" },
    answer: {
      en: "Phishing works by manufacturing urgency. Pause before clicking, check the sender and destination, and verify unusual requests through a second channel.",
      zh: "釣魚郵件最常用急迫感令人失去判斷。撳之前停一停，檢查寄件者同連結，遇到古怪要求就用第二個渠道核實。",
    },
    bullets: [
      { en: "Is the message trying to make you panic or rush?", zh: "封信係咪刻意令你驚或者催你即刻做？" },
      { en: "Does the sender address and link make sense?", zh: "寄件者地址同連結係咪合理？" },
      { en: "Is the requested action unusual for that person or team?", zh: "要求嘅操作係咪唔似嗰個人或部門平時會做？" },
    ],
  },
  {
    id: 6,
    category: categories[1],
    icon: Radar,
    question: { en: "What makes an APT different from a noisy attack?", zh: "APT 進階持續性攻擊有咩特徵？" },
    answer: {
      en: "Advanced persistent threats are patient and targeted. They hide inside normal behaviour, use legitimate accounts and expand slowly from one foothold.",
      zh: "APT 有耐性又有目標，會混入正常操作，利用合法帳號，慢慢由一個入侵點擴大到其他系統。",
    },
    bullets: [
      { en: "Long dwell time and low-frequency activity.", zh: "長期潛伏，行為低頻而且唔易察覺。" },
      { en: "Targeted intelligence gathering against a specific organisation.", zh: "針對特定機構持續收集情報。" },
      { en: "EDR/MDR plus email defence helps detect the whole path.", zh: "EDR/MDR 加郵件防護，有助睇到成條攻擊路徑。" },
    ],
  },
  {
    id: 7,
    category: categories[0],
    icon: KeyRound,
    question: { en: "Is a VPN automatically safe?", zh: "有 VPN 就一定安全？" },
    answer: {
      en: "A VPN encrypts the tunnel, not the whole situation. A stolen account, an over-permissive route or an infected laptop can still turn it into a bridge for attackers.",
      zh: "VPN 只係加密條通道，唔代表成件事自動安全。帳號被盜、開放太多權限，或者部手提電腦已經中招，都可以令 VPN 變成攻擊者嘅橋。",
    },
    bullets: [
      { en: "Use MFA and grant access only to required systems.", zh: "用 MFA，只開放真正需要嘅系統權限。" },
      { en: "Check endpoint health before and during access.", zh: "連線前同連線期間都要檢查端點狀態。" },
      { en: "Watch for unusual access and lateral movement.", zh: "監察異常存取同橫向移動。" },
    ],
  },
  {
    id: 8,
    category: categories[2],
    icon: Crosshair,
    question: { en: "Penetration testing vs vulnerability scanning — what is the difference?", zh: "滲透測試同弱點掃描有咩分別？" },
    answer: {
      en: "Scanning finds known weaknesses at scale. A penetration test simulates an attacker to prove whether key weaknesses can be chained into real impact.",
      zh: "弱點掃描係大規模搵已知漏洞；滲透測試就模擬攻擊者，驗證關鍵漏洞係咪真係可以串連成實際影響。",
    },
    bullets: [
      { en: "Scan to build a broad view of the attack surface.", zh: "用掃描建立整體攻擊面嘅風險地圖。" },
      { en: "Test to validate impact on important systems.", zh: "用測試驗證重要系統嘅實際影響。" },
      { en: "Retest after remediation to close the loop.", zh: "修補之後複測，先可以真正完成閉環。" },
    ],
  },
  {
    id: 9,
    category: categories[3],
    icon: BriefcaseBusiness,
    question: { en: "Do small and medium businesses really need security?", zh: "中小企真係需要做資訊安全？" },
    answer: {
      en: "Yes. Smaller teams are often targeted precisely because their controls are lighter, and one outage or data leak can have an outsized business impact.",
      zh: "需要。中小企反而容易因為防護較薄弱而成為目標，而一次停機或者資料外洩，對營運同客戶信任嘅打擊可以好大。",
    },
    bullets: [
      { en: "Start with identity, backups and endpoint protection.", zh: "先由身份管理、備份同端點防護做起。" },
      { en: "Run regular security checks instead of waiting for a crisis.", zh: "定期做資安檢測，唔好等出事先處理。" },
      { en: "Use specialist monitoring when internal headcount is limited.", zh: "內部人手有限，就用專業監控補足 7×24 能力。" },
    ],
  },
  {
    id: 10,
    category: categories[3],
    icon: Target,
    question: { en: "Where should a company start?", zh: "企業資安應該由邊度開始？" },
    answer: {
      en: "Do not start with the loudest product demo. Start by mapping critical assets, understanding business impact and fixing the highest-risk gaps first.",
      zh: "唔好由最花巧嘅產品示範開始。先盤點關鍵資產，了解對業務嘅影響，再優先修補最高風險嘅缺口。",
    },
    bullets: [
      { en: "Map systems, data and accounts that the business cannot lose.", zh: "盤點企業唔可以失去嘅系統、資料同帳號。" },
      { en: "Use health checks, scanning or testing to see the real risk.", zh: "用資安健診、弱點掃描或測試睇清楚真實風險。" },
      { en: "Keep monitoring and reviewing as the business changes.", zh: "隨業務變化持續監察同檢討，資安唔係一次性工程。" },
    ],
  },
  {
    id: 11,
    category: categories[3],
    icon: Cloud,
    question: { en: "How does cloud backup strengthen resilience?", zh: "雲端備份點樣提升資料安全？" },
    answer: {
      en: "The value is not only storage; it is recoverability. Encryption, version history, central monitoring and an off-site copy reduce the cost of a bad day.",
      zh: "雲端備份嘅價值唔止係儲存，而係可以復原。加密、版本管理、集中監察同異地副本，可以減低出事嗰日嘅損失。",
    },
    bullets: [
      { en: "Use layered local, cloud and off-site copies.", zh: "整合本地、雲端同異地嘅多層備份。" },
      { en: "Protect backup access as carefully as production access.", zh: "備份權限要同正式系統一樣嚴格保護。" },
      { en: "Test file, folder and service-level restore paths.", zh: "實際測試檔案、資料夾同服務層面嘅還原流程。" },
    ],
  },
  {
    id: 12,
    category: categories[3],
    icon: Bot,
    question: { en: "How do security teams avoid over-relying on AI?", zh: "資安人員點樣避免過度依賴 AI？" },
    answer: {
      en: "Use AI to accelerate analysis, not to outsource judgement. People still need the context of the architecture, the business and the attack story.",
      zh: "用 AI 加快分析，唔好將判斷完全外判畀 AI。人仍然要理解架構、業務背景同成條攻擊故事。",
    },
    bullets: [
      { en: "Validate severity against the real environment and business impact.", zh: "按實際環境同業務影響驗證風險級別。" },
      { en: "Correlate signals across systems and time.", zh: "將跨系統、跨時間嘅訊號串連分析。" },
      { en: "Keep human review for novel attacks and irreversible actions.", zh: "面對新型攻擊或不可逆操作，要保留人工覆核。" },
    ],
  },
];

const responseSteps: { number: string; title: Bilingual; body: Bilingual }[] = [
  { number: "01", title: { en: "Detect + notify", zh: "偵測 + 通報" }, body: { en: "Recognise the signal and activate the agreed escalation path.", zh: "辨認異常訊號，啟動已約定嘅通報路線。" } },
  { number: "02", title: { en: "Contain", zh: "隔離 + 控制" }, body: { en: "Isolate affected systems before the blast radius grows.", zh: "喺影響範圍擴大之前，先隔離受影響系統。" } },
  { number: "03", title: { en: "Preserve evidence", zh: "保全證據" }, body: { en: "Keep logs and artefacts intact for investigation and accountability.", zh: "保留紀錄同證據，方便調查同追蹤責任。" } },
  { number: "04", title: { en: "Restore", zh: "復原營運" }, body: { en: "Recover through a tested plan, not improvised shortcuts.", zh: "跟已測試嘅計劃復原，唔好臨急臨忙亂咁做。" } },
  { number: "05", title: { en: "Learn + improve", zh: "檢討 + 改善" }, body: { en: "Turn the incident into a stronger control, process or habit.", zh: "將事件變成更強嘅控制、流程或者習慣。" } },
];

const indicators = [
  { icon: Network, label: { en: "Network", zh: "網絡" }, value: "01" },
  { icon: LaptopMinimal, label: { en: "Endpoint", zh: "端點" }, value: "02" },
  { icon: Fingerprint, label: { en: "Identity", zh: "身份" }, value: "03" },
  { icon: Cloud, label: { en: "Data + backup", zh: "資料 + 備份" }, value: "04" },
  { icon: BookOpen, label: { en: "Applications", zh: "系統 + 應用" }, value: "05" },
  { icon: ShieldAlert, label: { en: "Response", zh: "監控 + 應變" }, value: "06" },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredFaqs = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "All" || t(faq.category, language) === activeCategory;
      const searchable = [faq.question.en, faq.question.zh, faq.answer.en, faq.answer.zh, ...faq.bullets.flatMap((bullet) => [bullet.en, bullet.zh])].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, language, query]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07101d] text-[#e9f0f4]">
      <div className="site-grain pointer-events-none fixed inset-0 z-50 opacity-[0.04]" />
      <header className="site-header fixed left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 lg:px-10">
          <button className="brand-mark" onClick={() => scrollTo("top")} aria-label="Go to top">
            <span className="brand-symbol"><Shield size={18} strokeWidth={2.4} /></span>
            <span className="brand-wordmark">shuman<span>_</span>infosec</span>
          </button>
          <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            <button onClick={() => scrollTo("principles")}>{language === "en" ? "Why security" : "點解要重視資安"}</button>
            <button onClick={() => scrollTo("library")}>{language === "en" ? "Threat library" : "威脅資料庫"}</button>
            <button onClick={() => scrollTo("response")}>{language === "en" ? "Build resilience" : "建立韌性"}</button>
            <Link href="/awareness" className="awareness-nav-link"><CircleHelp size={15} />{language === "en" ? "Awareness" : "保安意識"}</Link>
          </nav>
          <div className="header-actions">
            <div className="language-switch" aria-label={t(copy.language, language)}>
              <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
              <span>/</span>
              <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>粵</button>
            </div>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section relative isolate">
          <div className="hero-grid" />
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-content mx-auto grid max-w-[1280px] gap-14 px-5 pb-24 pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-10 lg:pb-32 lg:pt-52">
            <div className="relative z-10 max-w-3xl">
              <div className="eyebrow"><span className="eyebrow-dot" />{t(copy.eyebrow, language)}<span className="eyebrow-line" /></div>
              <h1 className="hero-title">{t(copy.heroTitle, language).split("\n").map((line, index) => <span key={line} className={index === 1 ? "hero-title-accent" : ""}>{line}</span>)}</h1>
              <p className="hero-body">{t(copy.heroBody, language)}</p>
              <div className="hero-actions">
                <button className="button-primary" onClick={() => scrollTo("library")}><span>{t(copy.explore, language)}</span><ArrowDownRight size={17} /></button>
                <button className="button-quiet" onClick={() => scrollTo("response")}><span>{t(copy.viewTopics, language)}</span><ArrowUpRight size={16} /></button>
              </div>
            </div>
            <div className="hero-signal-card">
              <div className="signal-card-top"><span className="live-dot" />{language === "en" ? "LIVE OPERATING PICTURE" : "即時資安視圖"}<span className="signal-time">09:41:22</span></div>
              <div className="signal-card-main">
                <div className="signal-radar"><div className="radar-ring radar-ring-one" /><div className="radar-ring radar-ring-two" /><div className="radar-sweep" /><span className="radar-core"><Shield size={24} /></span><i className="radar-ping ping-one" /><i className="radar-ping ping-two" /><i className="radar-ping ping-three" /></div>
                <div className="signal-copy"><span>{language === "en" ? "Risk posture" : "風險狀態"}</span><strong>{language === "en" ? "Build the basics" : "先打好基本功"}</strong><p>{language === "en" ? "Visibility before velocity." : "先睇清楚，先可以行得快。"}</p></div>
              </div>
              <div className="signal-bars"><span /><span /><span /><span /><span /><span /><span /><span /></div>
              <div className="signal-card-bottom"><span><span className="status-pill" />{language === "en" ? "Controls in motion" : "防護持續運作中"}</span><span>SHM-001</span></div>
            </div>
          </div>
          <div className="hero-footer-line mx-auto max-w-[1280px] px-5 lg:px-10"><span>01</span><span className="line" /><span>{language === "en" ? "KNOW THE RISK / REDUCE THE UNKNOWN" : "了解風險 / 減少未知"}</span></div>
        </section>

        <section id="principles" className="principles-section section-padding">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
            <div className="section-heading-row">
              <div><span className="section-kicker">01 / {language === "en" ? "The operating model" : "資安運作模型"}</span><h2>{language === "en" ? <>Make security <em>legible.</em></> : <>將資安變得 <em>睇得明。</em></>}</h2></div>
              <p>{language === "en" ? "Good security is less about buying more tools and more about seeing the whole system: people, permissions, devices, data and the decisions between them." : "做好資安唔係買越多工具越好，而係睇清楚成個系統：人、權限、設備、資料，以及中間每一個決定。"}</p>
            </div>
            <div className="principle-grid">
              <article className="principle-card principle-card-large"><div className="card-index">01 <ArrowUpRight size={15} /></div><div className="principle-icon"><LockKeyhole size={24} /></div><h3>{language === "en" ? "Confidentiality" : "機密性"}</h3><p>{language === "en" ? "The right data, seen by the right people — and nobody else." : "啱嘅資料，由啱嘅人睇到，其他人就唔應該睇到。"}</p><div className="card-footer-label">{language === "en" ? "ACCESS / TRUST" : "存取 / 信任"}</div></article>
              <article className="principle-card principle-card-accent"><div className="card-index">02 <ArrowUpRight size={15} /></div><div className="principle-icon"><BadgeCheck size={24} /></div><h3>{language === "en" ? "Integrity" : "完整性"}</h3><p>{language === "en" ? "Information that stays accurate, traceable and untampered." : "資料保持準確、可追蹤，冇畀人偷偷改動。"}</p><div className="card-footer-label">{language === "en" ? "TRUTH / TRACE" : "真確 / 追蹤"}</div></article>
              <article className="principle-card"><div className="card-index">03 <ArrowUpRight size={15} /></div><div className="principle-icon"><Cloud size={24} /></div><h3>{language === "en" ? "Availability" : "可用性"}</h3><p>{language === "en" ? "The services and data your team needs, ready when they need them." : "團隊需要嘅服務同資料，喺需要嗰陣隨時可用。"}</p><div className="card-footer-label">{language === "en" ? "RESILIENCE / UPTIME" : "韌性 / 運作"}</div></article>
            </div>
          </div>
        </section>

        <section id="library" className="library-section section-padding">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
            <div className="library-header"><div><span className="section-kicker">02 / {language === "en" ? "The field library" : "實戰資料庫"}</span><h2>{language === "en" ? <>Find the signal<br /><em>inside the noise.</em></> : <>喺雜訊入面<br /><em>搵到真正訊號。</em></>}</h2></div><div className="library-aside"><p>{language === "en" ? "Plain-language answers to the questions teams ask before, during and after a security event." : "用簡單直接嘅語言，回答團隊喺資安事件前、期間同之後最常問嘅問題。"}</p><div className="library-count"><strong>{String(faqs.length).padStart(2, "0")}</strong><span>{language === "en" ? "field notes" : "份實戰筆記"}</span></div></div></div>
            <div className="search-panel"><div className="search-input-wrap"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t(copy.searchPlaceholder, language)} aria-label={t(copy.searchTitle, language)} />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}</div><div className="category-tabs"><button className={activeCategory === "All" ? "active" : ""} onClick={() => setActiveCategory("All")}>{t(copy.allTopics, language)}</button>{categories.map((category) => <button key={category.en} className={activeCategory === t(category, language) ? "active" : ""} onClick={() => setActiveCategory(t(category, language))}>{t(category, language)}</button>)}</div></div>
            <div className="results-meta"><span>{t(copy.showing, language)} <strong>{filteredFaqs.length}</strong> {t(copy.topics, language)}</span><span className="results-rule" /></div>
            {filteredFaqs.length > 0 ? <div className="faq-list">{filteredFaqs.map((faq, index) => { const Icon = faq.icon; const isOpen = openFaq === faq.id; return <article key={faq.id} className={`faq-row ${isOpen ? "is-open" : ""}`}><button className="faq-trigger" onClick={() => setOpenFaq(isOpen ? null : faq.id)} aria-expanded={isOpen}><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span className="faq-icon"><Icon size={19} /></span><span className="faq-title"><small>{t(faq.category, language)}</small><strong>{t(faq.question, language)}</strong></span><span className="faq-chevron"><ChevronDown size={19} /></span></button>{isOpen && <div className="faq-answer"><div className="answer-copy"><p>{t(faq.answer, language)}</p><span className="answer-link">{t(copy.readMore, language)} <ArrowDownRight size={15} /></span></div><ul>{faq.bullets.map((bullet) => <li key={bullet.en}><span className="bullet-mark" />{t(bullet, language)}</li>)}</ul></div>}</article>; })}</div> : <div className="empty-state"><CircleHelp size={28} /><strong>{t(copy.noResults, language)}</strong><p>{t(copy.noResultsBody, language)}</p><button onClick={() => { setQuery(""); setActiveCategory("All"); }}>{t(copy.reset, language)}</button></div>}
          </div>
        </section>

        <section id="response" className="response-section section-padding">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-10"><div className="response-intro"><div><span className="section-kicker">03 / {t(copy.incident, language)}</span><h2>{t(copy.responseTitle, language)}</h2></div><p>{t(copy.responseBody, language)}</p></div><div className="response-grid">{responseSteps.map((step, index) => <div className="response-step" key={step.number}><div className="step-top"><span>{step.number}</span>{index < responseSteps.length - 1 && <ArrowDownRight size={17} />}</div><h3>{t(step.title, language)}</h3><p>{t(step.body, language)}</p></div>)}</div><div className="response-note"><TriangleAlert size={18} /><span>{language === "en" ? "Rehearse the sequence before you need it. The best incident plan is the one people can follow under pressure." : "喺真正需要之前先演練。最好嘅事件計劃，係人喺壓力之下都跟得足嘅嗰一份。"}</span></div></div>
        </section>

        <section className="indicators-section section-padding"><div className="mx-auto max-w-[1280px] px-5 lg:px-10"><div className="indicators-heading"><span className="section-kicker">04 / {language === "en" ? "A complete view" : "完整視角"}</span><h2>{language === "en" ? "Six surfaces. One posture." : "六個面向，一個資安狀態。"}</h2><p>{language === "en" ? "Maturity is not a single score. It is the consistency between every surface your business depends on." : "成熟度唔係一個單一分數，而係企業依賴嘅每個面向之間，有冇一致嘅防護。"}</p></div><div className="indicator-grid">{indicators.map(({ icon: Icon, label, value }) => <div className="indicator" key={value}><span className="indicator-number">{value}</span><Icon size={21} /><strong>{t(label, language)}</strong><ArrowUpRight size={15} className="indicator-arrow" /></div>)}</div></div></section>

        <section className="closing-section"><div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-24 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:px-10 lg:py-36"><div><span className="section-kicker">SHUMAN / NEXT MOVE</span><h2>{language === "en" ? <>Make the next<br /><em>safe move.</em></> : <>行出下一步，<br /><em>行得更安全。</em></>}</h2></div><div className="closing-copy"><Sparkles size={18} /><p>{language === "en" ? "Start with visibility. Build the controls. Keep learning. Security is how the organisation chooses to move — every day." : "由睇清楚開始，建立防護，持續學習。資安係一間機構每日選擇點樣行得更穩陣。"}</p><button className="button-primary" onClick={() => scrollTo("top")}><span>{language === "en" ? "Back to the signal" : "返回資安視圖"}</span><ArrowUpRight size={17} /></button></div></div></section>
      </main>

      <footer className="site-footer"><div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"><div className="brand-mark"><span className="brand-symbol"><Shield size={18} strokeWidth={2.4} /></span><span className="brand-wordmark">shuman<span>_</span>infosec</span></div><p>{t(copy.footer, language)}</p><div className="footer-meta"><span>INFOSEC / 2026</span><a href="#top">TOP <ExternalLink size={12} /></a></div></div></footer>
    </div>
  );
}

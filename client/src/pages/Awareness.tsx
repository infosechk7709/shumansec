import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Cloud,
  FileKey2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Menu,
  Network,
  Search,
  Shield,
  Siren,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";

type Language = "en" | "zh";
type Bilingual = { en: string; zh: string };
type AwarenessItem = {
  id: number;
  category: Bilingual;
  icon: typeof Shield;
  question: Bilingual;
  answer: Bilingual;
  checklist?: Bilingual[];
};

const t = (value: Bilingual, language: Language) => value[language];

const categories: Bilingual[] = [
  { en: "Basics", zh: "基礎概念" },
  { en: "Policy", zh: "保安政策" },
  { en: "Assessment", zh: "風險評估" },
  { en: "Incident", zh: "保安事故" },
  { en: "Everyday habits", zh: "日常習慣" },
];

const questions: AwarenessItem[] = [
  {
    id: 1,
    category: categories[0],
    icon: Shield,
    question: { en: "What is information security?", zh: "何謂資訊保安？" },
    answer: {
      en: "Information is an asset for people and organisations. Information security protects that asset so it remains confidential, accurate and available to authorised people when needed.",
      zh: "資訊對個人同機構嚟講都係資產。資訊保安就係保護呢啲資產，確保資料保持機密、準確，而且授權人士需要時可以取用。",
    },
    checklist: [
      { en: "Confidentiality — no unauthorised disclosure.", zh: "機密性 — 唔畀未經授權人士披露。" },
      { en: "Integrity — no unauthorised changes.", zh: "完整性 — 唔畀未經授權人士更改。" },
      { en: "Availability — accessible when authorised people need it.", zh: "可用性 — 授權人士有需要時可以取用。" },
    ],
  },
  {
    id: 2,
    category: categories[0],
    icon: Network,
    question: { en: "What is IT security?", zh: "何謂資訊科技保安？" },
    answer: {
      en: "IT security protects the infrastructure, information systems and related resources that support confidentiality, integrity and availability. It includes people, processes, technology and the physical environment around them.",
      zh: "資訊科技保安係保護支援機密性、完整性同可用性嘅資訊科技基礎建設、資訊系統同相關資源，亦包括人員、流程、技術同實體環境。",
    },
  },
  {
    id: 3,
    category: categories[0],
    icon: BookOpenCheck,
    question: { en: "How can an organisation ensure IT security?", zh: "機構點樣先可以確保資訊科技保安？" },
    answer: {
      en: "Use a systematic cycle: understand the security requirements, establish and enforce clear policies and procedures, then assess, audit and monitor continuously.",
      zh: "用有系統嘅循環方法：先了解保安要求，再建立同執行清晰嘅政策及程序，之後持續做風險評估、審計同監控。",
    },
    checklist: [
      { en: "Identify what needs protecting and why.", zh: "先確認要保護啲乜，同埋點解重要。" },
      { en: "Make the expected behaviour clear to every role.", zh: "令每個崗位都清楚知道應該點做。" },
      { en: "Review the controls as technology and business change.", zh: "科技同業務改變時，要重新檢討防護措施。" },
    ],
  },
  {
    id: 4,
    category: categories[0],
    icon: LockKeyhole,
    question: { en: "What is physical security?", zh: "什麼是實體保安？" },
    answer: {
      en: "Physical security protects hardware, computer equipment, facilities and backup media from unauthorised access, theft, loss and other physical threats.",
      zh: "實體保安係保護硬件、電腦設備、場地同備份媒體，避免未經授權接達、偷竊、遺失或其他實體威脅。",
    },
  },
  {
    id: 5,
    category: categories[0],
    icon: FileKey2,
    question: { en: "What is application security?", zh: "什麼是應用系統保安？" },
    answer: {
      en: "Application security builds protection into the software itself. Common controls include authentication, role-based access, input validation and useful application logging, planned according to the application's criticality and data sensitivity.",
      zh: "應用系統保安係將防護措施建入軟件本身，例如認證、按角色分配權限、輸入驗證同應用程式紀錄，並按系統重要性及資料敏感度去設計。",
    },
  },
  {
    id: 6,
    category: categories[1],
    icon: ClipboardCheck,
    question: { en: "What is a security policy?", zh: "何謂保安政策？" },
    answer: {
      en: "A security policy states what the organisation considers important and sets the mandatory rules people must follow. Standards, guidelines and procedures turn those principles into practical steps for teams and system administrators.",
      zh: "保安政策講清楚機構最重視邊啲資訊安全事項，並訂立所有人都要遵守嘅基本規則。標準、指引同程序，就係將原則變成團隊同系統管理員可以跟嘅實際步驟。",
    },
  },
  {
    id: 7,
    category: categories[1],
    icon: BadgeCheck,
    question: { en: "Who should be involved in developing a security policy?", zh: "制訂保安政策時應該由邊啲人參與？" },
    answer: {
      en: "Security works best as a shared responsibility. Include senior management, technical and operational teams, business users and, where useful, an independent adviser.",
      zh: "資安最好由全機構共同負責。制訂政策時應該包括管理層、技術人員、營運同事、業務用戶，必要時亦可以搵獨立顧問幫手覆檢。",
    },
    checklist: [
      { en: "Management sets direction and makes decisions.", zh: "管理層定方向同作決策。" },
      { en: "Technical teams assess feasibility and controls.", zh: "技術團隊評估可行性同防護措施。" },
      { en: "Business users explain how work is actually done.", zh: "業務用戶講清楚實際工作係點運作。" },
    ],
  },
  {
    id: 8,
    category: categories[1],
    icon: Sparkles,
    question: { en: "What should a security policy include?", zh: "資訊科技保安政策應該包括啲乜？" },
    answer: {
      en: "At minimum, define the policy scope, protected resources, roles and privileges, minimum safeguards, reporting procedures, management and user responsibilities, and review dates.",
      zh: "最少要寫清楚政策範圍、要保護嘅資源、角色同權限、最低防護要求、違規通報程序、管理層及用戶責任，以及覆檢日期。",
    },
  },
  {
    id: 9,
    category: categories[1],
    icon: Siren,
    question: { en: "How should a security policy be put into practice?", zh: "推行保安政策時要注意啲乜？" },
    answer: {
      en: "Approval is only the beginning. Introduce the policy during onboarding, train people, communicate regularly, provide practical guidance, enforce fairly and keep all parties involved as the policy evolves.",
      zh: "政策獲批只係開始。要喺新員工入職時介紹、提供培訓、定期溝通、畀實際指引、公平執行，並且喺政策更新時繼續邀請各方參與。",
    },
  },
  {
    id: 10,
    category: categories[2],
    icon: Search,
    question: { en: "What is a security assessment?", zh: "保安評估指的是什麼？" },
    answer: {
      en: "A security assessment evaluates the security condition of an IT environment, including networks, systems and operating procedures. It can use vulnerability scanners and expert review to identify risks and gaps.",
      zh: "保安評估係評價資訊科技環境嘅保安狀態，包括網絡、系統同操作程序。可以用弱點掃描工具配合專業檢視，搵出風險同缺口。",
    },
  },
  {
    id: 11,
    category: categories[2],
    icon: Fingerprint,
    question: { en: "What is a security audit and how often should it happen?", zh: "什麼是保安審計？幾耐做一次？" },
    answer: {
      en: "An audit checks whether the current environment is protected in line with the organisation's policy and standards. It is a snapshot, so periodic review is essential — commonly yearly or every two years, depending on business criticality.",
      zh: "保安審計係按機構政策同標準，檢查現有環境係咪真係有適當保護。審計只係某個時間點嘅快照，所以要定期覆檢；按業務重要性，通常每年或者每兩年一次。",
    },
  },
  {
    id: 12,
    category: categories[3],
    icon: TriangleAlert,
    question: { en: "What is an IT security incident?", zh: "什麼是資訊科技保安事故？" },
    answer: {
      en: "It is an adverse event in an information system or network that threatens availability, integrity or confidentiality, and may lead to data damage or disclosure.",
      zh: "資訊科技保安事故係資訊系統或者網絡發生不利事件，令可用性、完整性或保密性受到威脅，甚至造成資料損壞或洩露。",
    },
  },
  {
    id: 13,
    category: categories[3],
    icon: Siren,
    question: { en: "How should a security incident be handled?", zh: "我可以點樣處理保安事故？" },
    answer: {
      en: "Prepare resources and escalation procedures before an incident. When one is detected, follow the predefined response plan to contain the event, restore normal operation and preserve evidence. Afterwards, review and improve the plan.",
      zh: "要喺事件之前準備好資源同升級通報程序。發現事件時跟預先定好嘅應變計劃，控制影響、恢復正常運作同保留證據。事後再檢討同改善計劃。",
    },
    checklist: [
      { en: "Before — plan, assign owners and rehearse.", zh: "事前 — 計劃、分配負責人同演練。" },
      { en: "During — notify, contain, investigate and recover.", zh: "事中 — 通報、隔離、調查同復原。" },
      { en: "After — learn from the event and strengthen controls.", zh: "事後 — 從事件吸取教訓，強化防護。" },
    ],
  },
  {
    id: 14,
    category: categories[4],
    icon: KeyRound,
    question: { en: "How can I protect my privacy online?", zh: "如何保護我嘅網上私隱？" },
    answer: {
      en: "Share personal information only when there is a clear reason. Check that a trusted secure connection is being used, think about how the information may be reused, and keep your devices and credentials protected.",
      zh: "只有喺有清楚理由時先分享個人資料。輸入資料前確認連線可信同有加密，諗清楚資料可能會點樣被再使用，同時保護好設備同登入憑證。",
    },
  },
  {
    id: 15,
    category: categories[4],
    icon: KeyRound,
    question: { en: "How can I keep my passwords secure?", zh: "如何保護我嘅密碼？" },
    answer: {
      en: "Use unique, hard-to-guess passwords, keep them private, change temporary or reset passwords immediately, and use a password manager and MFA where available.",
      zh: "用獨特而難估嘅密碼，唔好同人分享；收到臨時密碼或者重設密碼後立即更改，並盡量使用密碼管理器同 MFA。",
    },
  },
  {
    id: 16,
    category: categories[4],
    icon: Cloud,
    question: { en: "How can I protect my computer data?", zh: "如何保護我嘅電腦數據？" },
    answer: {
      en: "Keep security software and patches up to date, use a firewall, encrypt sensitive data, protect portable storage, back up important files and test that recovery really works.",
      zh: "保持保安軟件同修補程式更新，使用防火牆，加密敏感資料，保護可攜式儲存設備，備份重要檔案，並定期測試資料復原程序。",
    },
    checklist: [
      { en: "Do not browse suspicious websites or open unknown attachments.", zh: "唔好瀏覽可疑網站，亦唔好開啟陌生人寄來嘅附件。" },
      { en: "Do not reuse passwords or leave sensitive data unencrypted.", zh: "唔好重用密碼，亦唔好將敏感資料以未加密形式保存。" },
      { en: "Treat public Wi-Fi and public computers as untrusted.", zh: "將公共 Wi-Fi 同公共電腦當成不可信環境。" },
    ],
  },
  {
    id: 17,
    category: categories[4],
    icon: Network,
    question: { en: "What is good practice on public Wi-Fi?", zh: "使用公共無線網絡時有咩最佳作業實務？" },
    answer: {
      en: "Treat public Wi-Fi as untrusted. Avoid sending sensitive information unless a secure encrypted connection is in place, and use a trusted VPN before accessing company systems.",
      zh: "時刻將公共 Wi-Fi 當成不可信網絡。除非有可靠嘅加密連線，否則唔好傳送敏感資料；接達公司系統前應使用可信 VPN。",
    },
  },
  {
    id: 18,
    category: categories[4],
    icon: LockKeyhole,
    question: { en: "What should I remember when using instant messaging?", zh: "使用即時通訊工具時要注意啲乜？" },
    answer: {
      en: "Do not automatically accept file transfers, never click links from unknown contacts, and verify unexpected requests through another channel before acting.",
      zh: "唔好自動接受檔案傳送，絕對唔好撳不可信或者陌生人傳來嘅連結；遇到意外要求，先用第二個渠道核實。",
    },
  },
];

export default function Awareness() {
  const [language, setLanguage] = useState<Language>("en");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<number | null>(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return questions.filter((item) => {
      const categoryMatches = activeCategory === "All" || t(item.category, language) === activeCategory;
      const content = [item.question.en, item.question.zh, item.answer.en, item.answer.zh].join(" ").toLowerCase();
      return categoryMatches && (!needle || content.includes(needle));
    });
  }, [activeCategory, language, query]);

  return (
    <div className="awareness-page min-h-screen bg-[#07101d] text-[#e9f0f4]">
      <header className="awareness-header">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 lg:px-10">
          <Link href="/" className="brand-mark"><span className="brand-symbol"><Shield size={18} strokeWidth={2.4} /></span><span className="brand-wordmark">shuman<span>_</span>infosec</span></Link>
          <nav className={`awareness-nav ${menuOpen ? "is-open" : ""}`}>
            <Link href="/">{language === "en" ? "Field guide" : "資安實戰指南"}</Link>
            <span className="awareness-nav-current"><BookOpenCheck size={15} />{language === "en" ? "Security awareness" : "資訊保安意識"}</span>
          </nav>
          <div className="header-actions"><div className="language-switch"><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>粵</button></div><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
        </div>
      </header>

      <main>
        <section className="awareness-hero"><div className="awareness-hero-grid" /><div className="mx-auto grid max-w-[1280px] gap-12 px-5 pb-20 pt-40 lg:grid-cols-[1fr_.72fr] lg:items-end lg:px-10 lg:pb-28 lg:pt-48"><div className="relative z-10"><span className="section-kicker"><span className="eyebrow-dot" />SHUMAN / 05 / AWARENESS</span><div className="awareness-title-row"><div className="awareness-big-icon"><CircleHelp size={46} strokeWidth={1.5} /></div><h1>{language === "en" ? <>Information security<br /><em>awareness.</em></> : <>資訊保安<br /><em>意識。</em></>}</h1></div><p>{language === "en" ? "The questions people ask before they know what to ask. Pull down an answer, make one safer decision, then pass it on." : "由大家最常問嘅問題開始。拉低睇答案，做一個更安全嘅決定，再將呢份意識傳開去。"}</p><div className="awareness-back"><ArrowLeft size={15} /><Link href="/">{language === "en" ? "Back to the field guide" : "返回資安實戰指南"}</Link></div></div><div className="awareness-signal"><div className="awareness-signal-top"><span className="live-dot" />{language === "en" ? "AWARENESS / OPEN" : "保安意識 / 開放"}<span>18 Q&A</span></div><div className="awareness-signal-core"><div className="signal-orbit"><div className="orbit-dot" /><div className="orbit-dot orbit-dot-two" /><div className="orbit-dot orbit-dot-three" /></div><BookOpenCheck size={31} /></div><div className="awareness-signal-bottom"><span>{language === "en" ? "One good habit can change the outcome." : "一個好習慣，可以改變結果。"}</span><ArrowUpRight size={16} /></div></div></div></section>

        <section className="awareness-content section-padding"><div className="mx-auto max-w-[1020px] px-5 lg:px-10"><div className="awareness-content-heading"><div><span className="section-kicker">{language === "en" ? "PULL DOWN TO LEARN" : "拉低睇答案"}</span><h2>{language === "en" ? <>Make the <em>right</em><br />thing easier.</> : <>令正確嘅<br /><em>選擇更容易。</em></>}</h2></div><p>{language === "en" ? "Short, practical answers adapted from the supplied Information Security Awareness reference. Use them for onboarding, refresher training or the next team conversation." : "以下係根據你提供嘅《Information Security Awareness》資料整理嘅實用答案，可以用喺新員工入職、定期重溫，或者下一次團隊分享。"}</p></div><div className="awareness-tools"><div className="awareness-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={language === "en" ? "Search a question..." : "搜尋問題..."} />{query && <button onClick={() => setQuery("")}><X size={15} /></button>}</div><div className="awareness-filters"><button className={activeCategory === "All" ? "active" : ""} onClick={() => setActiveCategory("All")}>{language === "en" ? "All" : "全部"}</button>{categories.map((category) => <button key={category.en} className={activeCategory === t(category, language) ? "active" : ""} onClick={() => setActiveCategory(t(category, language))}>{t(category, language)}</button>)}</div></div><div className="awareness-count">{language === "en" ? "Showing" : "而家顯示"} <strong>{filtered.length}</strong> / {questions.length} {language === "en" ? "questions" : "條問題"}</div><div className="awareness-list">{filtered.map((item, index) => { const Icon = item.icon; const isOpen = openId === item.id; return <article className={`awareness-item ${isOpen ? "is-open" : ""}`} key={item.id}><button className="awareness-question" onClick={() => setOpenId(isOpen ? null : item.id)} aria-expanded={isOpen}><span className="awareness-number">{String(index + 1).padStart(2, "0")}</span><span className="awareness-item-icon"><Icon size={19} /></span><span className="awareness-question-copy"><small>{t(item.category, language)}</small><strong>{t(item.question, language)}</strong></span><span className="awareness-chevron"><ChevronDown size={18} /></span></button>{isOpen && <div className="awareness-answer"><p>{t(item.answer, language)}</p>{item.checklist && <ul>{item.checklist.map((line) => <li key={line.en}><span />{t(line, language)}</li>)}</ul>}<span className="awareness-answer-tag"><Sparkles size={13} />{language === "en" ? "A small action, repeated." : "一個小行動，持續做。"}</span></div>}</article>; })}</div>{filtered.length === 0 && <div className="awareness-empty"><CircleHelp size={27} /><strong>{language === "en" ? "No matching questions" : "搵唔到相關問題"}</strong><button onClick={() => { setQuery(""); setActiveCategory("All"); }}>{language === "en" ? "Reset" : "重設"}</button></div>}</div></section>

        <section className="awareness-footer-callout"><div className="mx-auto flex max-w-[1020px] flex-col gap-6 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10"><div><span className="section-kicker">{language === "en" ? "KEEP IT MOVING" : "持續落實"}</span><h2>{language === "en" ? "Awareness is a control." : "保安意識，本身就係一種防護。"}</h2></div><Link href="/" className="button-primary"><span>{language === "en" ? "Explore the full guide" : "睇完整資安指南"}</span><ArrowUpRight size={17} /></Link></div></section>
      </main>
      <footer className="site-footer"><div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"><div className="brand-mark"><span className="brand-symbol"><Shield size={18} strokeWidth={2.4} /></span><span className="brand-wordmark">shuman<span>_</span>infosec</span></div><p>{language === "en" ? "Security clarity for teams building what comes next." : "俾建立未來嘅團隊，一份清晰嘅資安方向。"}</p><div className="footer-meta"><span>INFOSEC / 2026</span><Link href="/">TOP <ArrowUpRight size={12} /></Link></div></div></footer>
    </div>
  );
}

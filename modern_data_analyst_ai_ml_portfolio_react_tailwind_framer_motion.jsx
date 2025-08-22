import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Search,
  Sun,
  Moon,
  Database,
  Brain,
  LineChart,
  Bot,
  ChevronRight,
  Award,
  Phone,
  Send,
  School,
  Briefcase,
  Building2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

// ---------- THEME ----------
const useDarkMode = () => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (enabled) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [enabled]);

  return { enabled, setEnabled };
};

// ---------- DATA ----------
const skills = {
  "Data & Database": ["SQL", "PL/SQL", "Oracle DB", "Data Modeling"],
  Visualization: ["Power BI", "Crystal Reports", "Seaborn", "Matplotlib"],
  "AI/ML & GenAI": [
    "Python",
    "Pandas",
    "NumPy",
    "HuggingFace",
    "LangChain",
    "Pinecone",
    "Weaviate",
    "FAISS",
    "FastAPI",
    "Flask",
    "Streamlit",
  ],
  "Banking Solutions": ["Core Banking", "MIS Reports", "Data Analytics"],
};

const projects = [
  {
    title: "Loan Performance Analysis",
    tags: ["SQL", "Python", "Power BI"],
    blurb:
      "Analyzed loan portfolios to identify delinquency patterns and optimized risk metrics; interactive KPI dashboards.",
    link: "#",
  },
  {
    title: "Branch-wise Profit & Loss Prediction Dashboard",
    tags: ["Forecasting", "Python", "Power BI"],
    blurb:
      "Predictive modeling for P&L with feature-engineered macro & seasonal signals; deployed for management review.",
    link: "#",
  },
  {
    title: "Clean Cash Analysis",
    tags: ["ETL", "SQL", "Excel"],
    blurb:
      "Automated ingestion and reconciliation workflows to flag anomalies in cash cycles.",
    link: "#",
  },
  {
    title: "Zone-wise Sales Forecasting",
    tags: ["Time Series", "Python", "Streamlit"],
    blurb:
      "ARIMA/Prophet-based forecasts with what-if analysis embedded into a Streamlit app.",
    link: "#",
  },
  {
    title: "Customer Review Sentiment Analysis (Food Shop)",
    tags: ["NLP", "HuggingFace", "LangChain"],
    blurb:
      "Fine-tuned transformers for sentiment trends and aspect mining from multi-source reviews.",
    link: "#",
  },
  {
    title: "Bulk Email Automation with AI",
    tags: ["Generative AI", "FastAPI", "LangChain"],
    blurb:
      "Context-aware email generation & scheduling; integrated vector search using Pinecone.",
    link: "#",
  },
  {
    title: "Email Data Analytics (Response Time & Trends)",
    tags: ["Analytics", "Python", "Dashboards"],
    blurb:
      "Response time SLAs & trend analytics with anomaly detection and executive summaries.",
    link: "#",
  },
];

const certifications = [
  {
    title: "Advanced Power BI Custom Visuals with d3.js",
    org: "LinkedIn",
    year: 2023,
  },
  { title: "Python for Data Science & ML", org: "LinkedIn", year: 2022 },
  { title: "SQL Data Reporting & Analysis", org: "LinkedIn", year: 2021 },
  { title: "Career Essentials in Data Analysis", org: "Microsoft", year: 2024 },
];

const timeline = [
  { year: 2019.9, label: "Joined Leads Corporation Ltd", value: 1 },
  { year: 2020.5, label: "Core Banking & Data Analytics", value: 2 },
  { year: 2021.5, label: "Crystal Reports & Power BI", value: 3 },
  { year: 2022.5, label: "Performance Tuning & SQL Automation", value: 4 },
  { year: 2023.2, label: "Joined Meghna Bank PLC", value: 5 },
  { year: 2024.2, label: "GenAI Apps & Vector Search", value: 6 },
  { year: 2025.0, label: "Assistant Officer – DA & Python Dev", value: 7 },
];

// gradient animation helper
const AnimatedGradient = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
  >
    <div className="absolute -top-16 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/40 via-fuchsia-500/30 to-cyan-500/40 blur-3xl animate-pulse" />
  </div>
);

// floating particles (css-only)
const Particles = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {[...Array(40)].map((_, i) => (
      <span
        key={i}
        className="absolute h-1 w-1 rounded-full bg-foreground/20 animate-[float_12s_ease-in-out_infinite]"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          transform: `scale(${0.7 + Math.random() * 1.2})`,
        }}
      />
    ))}
    <style>{`
      @keyframes float {
        0% { transform: translateY(0) scale(1); opacity: .5 }
        50% { transform: translateY(-20px) scale(1.05); opacity: .9 }
        100% { transform: translateY(0) scale(1); opacity: .5 }
      }
    `}</style>
  </div>
);

// utility components
const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>{children}</section>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mx-auto mb-10 max-w-3xl text-center">
    <div className="mb-3 flex items-center justify-center gap-2 text-sm text-primary">
      {Icon && <Icon className="h-4 w-4" />}<span className="uppercase tracking-wider">{subtitle}</span>
    </div>
    <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
  </div>
);

// ---------- MAIN ----------
export default function Portfolio() {
  const { enabled, setEnabled } = useDarkMode();
  const [query, setQuery] = useState("");
  const [certQuery, setCertQuery] = useState("");

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ),
    [query]
  );

  const filteredCerts = useMemo(
    () =>
      certifications.filter(
        (c) =>
          c.title.toLowerCase().includes(certQuery.toLowerCase()) ||
          c.org.toLowerCase().includes(certQuery.toLowerCase()) ||
          (c.year + "").includes(certQuery)
      ),
    [certQuery]
  );

  return (
    <TooltipProvider>
      <div className="relative min-h-screen scroll-smooth bg-background text-foreground antialiased">
        <AnimatedGradient />
        <Particles />

        {/* NAVBAR */}
        <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
            <a href="#hero" className="font-semibold tracking-tight">DA • AI/ML Portfolio</a>
            <div className="hidden items-center gap-1 md:flex">
              {[
                ["About", "about"],
                ["Education", "education"],
                ["Experience", "experience"],
                ["Skills", "skills"],
                ["Projects", "projects"],
                ["Certifications", "certifications"],
                ["Contact", "contact"],
              ].map(([label, href]) => (
                <Button key={href} asChild variant="ghost" className="px-3">
                  <a href={`#${href}`}>{label}</a>
                </Button>
              ))}
              <div className="ml-2 flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
                <Sun className="h-4 w-4" />
                <Switch checked={enabled} onCheckedChange={setEnabled} />
                <Moon className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
                <Sun className="h-4 w-4" />
                <Switch checked={enabled} onCheckedChange={setEnabled} />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </nav>
        </header>

        {/* HERO */}
        <Section id="hero" className="relative pt-12">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-2 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <Badge className="mb-4 gap-1 bg-primary/15 text-primary hover:bg-primary/20">
                <span className="inline-flex items-center gap-1"><Brain className="h-3.5 w-3.5"/> Data • AI • GenAI</span>
              </Badge>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">
                6 Years Global Experience | Data Analyst | Data Science | AI & Machine Learning Enthusiast | Generative AI Application Builder | SQL, Pandas, NumPy, Oracle DB Developer | FastAPI/Flask | Pinecone, Weaviate, FAISS (for GenAI search apps) | Data Analytics | Power BI | Advanced Excel | Crystal Reports Expertise | Python, Seaborn, Matplotlib | PL/SQL Developer | Web Scraping
              </h1>
              <p className="mb-6 text-muted-foreground text-lg">
                "Transforming Data into Actionable Insights & Building Scalable AI Solutions"
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="/resume.pdf" download className="inline-flex items-center gap-2"><Download className="h-4 w-4"/> Download Resume</a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href="#projects" className="inline-flex items-center gap-2"><LineChart className="h-4 w-4"/> View Projects</a>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Database className="h-4 w-4"/> Oracle • SQL • PL/SQL</span>
                <span className="inline-flex items-center gap-2"><Bot className="h-4 w-4"/> LLM • Vector DB • LangChain</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 md:order-2"
            >
              <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-3xl border bg-gradient-to-tr from-muted to-transparent p-1 shadow-2xl md:w-80">
                {/* Replace src with uploaded professional photo */}
                <div className="flex h-full w-full items-center justify-center rounded-3xl bg-muted/40">
                  <span className="text-muted-foreground">Upload your professional photo</span>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ABOUT */}
        <Section id="about">
          <SectionTitle icon={Brain} title="About Me" subtitle="Profile" />
          <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3 md:px-6">
            <Card className="md:col-span-2">
              <CardContent className="space-y-4 p-6 text-muted-foreground">
                <p>
                  I am a Data Analyst, SQL Developer, and AI/ML Enthusiast with over 6 years of global experience in delivering data-driven solutions, automating business processes, and building intelligent applications. My expertise spans across core banking systems, data analytics, reporting, and modern AI-powered solutions.
                </p>
                <p>
                  <strong className="text-foreground">I specialize in:</strong>
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Data Analytics & BI:</strong> Transforming raw data into actionable insights through Power BI, Crystal Reports, Advanced Excel, and Python visualizations (Matplotlib, Seaborn).
                  </li>
                  <li>
                    <strong>SQL & Database Development:</strong> Designing and optimizing complex SQL queries, stored procedures, triggers, and database schemas for high-performance financial applications.
                  </li>
                  <li>
                    <strong>AI & Generative AI:</strong> Developing intelligent apps with Python, FastAPI, Flask, Streamlit, and integrating LLMs (ChatGPT, HuggingFace, LangChain) with vector databases like Pinecone, Weaviate, and FAISS for next-gen search & automation solutions.
                  </li>
                  <li>
                    <strong>Core Banking Support:</strong> Hands-on experience in requirements gathering, process analysis, MIS reporting, and database optimization for enterprise-grade banking systems.
                  </li>
                </ul>
                <p>
                  With a proven track record in both corporate banking software engineering and data science applications, I thrive at the intersection of data analytics, AI/ML, and financial technology, enabling organizations to make smarter, faster, and more informed decisions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Career Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="currentColor" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} domain={[2019, 2025]} />
                      <YAxis hide />
                      <RechartsTooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} labelFormatter={(v)=>`Year: ${v}`} formatter={(v,_,p)=>["Level "+v, timeline[p?.payload?.index||0]?.label]} />
                      <Area type="monotone" dataKey="value" stroke="currentColor" fill="url(#grad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Interactive timeline of impact & responsibility over time.</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education">
          <SectionTitle icon={School} title="Education" subtitle="Academic" />
          <div className="mx-auto grid max-w-5xl gap-4 px-4 md:grid-cols-2 md:px-6">
            <Card>
              <CardHeader>
                <CardTitle>B.Sc. in Computer Science and Engineering – Dhaka International University</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">2020</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Diploma in Computer Engineering – Jhenaidah Polytechnic Institute</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">2016</CardContent>
            </Card>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience">
          <SectionTitle icon={Briefcase} title="Work Experience" subtitle="Career" />
          <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:px-6">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>Leads Corporation Ltd</CardTitle>
                    <p className="text-sm text-muted-foreground">Senior Software Engineer | Core Banking & Data Analytics</p>
                  </div>
                  <Badge variant="secondary">Nov 2019 – Feb 2023</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Gathered requirements for core banking systems (transactions, account management, loan disbursement, compliance).</li>
                  <li>Analyzed workflows and integrated them into new core banking solutions.</li>
                  <li>Developed optimized SQL queries, stored procedures, views, and functions to automate banking operations.</li>
                  <li>Designed and managed database objects (tables, indexes, partitions) for efficient data retrieval.</li>
                  <li>Enhanced database performance via indexing, restructuring, and partitioning.</li>
                  <li>Integrated SQL scripts into banking applications for real-time data access.</li>
                  <li>Built Power BI dashboards for KPIs, customer behavior, and regulatory reports.</li>
                  <li>Designed dynamic Crystal Reports for customer activity and operational performance.</li>
                  <li>Conducted data cleaning & preprocessing to ensure accuracy.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>Meghna Bank PLC</CardTitle>
                    <p className="text-sm text-muted-foreground">Assistant Officer (Data Analyst & Python Developer)</p>
                  </div>
                  <Badge variant="secondary">Feb 2023 – Present</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Built MIS reports and provided end-to-end support for general banking operations.</li>
                  <li>Designed Power BI & Streamlit dashboards with predictive analytics (loans, sales, risks).</li>
                  <li>Automated workflows using Python scripts for reporting, forecasting, and preprocessing.</li>
                  <li>Implemented AI/ML models for trend prediction & risk forecasting.</li>
                  <li>Developed Generative AI apps using LLMs, LangChain, Pinecone, Weaviate, FAISS.</li>
                  <li>Created optimized SQL queries, triggers, and stored procedures to streamline workflows.</li>
                  <li>Built Crystal Reports for finance, customers, and operations.</li>
                  <li>Supported core banking solution software implementation.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills">
          <SectionTitle icon={LineChart} title="Skills" subtitle="Toolbox" />
          <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:px-6">
            {Object.entries(skills).map(([group, items]) => (
              <Card key={group}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ChevronRight className="h-4 w-4" /> {group}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Badge variant="outline" className="rounded-full px-3 py-1">{s}</Badge>
                    </motion.span>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects">
          <SectionTitle icon={LineChart} title="Projects" subtitle="Selected Work" />
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title or tag…"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredProjects.map((p) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="group h-full overflow-hidden">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {p.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{p.blurb}</p>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>
                          ))}
                        </div>
                        <Button asChild size="sm" variant="secondary">
                          <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                            View details <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Section>

        {/* CERTIFICATIONS */}
        <Section id="certifications">
          <SectionTitle icon={Award} title="Certifications" subtitle="Badges" />
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  placeholder="Search certifications…"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
              {filteredCerts.map((c, idx) => (
                <Card key={c.title + idx} className="min-w-[280px] snap-center">
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">{c.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.org} • {c.year}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Badge variant="secondary">Verified</Badge>
                      <Badge variant="outline">Professional</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <SectionTitle icon={Mail} title="Contact" subtitle="Let's Talk" />
          <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2 md:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    const name = data.get("name");
                    const email = data.get("email");
                    const message = data.get("message");
                    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
                    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
                    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
                  }}
                >
                  <Input name="name" placeholder="Name" required />
                  <Input name="email" type="email" placeholder="Email" required />
                  <Textarea name="message" placeholder="Message" className="min-h-[120px]" required />
                  <div className="flex items-center gap-2">
                    <Button type="submit" className="inline-flex items-center gap-2"><Send className="h-4 w-4"/> Send</Button>
                    <Button asChild variant="secondary">
                      <a href="/resume.pdf" download className="inline-flex items-center gap-2"><Download className="h-4 w-4"/> Resume</a>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:text-primary"><Linkedin className="h-4 w-4"/> LinkedIn</a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:text-primary"><Github className="h-4 w-4"/> GitHub</a>
                <a href="mailto:youremail@example.com" className="flex items-center gap-2 text-sm hover:text-primary"><Mail className="h-4 w-4"/> Email</a>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <p>
              © {new Date().getFullYear()} Data Analyst & AI/ML Enthusiast • Built with React, Tailwind, Framer Motion, shadcn/ui & Recharts.
            </p>
            <p className="mt-2">Dark/Light mode • Smooth scroll • Responsive • Glassmorphism accents</p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

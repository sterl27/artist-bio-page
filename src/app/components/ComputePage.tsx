import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon,
  Cpu,
  Layers,
  Lock,
  Shield,
  Activity,
  Check,
  ExternalLink,
  Code,
  Copy,
  Play,
  RefreshCw,
  Globe,
  Sliders,
  Database,
  Network,
  Menu,
  X,
  Search,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Twitter,
  Linkedin,
  Server,
  Key,
  ShieldAlert,
  TerminalSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom Mock Integration Logos or Initials
const INTEGRATIONS_LIST = [
  { id: "github", name: "GitHub", category: "VCS", desc: "Trigger agents on pull requests and commits.", color: "from-zinc-800 to-zinc-900" },
  { id: "slack", name: "Slack", category: "Chat", desc: "Notify channels and receive feedback directly.", color: "from-purple-900 to-indigo-950" },
  { id: "aws", name: "Amazon Web Services", category: "Cloud", desc: "Manage S3, EC2, and RDS resources.", color: "from-amber-600 to-amber-800" },
  { id: "postgres", name: "PostgreSQL", category: "Database", desc: "Query, insert, and migrate schemas.", color: "from-blue-800 to-indigo-900" },
  { id: "stripe", name: "Stripe", category: "Finance", desc: "Monitor payments and handle subscriptions.", color: "from-violet-600 to-indigo-700" },
  { id: "discord", name: "Discord", category: "Chat", desc: "Power automated server bots and logs.", color: "from-blue-600 to-indigo-800" },
  { id: "shopify", name: "Shopify", category: "E-Commerce", desc: "Sync inventory, track orders, and edit items.", color: "from-emerald-700 to-green-800" },
  { id: "openai", name: "OpenAI", category: "LLM", desc: "Leverage GPT-4o for complex decision making.", color: "from-teal-700 to-emerald-950" },
  { id: "linear", name: "Linear", category: "PM", desc: "Create issues, track sprints, and assign tasks.", color: "from-purple-800 to-zinc-900" },
  { id: "gcs", name: "Google Cloud", category: "Cloud", desc: "Access BigQuery and Cloud Run workloads.", color: "from-sky-700 to-blue-900" },
  { id: "supabase", name: "Supabase", category: "Database", desc: "Realtime data listeners and auth actions.", color: "from-emerald-800 to-emerald-950" },
  { id: "resend", name: "Resend", category: "Email", desc: "Send rich transactional emails programmatically.", color: "from-orange-600 to-rose-700" }
];

// Map nodes with coordinates relative to a 1000x500 box
const MAP_NODES = [
  { id: "sfo", name: "San Francisco (SFO-1)", lat: "15ms", x: 150, y: 190, load: "Optimal" },
  { id: "nyc", name: "New York (NYC-2)", lat: "22ms", x: 280, y: 180, load: "Optimal" },
  { id: "gru", name: "São Paulo (GRU-1)", lat: "62ms", x: 380, y: 390, load: "Medium" },
  { id: "lhr", name: "London (LHR-1)", lat: "12ms", x: 490, y: 140, load: "Optimal" },
  { id: "fra", name: "Frankfurt (FRA-3)", lat: "9ms", x: 540, y: 150, load: "Optimal" },
  { id: "nrt", name: "Tokyo (NRT-1)", lat: "28ms", x: 820, y: 180, load: "Optimal" },
  { id: "sin", name: "Singapore (SIN-2)", lat: "35ms", x: 740, y: 320, load: "Optimal" },
  { id: "syd", name: "Sydney (SYD-1)", lat: "45ms", x: 880, y: 410, load: "Optimal" },
  { id: "cpt", name: "Cape Town (CPT-1)", lat: "55ms", x: 560, y: 380, load: "Low" }
];

export default function ComputePage() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Terminal Simulation State
  const [simRunning, setSimRunning] = useState(false);
  const [simSteps, setSimSteps] = useState<string[]>([]);
  const [simProgress, setSimProgress] = useState(0);
  const [simStage, setSimStage] = useState<"idle" | "running" | "done">("idle");

  // Tab State for "How It Works"
  const [activeTab, setActiveTab] = useState<"define" | "assign" | "monitor">("define");

  // Map state for hover
  const [hoveredNode, setHoveredNode] = useState<typeof MAP_NODES[0] | null>(null);

  // Integrations search filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Code Sandbox tab state
  const [activeFile, setActiveFile] = useState<"agent.ts" | "schema.ts">("agent.ts");
  const [sdkRunning, setSdkRunning] = useState(false);
  const [sdkLogs, setSdkLogs] = useState<string[]>([]);
  const [sdkProgress, setSdkProgress] = useState(0);

  // Pricing Toggle (Monthly vs Annually)
  const [isAnnual, setIsAnnual] = useState(true);

  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Terminal Simulator trigger
  const runHeroSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    setSimStage("running");
    setSimProgress(0);
    setSimSteps([]);

    const logMessages = [
      "Initializing agent pipeline...",
      "Connecting to US-East (NYC-2) compute node...",
      "Resolving system dependencies...",
      "Retrieving task instructions: 'Analyze data, generate summary report, and push to GitHub'...",
      "Deploying sandbox container... [SUCCESS]",
      "Step 1: Fetching external data source... (200 OK)",
      "Step 2: Processing data through LLM engine... (320 tokens/sec)",
      "Step 3: Compiling structured report...",
      "Step 4: Authenticating with GitHub integration...",
      "Pushing commit to repository repository-main/report.md...",
      "Clean up: Purging isolated container logs...",
      "Task completed successfully in 1.48 seconds."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logMessages.length) {
        setSimSteps((prev) => [...prev, logMessages[currentStep]]);
        setSimProgress(((currentStep + 1) / logMessages.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        setSimRunning(false);
        setSimStage("done");
      }
    }, 450);
  };

  // Run Hero Sim on load
  useEffect(() => {
    runHeroSimulation();
  }, []);

  // SDK Sandbox Simulator
  const runSdkSandbox = () => {
    if (sdkRunning) return;
    setSdkRunning(true);
    setSdkProgress(0);
    setSdkLogs([]);

    const logs = [
      "[sdk] Compiling TypeScript...",
      "[sdk] Agent configuration loaded.",
      "[sdk] Spawning local runner: 'ResearchAgent' v1.2.0...",
      "[sdk] Executing task: 'Summarize latest news on distributed AI models'...",
      "[sdk] HTTP GET https://news.ycombinator.com/ ... 200 OK",
      "[sdk] Extracting text corpus and parsing relevant headlines...",
      "[sdk] Sending payload to OpenAI gpt-4o ... 1.2s",
      "[sdk] Received response: 'Distributed AI agent models are shifting towards edge microVMs...'",
      "[sdk] Task finished. Output saved to ./out/result.json"
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setSdkLogs((prev) => [...prev, logs[currentLog]]);
        setSdkProgress(((currentLog + 1) / logs.length) * 100);
        currentLog++;
      } else {
        clearInterval(interval);
        setSdkRunning(false);
      }
    }, 400);
  };

  // Filter Integrations
  const filteredIntegrations = INTEGRATIONS_LIST.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(INTEGRATIONS_LIST.map((item) => item.category)))];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  // Code contents for the sandbox
  const agentCode = `import { defineAgent, tool } from "@compute/sdk";
import { github } from "@compute/integrations";

export const reportAgent = defineAgent({
  name: "DailyReporter",
  model: "claude-3-5-sonnet",
  instructions: "Gather metrics, format, and push report.",
  tools: [
    tool({
      name: "fetchMetrics",
      execute: async () => {
        return { activeUsers: 1420, apiCalls: 85200 };
      }
    })
  ],
  async execute({ tools }) {
    const metrics = await tools.fetchMetrics();
    const markdown = \`# Daily Report\\n- Users: \${metrics.activeUsers}\`;
    
    await github.createCommit({
      repo: "org/metrics",
      path: "reports/daily.md",
      content: markdown,
      message: "Daily update from ComputeAgent"
    });
  }
});`;

  const schemaCode = `{
  "name": "DailyReporter",
  "version": "1.0.0",
  "runtime": "node20",
  "permissions": [
    "network:outbound",
    "github:write"
  ],
  "resources": {
    "cpu": "0.5",
    "memory": "512MB"
  }
}`;

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-teal-500/20 selection:text-teal-300">
      
      {/* Background radial overlays for premium ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-1/3 w-[800px] h-[800px] bg-violet-900/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-[#060608]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-teal-500/20 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Cpu className="w-4 h-4 text-white relative z-10 animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              COMPUTE<span className="text-xs text-teal-400 font-semibold align-super">TM</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Capabilities</a>
            <a href="#process" className="text-sm text-zinc-400 hover:text-white transition-colors">Process</a>
            <a href="#infra" className="text-sm text-zinc-400 hover:text-white transition-colors">Infra</a>
            <a href="#integrations" className="text-sm text-zinc-400 hover:text-white transition-colors">Integrations</a>
            <a href="#security" className="text-sm text-zinc-400 hover:text-white transition-colors">Security</a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Sign in
            </button>
            <a 
              href="#pricing"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white text-black hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-[#060608]/95 z-40 backdrop-blur-lg md:hidden border-b border-zinc-900"
          >
            <div className="flex flex-col p-6 gap-6">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-300 hover:text-white"
              >
                Capabilities
              </a>
              <a 
                href="#process" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-300 hover:text-white"
              >
                Process
              </a>
              <a 
                href="#infra" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-300 hover:text-white"
              >
                Infra
              </a>
              <a 
                href="#integrations" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-300 hover:text-white"
              >
                Integrations
              </a>
              <a 
                href="#security" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-300 hover:text-white"
              >
                Security
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-300 hover:text-white"
              >
                Pricing
              </a>
              
              <hr className="border-zinc-900" />
              
              <div className="flex items-center justify-between gap-4">
                <button className="flex-1 py-3 text-center text-sm font-medium rounded-lg border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition-colors">
                  Sign in
                </button>
                <a 
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-3 text-center text-sm font-semibold rounded-lg bg-teal-500 text-black hover:bg-teal-400 transition-colors block"
                >
                  Deploy Free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Launching Compute SDK 1.0
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Deploy autonomous <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400">
                AI agents
              </span> on distributed infra.
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              Deploy AI agents that work independently. They analyze, decide, and execute complex multi-step tasks across a secure global network. No supervisor required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#pricing"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-black text-sm font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/10 group"
              >
                Deploy First Agent
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a 
                href="#sandbox"
                className="px-6 py-3 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-sm font-semibold text-center transition-colors flex items-center justify-center gap-2"
              >
                <Code className="w-4 h-4" /> Try SDK Sandbox
              </a>
            </div>
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-900">
              <div>
                <p className="text-2xl font-bold text-white">29</p>
                <p className="text-xs text-zinc-500">Global Regions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">&lt;50ms</p>
                <p className="text-xs text-zinc-500">Edge Latency</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100+</p>
                <p className="text-xs text-zinc-500">Integrations</p>
              </div>
            </div>
          </div>

          {/* Hero Right Content: Live Terminal Simulator */}
          <div className="lg:col-span-6">
            <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 overflow-hidden shadow-2xl relative">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-zinc-900">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <TerminalIcon className="w-3.5 h-3.5" /> agent-runner-01.compute
                </div>
                <div className="w-12" /> {/* spacer */}
              </div>

              {/* Terminal Logs & Output */}
              <div className="p-5 font-mono text-xs text-left h-80 overflow-y-auto space-y-2.5">
                <div className="flex items-center justify-between text-zinc-500 border-b border-zinc-900/60 pb-2">
                  <span>DEPLOYED SYSTEM STATUS:</span>
                  <span className="flex items-center gap-1 text-teal-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                    ONLINE
                  </span>
                </div>

                {simSteps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`leading-relaxed ${
                      step.includes("SUCCESS") || step.includes("completed")
                        ? "text-teal-400"
                        : step.includes("Step")
                        ? "text-indigo-400"
                        : "text-zinc-300"
                    }`}
                  >
                    <span className="text-zinc-600 mr-2">&gt;</span>
                    {step}
                  </motion.div>
                ))}

                {simRunning && (
                  <div className="flex items-center gap-2 text-zinc-500 animate-pulse mt-3">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Running automation task...
                  </div>
                )}

                {simStage === "idle" && (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-3 py-12">
                    <TerminalSquare className="w-10 h-10 text-zinc-700" />
                    <span>Agent workspace is ready for execution.</span>
                  </div>
                )}
              </div>

              {/* Terminal Bottom Controls */}
              <div className="px-4 py-3 bg-zinc-900/40 border-t border-zinc-900 flex items-center justify-between gap-4">
                <div className="flex-1 bg-zinc-900 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-300"
                    style={{ width: `${simProgress}%` }}
                  />
                </div>
                
                <button
                  onClick={runHeroSimulation}
                  disabled={simRunning}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3" /> Re-Run
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS / DYNAMIC TABS SECTION */}
      <section id="process" className="py-24 border-t border-zinc-900 bg-zinc-950/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-semibold tracking-wider text-teal-400 uppercase">Process Workflow</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Deploy agents in three steps.
            </h3>
            <p className="text-zinc-400 text-base">
              Define the requirements, assign the goal, and track step-by-step resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Tabs List / Left */}
            <div className="lg:col-span-5 space-y-4">
              <button 
                onClick={() => setActiveTab("define")}
                className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                  activeTab === "define" 
                    ? "bg-zinc-900/80 border-teal-500/30 shadow-lg shadow-teal-500/5" 
                    : "bg-transparent border-transparent hover:bg-zinc-900/30"
                }`}
              >
                <div className={`p-2.5 rounded-lg border ${
                  activeTab === "define" ? "bg-teal-500/10 border-teal-500/20 text-teal-400" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                }`}>
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-base font-semibold ${activeTab === "define" ? "text-white" : "text-zinc-300"}`}>
                    1. Define
                  </h4>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    Describe what your agent should do. Set its capabilities, constraints, and goals in natural language or code.
                  </p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab("assign")}
                className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                  activeTab === "assign" 
                    ? "bg-zinc-900/80 border-teal-500/30 shadow-lg shadow-teal-500/5" 
                    : "bg-transparent border-transparent hover:bg-zinc-900/30"
                }`}
              >
                <div className={`p-2.5 rounded-lg border ${
                  activeTab === "assign" ? "bg-teal-500/10 border-teal-500/20 text-teal-400" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                }`}>
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-base font-semibold ${activeTab === "assign" ? "text-white" : "text-zinc-300"}`}>
                    2. Assign
                  </h4>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    Give your agent a mission. It breaks down complex tasks into steps and executes them autonomously.
                  </p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab("monitor")}
                className={`w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 ${
                  activeTab === "monitor" 
                    ? "bg-zinc-900/80 border-teal-500/30 shadow-lg shadow-teal-500/5" 
                    : "bg-transparent border-transparent hover:bg-zinc-900/30"
                }`}
              >
                <div className={`p-2.5 rounded-lg border ${
                  activeTab === "monitor" ? "bg-teal-500/10 border-teal-500/20 text-teal-400" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                }`}>
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-base font-semibold ${activeTab === "monitor" ? "text-white" : "text-zinc-300"}`}>
                    3. Monitor
                  </h4>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    Track progress in real-time. Spin up more agents as needed. Pay only for compute used.
                  </p>
                </div>
              </button>
            </div>

            {/* Visualizer Display / Right */}
            <div className="lg:col-span-7 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 min-h-[380px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {activeTab === "define" && (
                  <motion.div 
                    key="define" 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 text-left h-full"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <span className="text-xs font-mono text-zinc-400">agent_config.json</span>
                      <span className="text-xs text-teal-400 font-mono">YAML-COMPLIANT</span>
                    </div>
                    
                    <pre className="text-xs font-mono text-teal-300 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900 overflow-x-auto leading-relaxed">
{`name: customer-support-agent
version: 1.0.0
capabilities:
  - database:read-only
  - http:outbound
constraints:
  max_tokens_per_task: 150000
  allowed_domains:
    - api.stripe.com
    - api.github.com
goal: >
  Reconcile billing discrepancies and commit updates to accounting database.`}
                    </pre>
                  </motion.div>
                )}

                {activeTab === "assign" && (
                  <motion.div 
                    key="assign" 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 text-left h-full"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <span className="text-xs font-mono text-zinc-400">task_allocation_graph</span>
                      <span className="text-xs text-indigo-400 font-mono">DURABLE WORKFLOW</span>
                    </div>

                    {/* Simple Workflow Flowchart */}
                    <div className="flex flex-col items-center gap-6 py-6">
                      <div className="px-4 py-2 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 border border-teal-500/30 rounded-lg text-xs font-mono text-white shadow-sm">
                        [Start] Goal: Reconcile Account
                      </div>
                      
                      <div className="w-[1px] h-6 bg-zinc-800" />
                      
                      <div className="grid grid-cols-3 gap-4 w-full">
                        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
                          <span className="text-[10px] text-zinc-500 block">SUBTASK 1</span>
                          <span className="text-xs font-semibold text-zinc-300">Fetch Invoice</span>
                        </div>
                        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center relative">
                          <div className="absolute inset-0 border border-teal-500/30 rounded-lg animate-pulse" />
                          <span className="text-[10px] text-teal-400 block font-mono">ACTIVE</span>
                          <span className="text-xs font-semibold text-zinc-200">Verify Payment</span>
                        </div>
                        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center opacity-50">
                          <span className="text-[10px] text-zinc-500 block">PENDING</span>
                          <span className="text-xs font-semibold text-zinc-300">Update Ledger</span>
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-center gap-1.5 mt-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                        <span className="text-[11px] font-mono text-zinc-400">Agent sub-worker executing Step 2 in Sandbox-58</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "monitor" && (
                  <motion.div 
                    key="monitor" 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 text-left h-full"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <span className="text-xs font-mono text-zinc-400">agent_telemetry_monitor</span>
                      <span className="text-xs text-emerald-400 font-mono">REAL-TIME</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-900/60 p-4 border border-zinc-900 rounded-xl space-y-2">
                        <span className="text-xs text-zinc-500 block">CPU Utilisation</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white font-mono">14.2%</span>
                          <span className="text-xs text-emerald-400 font-mono">Optimal</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-400" style={{ width: "14%" }} />
                        </div>
                      </div>
                      <div className="bg-zinc-900/60 p-4 border border-zinc-900 rounded-xl space-y-2">
                        <span className="text-xs text-zinc-500 block">Total Tokens Used</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-white font-mono">82,412</span>
                          <span className="text-xs text-indigo-400 font-mono">Limit: 150k</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: "55%" }} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-900 text-xs font-mono space-y-1.5 max-h-36 overflow-y-auto">
                      <div className="text-zinc-500">[14:02:10] Container spun up (Node-AP-East)</div>
                      <div className="text-zinc-500">[14:02:11] DB Connection verified in 12ms</div>
                      <div className="text-teal-400">[14:02:11] Query finished, processed 412 records</div>
                      <div className="text-zinc-300">[14:02:12] Generating patch report...</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom CTA within visualization */}
              <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-4">
                <span className="text-xs text-zinc-500 font-mono">COMPUTE ENGINE v1.0.0</span>
                <a href="#pricing" className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1">
                  View pricing details <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GLOBAL INFRA / EDGE MAP SECTION */}
      <section id="infra" className="py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-xs font-medium">
                <Globe className="w-3.5 h-3.5 animate-spin-slow" /> Global by Default
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Distributed nodes. Sub-50ms latency.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Your agents run on distributed infrastructure across 29 regions. We execute compute nodes closest to your database and integrations for maximum redundancy and minimum network delay.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-zinc-900">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-300">Anycast IP network routing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-300">Automatic region failover</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-300">Edge database caching layer</span>
                </div>
              </div>
            </div>

            {/* Right Map Visualizer */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between">
                
                {/* Latency Hover Card */}
                <div className="absolute top-4 left-4 z-20">
                  <AnimatePresence mode="wait">
                    {hoveredNode ? (
                      <motion.div
                        key={hoveredNode.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-zinc-900 border border-teal-500/30 p-3 rounded-lg shadow-lg font-mono text-xs text-left w-52 space-y-1.5"
                      >
                        <div className="text-white font-bold">{hoveredNode.name}</div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Ping Latency:</span>
                          <span className="text-teal-400 font-semibold">{hoveredNode.lat}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Node Load:</span>
                          <span className={`${
                            hoveredNode.load === "Optimal" ? "text-emerald-400" : "text-amber-400"
                          } font-semibold`}>{hoveredNode.load}</span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-zinc-900/60 border border-zinc-800 p-3 rounded-lg shadow-sm font-mono text-xs text-left w-52 text-zinc-500">
                        Hover over any active regional node on the map.
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Map SVG */}
                <div className="w-full flex items-center justify-center py-8">
                  <svg 
                    viewBox="0 0 1000 500" 
                    className="w-full max-w-[800px] h-auto opacity-75 relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Dotted Map Grid simulating continents */}
                    <rect width="1000" height="500" fill="none" />
                    
                    {/* SVG map paths (simplified outline) */}
                    <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3">
                      {/* Grid Lines */}
                      <line x1="500" y1="0" x2="500" y2="500" />
                      <line x1="0" y1="250" x2="1000" y2="250" />
                    </g>

                    {/* Node Connective Web Lines (connecting SF, NY, London, Tokyo, Singapore) */}
                    <path 
                      d="M 150 190 Q 215 185 280 180 T 490 140 T 540 150 Q 680 165 820 180 T 740 320 T 880 410" 
                      fill="none" 
                      stroke="rgba(20, 184, 166, 0.15)" 
                      strokeWidth="1.5" 
                      strokeDasharray="4,4"
                    />

                    <path 
                      d="M 280 180 Q 330 285 380 390 Q 470 385 560 380 Q 650 350 740 320" 
                      fill="none" 
                      stroke="rgba(99, 102, 241, 0.12)" 
                      strokeWidth="1.5" 
                      strokeDasharray="4,4"
                    />

                    {/* Regional Pins */}
                    {MAP_NODES.map((node) => (
                      <g 
                        key={node.id} 
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {/* Pulse Ring */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r="12" 
                          fill="rgba(20, 184, 166, 0.15)" 
                          className="animate-ping"
                          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                        />
                        {/* Solid Dot */}
                        <circle 
                          cx={node.x} 
                          cy={node.y} 
                          r="5" 
                          className="fill-teal-400 hover:fill-teal-300 transition-colors"
                        />
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between border-t border-zinc-900 pt-4 text-xs font-mono text-zinc-500 z-20">
                  <span>9 NODES MONITORED</span>
                  <span className="text-emerald-400">99.98% NETWORK INTEGRITY</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONNECT EVERYTHING / INTEGRATIONS LIST */}
      <section id="integrations" className="py-24 border-t border-zinc-900 bg-zinc-950/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="text-left space-y-3">
              <h2 className="text-xs font-semibold tracking-wider text-teal-400 uppercase">Integrations</h2>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Connect your entire stack.
              </h3>
              <p className="text-zinc-400 text-sm max-w-xl">
                Agents connect natively to databases, API endpoints, payment processors, and chat platforms to execute real workflows.
              </p>
            </div>
            
            {/* Search Input */}
            <div className="w-full md:w-80 relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              <input 
                type="text" 
                placeholder="Search tools or platforms..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 outline-none focus:border-teal-500/50 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-xs text-zinc-500 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  selectedCategory === cat 
                    ? "bg-zinc-900 border-teal-500/30 text-teal-400" 
                    : "bg-transparent border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Integration Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredIntegrations.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-all flex flex-col justify-between group relative overflow-hidden text-left"
                >
                  <div className="space-y-4">
                    {/* Mini glow header */}
                    <div className="flex items-center justify-between">
                      <div className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500">
                        {item.category}
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-semibold text-white group-hover:text-teal-400 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-900 pt-4 mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-600 font-mono">NATIVE SDK</span>
                    <span className="text-[11px] text-teal-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Configure <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              ))}

              {filteredIntegrations.length === 0 && (
                <div className="col-span-full py-16 text-center text-zinc-500 font-mono text-sm space-y-2">
                  <Database className="w-10 h-10 mx-auto text-zinc-700" />
                  <div>No integrations matching "{searchQuery}" in {selectedCategory}.</div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* SECURITY / SANBOX SECTION */}
      <section id="security" className="py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-medium">
                <Shield className="w-3.5 h-3.5" /> Enterprise-Grade Trust
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Autonomous, but completely constrained.
              </h3>
              
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Your agents are powerful but operate under strict execution parameters. We implement security boundaries at the infrastructure level, giving you absolute control over what they can read, write, and access.
              </p>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/40">
                <ShieldAlert className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white block">Audit Trail Compliance</span>
                  <span className="text-xs text-zinc-500">Every database call, API interaction, and step is signed cryptographic log verified by the runner layer.</span>
                </div>
              </div>
            </div>

            {/* Right Security Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              
              {/* Card 1 */}
              <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 space-y-3 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                  <Server className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-base font-semibold text-white">Isolated execution</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Each agent operates in its own microVM container. Memory, filesystem, and networking are fully quarantined to prevent leakages.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 space-y-3 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-base font-semibold text-white">Encrypted memory</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Active state data is encrypted in transit and at rest using AES-GCM-256. Private credentials never touch public LLMs.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 space-y-3 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                  <TerminalIcon className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-base font-semibold text-white">Full audit trails</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Every API request, response, block execution, and routing decision is saved in an immutable event ledger.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 space-y-3 hover:border-zinc-700 transition-colors">
                <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                  <Key className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-base font-semibold text-white">Permission boundaries</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Apply scopes manually or via roles. Restrict network domains, API method triggers, and hourly budget parameters.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPER SDK & CODE SANDBOX SECTION */}
      <section id="sandbox" className="py-24 border-t border-zinc-900 bg-zinc-950/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-semibold tracking-wider text-teal-400 uppercase">Developers first</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Write agents in TypeScript.
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base">
              A powerful SDK for compiling, configuring, and testing agents locally before deploying them.
            </p>
          </div>

          {/* Split Sandbox Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Code Panel / Left */}
            <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 overflow-hidden shadow-2xl flex flex-col justify-between">
              
              {/* Code Panel Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveFile("agent.ts")}
                    className={`px-3 py-1 text-xs font-mono rounded ${
                      activeFile === "agent.ts" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    agent.ts
                  </button>
                  <button 
                    onClick={() => setActiveFile("schema.ts")}
                    className={`px-3 py-1 text-xs font-mono rounded ${
                      activeFile === "schema.ts" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    compute.json
                  </button>
                </div>
                
                <button 
                  onClick={() => navigator.clipboard.writeText(activeFile === "agent.ts" ? agentCode : schemaCode)}
                  className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Code Block Content */}
              <div className="p-5 overflow-auto flex-1 font-mono text-xs leading-relaxed text-left text-teal-300 h-96">
                <pre>
                  <code>
                    {activeFile === "agent.ts" ? agentCode : schemaCode}
                  </code>
                </pre>
              </div>

              {/* Specs footer */}
              <div className="px-4 py-3 bg-zinc-900/50 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>TS 5.4 SUPPORTED</span>
                <span>UTF-8</span>
              </div>
            </div>

            {/* Simulated Live Console Output / Right */}
            <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-[#07070a] overflow-hidden shadow-2xl flex flex-col justify-between">
              
              {/* Output Panel Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-900">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5" /> LOCAL SANDBOX EXECUTOR
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                  port: 4200
                </span>
              </div>

              {/* Logs area */}
              <div className="p-5 font-mono text-xs text-left text-zinc-300 space-y-2 flex-1 overflow-y-auto h-96">
                {sdkLogs.map((log, index) => (
                  <div key={index} className="leading-relaxed">
                    <span className="text-zinc-600 mr-2">$</span>
                    {log}
                  </div>
                ))}
                
                {sdkRunning && (
                  <div className="flex items-center gap-2 text-zinc-500 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Compiling and executing...
                  </div>
                )}

                {sdkLogs.length === 0 && !sdkRunning && (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-600 space-y-2">
                    <Play className="w-10 h-10 text-zinc-800" />
                    <span>Click 'Run Sandbox' to execute agent on simulated local stack.</span>
                  </div>
                )}
              </div>

              {/* Progress and trigger bar */}
              <div className="px-4 py-3 bg-zinc-900/50 border-t border-zinc-900 flex items-center justify-between gap-4">
                <div className="flex-1 bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-400 transition-all duration-300"
                    style={{ width: `${sdkProgress}%` }}
                  />
                </div>

                <button
                  onClick={runSdkSandbox}
                  disabled={sdkRunning}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-white text-black hover:bg-zinc-200 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Run Sandbox
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING PLANS GRID */}
      <section id="pricing" className="py-24 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-semibold tracking-wider text-teal-400 uppercase">PRICING MATRIX</h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Sized for teams of all sizes.
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base">
              Pay only for the resources and concurrency limits you need. Switch plans anytime.
            </p>

            {/* Monthly/Annual Toggle */}
            <div className="inline-flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 p-1.5 rounded-xl mt-4">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  !isAnnual ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isAnnual ? "bg-teal-500 text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                Annually
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-black/10 text-black font-extrabold uppercase">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Card 1: Explorer */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/40 flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">Explorer</h4>
                  <p className="text-xs text-zinc-500">For tinkering and small automation tasks.</p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">$0</span>
                  <span className="text-xs text-zinc-500">/ forever</span>
                </div>

                <hr className="border-zinc-900" />

                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    3 concurrent agents
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    1,000 tasks / month
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Basic terminal logs
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Community Discord support
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Public integrations catalog
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 transition-colors">
                  Start Free
                </button>
              </div>
            </div>

            {/* Card 2: Builder (Featured) */}
            <div className="p-6 rounded-2xl border border-teal-500/40 bg-zinc-900/40 flex flex-col justify-between text-left relative overflow-hidden shadow-xl shadow-teal-500/5 group">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-teal-400 to-indigo-500" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">Builder</h4>
                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase border border-teal-500/20">
                    MOST POPULAR
                  </span>
                </div>
                <p className="text-xs text-zinc-400">For teams shipping and deploying agents to production.</p>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {isAnnual ? "$39" : "$49"}
                  </span>
                  <span className="text-xs text-zinc-400">/ agent / month</span>
                </div>

                <hr className="border-zinc-800" />

                <ul className="space-y-3.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    25 concurrent agents
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    50,000 tasks / month
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Full cryptographically signed audit logs
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Private custom integrations
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Team workspaces & custom RBAC roles
                  </li>
                  <li className="flex items-center gap-2.5 text-zinc-400">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Priority email support (3hr SLA)
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-black font-bold transition-all shadow-md shadow-teal-500/10">
                  Subscribe Plan
                </button>
              </div>
            </div>

            {/* Card 3: Scale */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/40 flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">Scale</h4>
                  <p className="text-xs text-zinc-500">For agent-first companies requiring maximum power.</p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">Custom</span>
                </div>

                <hr className="border-zinc-900" />

                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Unlimited agents & tasks
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Dedicated compute & sandboxes
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    Custom LLM gateway routing
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    On-Premise deployment options
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    24/7 Phone & Slack dedicated support
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION (CTA) */}
      <section className="py-24 border-t border-zinc-900 bg-gradient-to-b from-[#060608] via-indigo-950/10 to-[#060608] relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Build your first autonomous worker in minutes.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Scale computation to hundreds of parallel operations with type safety and sandboxed memory. Sign up and get 1,000 tasks free.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing"
              className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-black text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-sm font-semibold transition-colors"
            >
              View GitHub Repository
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          
          {/* Logo & Newsletter */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">COMPUTE</span>
            </div>
            
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              Autonomous AI agents that execute complex workflows across globally distributed sandbox containers.
            </p>

            {/* Newsletter input */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2.5 max-w-xs">
              <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider block">Stay Updated</span>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500/50"
                />
                <button type="submit" className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-semibold transition-colors">
                  Join
                </button>
              </div>
              {newsletterSuccess && (
                <div className="text-[10px] text-teal-400 font-mono">Successfully subscribed. Thank you!</div>
              )}
            </form>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#features" className="hover:text-white transition-colors">Agent capabilities</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing plans</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Developers</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#sandbox" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#sandbox" className="hover:text-white transition-colors">Agent SDK</a></li>
              <li><a href="#sandbox" className="hover:text-white transition-colors">API reference</a></li>
              <li><a href="#infra" className="hover:text-white transition-colors">System status</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#infra" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#infra" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#infra" className="hover:text-white transition-colors flex items-center gap-1.5">
                Careers <span className="text-[9px] px-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded">Hiring</span>
              </a></li>
              <li><a href="#infra" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#security" className="hover:text-white transition-colors">Privacy policy</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Terms of service</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security compliance</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2025 COMPUTE. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

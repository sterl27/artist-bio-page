import React, { useState, useEffect } from 'react';
import { 
  Infinity as InfinityIcon, 
  Leaf, 
  Cpu, 
  Trash2, 
  ShieldCheck, 
  Network, 
  LineChart, 
  Brain, 
  Send,
  Sparkles,
  ArrowRight,
  CheckSquare,
  Square,
  Info,
  CircleDot,
  Calculator,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TelemetryLog {
  id: number;
  agent: string;
  event: string;
  status: 'running' | 'complete' | 'queued';
  time: string;
}

export default function SovereignPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'monk' | 'machine'>('dashboard');

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
      
      {/* Background ambient light guides */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-1/4 w-[600px] h-[600px] bg-cyan-950/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Navigation HUD */}
      <header className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-zinc-900/60 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <InfinityIcon className="w-4.5 h-4.5 text-white animate-pulse-slow" />
            </div>
            <h1 className="text-sm sm:text-base font-bold tracking-widest uppercase text-white">
              Sovereign
              <span className="text-[10px] font-mono font-normal text-zinc-500 tracking-normal ml-2 hidden sm:inline">
                [MIND & MACHINE]
              </span>
            </h1>
          </div>

          {/* Tab Navigation Controls */}
          <div className="flex gap-6 font-semibold tracking-wide text-xs sm:text-sm">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`pb-1 uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'dashboard' ? 'text-white border-b-2 border-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Hub
            </button>
            <button 
              onClick={() => setActiveTab('monk')} 
              className={`pb-1 uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'monk' ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-emerald-400'
              }`}
            >
              The Mind Gym
            </button>
            <button 
              onClick={() => setActiveTab('machine')} 
              className={`pb-1 uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'machine' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-zinc-500 hover:text-cyan-400'
              }`}
            >
              The AI CEO
            </button>
          </div>

          {/* Telemetry Indicator (Desktop) */}
          <div className="hidden md:flex items-center gap-4 border-l border-zinc-800 pl-4">
            <div className="text-xs text-right text-zinc-400 space-y-0.5">
              <div>System Status: <span className="text-green-400 font-semibold">Online</span></div>
              <div>H = O/D Engine: <span className="text-emerald-400 font-semibold">Active</span></div>
              <div>Flywheel Velocity: <span className="text-cyan-400 font-semibold">High</span></div>
            </div>
          </div>

        </div>
      </header>

      {/* Content Hub Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 sm:py-12 z-10 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <HubView setActiveTab={setActiveTab} />
            </motion.div>
          )}

          {activeTab === 'monk' && (
            <motion.div
              key="monk"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <MonkView />
            </motion.div>
          )}

          {activeTab === 'machine' && (
            <motion.div
              key="machine"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <MachineView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}

/* ==========================================
   HUB / PORTALS VIEW
   ========================================== */
function HubView({ setActiveTab }: { setActiveTab: (tab: 'dashboard' | 'monk' | 'machine') => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-left">
      
      {/* Welcome / Stats Panel */}
      <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-800 border-l-2 border-l-zinc-500 col-span-1 md:col-span-2 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 tracking-tight text-white">Welcome to Sovereign</h2>
          <p className="text-zinc-400 max-w-2xl mb-6 text-sm sm:text-base leading-relaxed">
            You are building a high-leverage, 1-Person AI Business. This ecosystem bridges the gap between extreme mindfulness (the Monk) and extreme execution (the CEO). Manage the mechanics with AI; manage the meaning with your human taste and judgment.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-emerald-400 font-mono">High Agency</span>
            <span className="bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 text-cyan-400 font-mono">Decoupling Machine</span>
            <span className="bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700 text-zinc-300 font-mono">Attention Manufacturing</span>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-zinc-900 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white font-mono">50+</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Transcripts Synthesized</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono">H = O/D</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Happiness Equation</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-cyan-400 font-mono">ARR</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Agent Framework</div>
          </div>
        </div>
      </div>

      {/* Quick Access Card */}
      <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-800 flex flex-col justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-zinc-200">Core Modules</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('monk')} 
              className="w-full flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:border-emerald-500/40 group text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <Leaf className="w-4.5 h-4.5 text-emerald-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">The Mind Gym</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </button>
            <button 
              onClick={() => setActiveTab('machine')} 
              className="w-full flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:border-cyan-500/40 group text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-4.5 h-4.5 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">The AI CEO</span>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </button>
          </div>
        </div>
        <div className="text-center text-zinc-500 text-xs font-mono">
          Select a module to begin your session.
        </div>
      </div>

    </div>
  );
}

/* ==========================================
   MONK / MIND VIEW
   ========================================== */
function MonkView() {
  const [poleText, setPoleText] = useState('');
  const [isReleased, setIsReleased] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold'>('Inhale');
  const [reality, setReality] = useState(100);
  const [desire, setDesire] = useState(10);

  // Box Breathing Coach Cycle (4s phases)
  useEffect(() => {
    const phases: ('Inhale' | 'Hold' | 'Exhale' | 'Hold')[] = ['Inhale', 'Hold', 'Exhale', 'Hold'];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % 4;
      setBreathPhase(phases[step]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRelease = () => {
    if (!poleText.trim() || isReleased) return;
    setIsReleased(true);
    setTimeout(() => {
      setPoleText('');
      setIsReleased(false);
    }, 2000);
  };

  const hScore = desire === 0 ? "∞" : (reality / desire).toFixed(1);

  return (
    <div className="space-y-8 mt-4 text-left">
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* H = O/D Happiness Engine */}
        <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-800 border-t-2 border-t-emerald-500 col-span-1 xl:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-light mb-2 flex items-center gap-3 text-white">
              <Calculator className="w-5 h-5 text-emerald-400" /> The H = O/D Happiness Engine
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mb-8">
              Happiness = What You Have (Reality) / What You Desire (Expectations). Reset your denominator to find instant peace.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#0e0e12] p-5 rounded-xl border border-zinc-900">
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-2 font-mono">
                  Reality (What You Have)
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="1000" 
                  value={reality} 
                  onChange={(e) => setReality(Number(e.target.value))} 
                  className="w-full accent-emerald-500 h-1.5 rounded-lg appearance-none bg-zinc-800 cursor-pointer" 
                />
                <div className="text-2xl font-bold text-white mt-2 font-mono">
                  {reality} <span className="text-xs text-zinc-500">Units</span>
                </div>
              </div>

              <div className="bg-[#0e0e12] p-5 rounded-xl border border-zinc-900">
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-2 font-mono">
                  Desire (Expectations)
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={desire} 
                  onChange={(e) => setDesire(Number(e.target.value))} 
                  className="w-full accent-red-500 h-1.5 rounded-lg appearance-none bg-zinc-800 cursor-pointer" 
                />
                <div className="text-2xl font-bold text-white mt-2 font-mono">
                  {desire} <span className="text-xs text-zinc-500">Units</span>
                </div>
              </div>

              <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/20 flex flex-col justify-center items-center text-center">
                <label className="text-[10px] text-emerald-400 uppercase tracking-wider block mb-1 font-mono">
                  Happiness Score
                </label>
                <div className="text-5xl font-black text-emerald-400 font-mono">
                  {hScore}
                </div>
              </div>

            </div>
          </div>

          <div className="mt-8 p-4 bg-black/40 border border-zinc-900 rounded-xl text-zinc-400 italic text-xs leading-relaxed">
            Insight: When happiness drops, you can struggle to force reality (O) to go up, OR you can dynamically reduce desires (D) to reset baseline expectations immediately.
          </div>
        </div>

        {/* Box Breathing Coach */}
        <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-800 flex flex-col items-center justify-center min-h-[350px]">
          <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-8">
            Box Breathing (4-4-4-4)
          </h3>
          
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Background circle */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10" />
            
            {/* Pulsing Breathing Ring */}
            <motion.div 
              animate={{
                scale: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 1.4 : 0.95,
                opacity: breathPhase === 'Hold' || breathPhase === 'Inhale' ? 0.9 : 0.4
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-2 border-emerald-400 bg-emerald-500/10"
            />
            
            <span className="relative z-10 text-xl font-light text-white tracking-widest uppercase font-mono">
              {breathPhase}
            </span>
          </div>
          
          <p className="text-[11px] text-zinc-500 mt-6 text-center leading-relaxed">
            Regulate your sympathetic nervous system before transitioning to task execution.
          </p>
        </div>

      </div>

      {/* Let Go of the Pole Engine */}
      <div className="p-6 sm:p-8 rounded-xl bg-zinc-950/40 border border-zinc-800 border-t-2 border-t-emerald-500 flex flex-col justify-between min-h-[360px]">
        <div>
          <h3 className="text-xl font-light text-white mb-2 flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-emerald-400" /> Detachment Protocol
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
            "The pole won't let me go!" The villager cries. But he is the one gripping it. Drop what you are holding onto dynamically to free cognitive pipeline bandwidth.
          </p>
          
          <div className="relative mt-4">
            <AnimatePresence mode="wait">
              {!isReleased ? (
                <motion.textarea 
                  key="active-input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  value={poleText}
                  onChange={(e) => setPoleText(e.target.value)}
                  placeholder="Type a variable, cognitive attachment, or processing blocker to release..."
                  className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-colors min-h-[140px] resize-none font-mono"
                />
              ) : (
                <motion.div 
                  key="dissolving-text"
                  initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  animate={{ opacity: 0, scale: 1.15, filter: 'blur(12px)', y: -25 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="w-full min-h-[140px] flex items-center justify-center text-emerald-400 font-mono text-base px-4 text-center leading-relaxed"
                >
                  {poleText}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button 
          onClick={handleRelease}
          disabled={!poleText.trim() || isReleased}
          className="mt-6 w-full py-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all font-mono tracking-widest text-xs font-bold uppercase disabled:opacity-40 disabled:cursor-not-allowed"
        >
          EXECUTE RELEASE
        </button>
      </div>

    </div>
  );
}

/* ==========================================
   MACHINE / FLYWHEEL VIEW
   ========================================== */
function MachineView() {
  const [task, setTask] = useState('');
  const [checks, setChecks] = useState({ autonomous: false, recurring: false, reviewable: false });
  const [telemetry, setTelemetry] = useState<TelemetryLog[]>([
    { id: 1, agent: "RESEARCHER", event: "Web context index updated via autonomous browser node scan", status: "complete", time: "04:11:02" },
    { id: 2, agent: "CODER", event: "Refactoring high-density telemetry engine canvas view layers", status: "running", time: "04:12:15" },
    { id: 3, agent: "ANALYST", event: "Compounding loop growth audit and scale trajectory synthesis", status: "queued", time: "04:12:30" }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleCheckChange = (key: 'autonomous' | 'recurring' | 'reviewable') => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isAgentReady = checks.autonomous && checks.recurring && checks.reviewable;

  // Append background events periodically to simulate telemetry feed
  useEffect(() => {
    const events = [
      { agent: "MONITOR", event: "Node memory threshold verified at 12.4% capacity limits", status: "complete" as const },
      { agent: "SYSTEM", event: "Compiling micro-service hooks for ARR pipeline automation container", status: "running" as const },
      { agent: "RESEARCHER", event: "Synthesizing contextual prompt variables for LLM execution node", status: "queued" as const }
    ];

    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] || "";
      
      setTelemetry((prev) => [
        {
          id: Date.now(),
          agent: randomEvent.agent,
          event: randomEvent.event,
          status: randomEvent.status,
          time: timeStr
        },
        ...prev.slice(0, 7) // keep it reasonably short
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleInject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] || "";

    setTelemetry((prev) => [
      {
        id: Date.now(),
        agent: "CONTROL",
        event: inputVal,
        status: "complete",
        time: timeStr
      },
      ...prev
    ]);
    setInputVal("");
  };

  return (
    <div className="space-y-8 mt-4 text-left">
      
      {/* Capability Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-xl bg-zinc-950/40 border border-zinc-900">
          <div className="flex items-center gap-3 mb-2 text-cyan-400">
            <Network className="w-4.5 h-4.5" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Visual Agent Builder</h4>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Drag, connect, and configure agents through an intuitive graph editor. Wire structural dependencies without boilerplate inputs.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-zinc-950/40 border border-zinc-900">
          <div className="flex items-center gap-3 mb-2 text-cyan-400">
            <LineChart className="w-4.5 h-4.5" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Real-time Monitoring</h4>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Trace every execution path. Full lifecycle visibility down to internal prompt boundaries and historical log state matrices.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-zinc-950/40 border border-zinc-900">
          <div className="flex items-center gap-3 mb-2 text-cyan-400">
            <Brain className="w-4.5 h-4.5" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Memory & Context</h4>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Vectorized cross-session long-term memory configuration sync. Agents learn, adapt, and refine operations from every interaction loop.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-zinc-950/40 border border-zinc-900">
          <div className="flex items-center gap-3 mb-2 text-cyan-400">
            <ShieldCheck className="w-4.5 h-4.5" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Guardrails & Rules</h4>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Define system sandbox rules explicitly. Fine-grained tool access controls maintain absolute environment compliance bounds.
          </p>
        </div>

      </div>

      {/* ARR Builder vs Telemetry Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ARR Parser */}
        <div className="p-6 sm:p-8 rounded-xl bg-zinc-950/40 border border-zinc-800 border-t-2 border-t-cyan-500 flex flex-col justify-between min-h-[400px]">
          <div>
            <h3 className="text-lg font-medium text-white mb-1 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-cyan-400" /> ARR Architectural Parser
            </h3>
            <p className="text-zinc-400 text-xs mb-6">
              Evaluate execution targets: Autonomous, Recurring, and Reviewable processes scale via background pipelines.
            </p>
            
            <input 
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Define a workflow or pipeline target structural loop..."
              className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg p-3 text-xs sm:text-sm text-zinc-300 focus:outline-none focus:border-cyan-500/50 transition-colors mb-6 font-mono placeholder-zinc-600"
            />
            
            <div className="space-y-3 font-mono text-xs">
              <button 
                onClick={() => handleCheckChange('autonomous')}
                className={`w-full text-left flex justify-between items-center p-3 rounded border transition-colors ${
                  checks.autonomous 
                    ? 'bg-cyan-500/5 border-cyan-500/30 text-white' 
                    : 'bg-zinc-900/20 border-zinc-900 text-zinc-400 hover:bg-zinc-900/40'
                }`}
              >
                <span className="tracking-wide">01 // AUTONOMOUS (Runs without human thread interaction?)</span>
                {checks.autonomous ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4" />}
              </button>
              
              <button 
                onClick={() => handleCheckChange('recurring')}
                className={`w-full text-left flex justify-between items-center p-3 rounded border transition-colors ${
                  checks.recurring 
                    ? 'bg-cyan-500/5 border-cyan-500/30 text-white' 
                    : 'bg-zinc-900/20 border-zinc-900 text-zinc-400 hover:bg-zinc-900/40'
                }`}
              >
                <span className="tracking-wide">02 // RECURRING (Executes standard cyclical patterns?)</span>
                {checks.recurring ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4" />}
              </button>
              
              <button 
                onClick={() => handleCheckChange('reviewable')}
                className={`w-full text-left flex justify-between items-center p-3 rounded border transition-colors ${
                  checks.reviewable 
                    ? 'bg-cyan-500/5 border-cyan-500/30 text-white' 
                    : 'bg-zinc-900/20 border-zinc-900 text-zinc-400 hover:bg-zinc-900/40'
                }`}
              >
                <span className="tracking-wide">03 // REVIEWABLE (Features clear test metric evaluations?)</span>
                {checks.reviewable ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className={`mt-6 p-4 rounded-lg border font-mono text-xs transition-all duration-300 ${
            isAgentReady ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-zinc-900/20 border-zinc-900 text-zinc-500'
          }`}>
            <div className="flex items-center gap-2 font-bold mb-1 uppercase tracking-wider">
              {isAgentReady ? (
                <CircleDot className="w-4 h-4 text-cyan-400 animate-ping" />
              ) : (
                <Info className="w-4 h-4 text-zinc-500" />
              )}
              Routing Recommendation
            </div>
            <p className="text-[11px] leading-relaxed">
              {isAgentReady 
                ? "CRITERIA MET: Pipeline complies with ARR constraints. Provisioning autonomous workflow agent environment mapping." 
                : "CRITERIA PENDING: Target loop requires continuous synchronous verification. Deploy structured prompt framework manually."}
            </p>
          </div>
        </div>

        {/* Telemetry Stream */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 flex flex-col justify-between overflow-hidden font-mono min-h-[400px]">
          
          <div className="p-4 border-b border-zinc-900 bg-black/20 flex items-center justify-between text-xs tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-bold uppercase text-zinc-300">Live Agent Telemetry Stream</span>
            </div>
            <span className="text-[10px] text-zinc-600">24/7 AUTO-SCALE</span>
          </div>
          
          <div className="p-4 sm:p-6 flex-grow flex flex-col gap-4 text-xs overflow-y-auto max-h-[300px] bg-black/10">
            <AnimatePresence initial={false}>
              {telemetry.map(log => (
                <motion.div 
                  key={log.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-zinc-900/40 pb-3 last:border-0 last:pb-0 text-left"
                >
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="text-cyan-400 font-bold">{log.agent}</span>
                    <span className="text-zinc-600">{log.time}</span>
                  </div>
                  <div className="text-zinc-300 flex justify-between items-start gap-4">
                    <span className="text-[11px] leading-relaxed">{log.event}</span>
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border leading-none shrink-0 ${
                      log.status === 'running' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500 animate-pulse' :
                      log.status === 'complete' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      'bg-zinc-900 border-zinc-800 text-zinc-500'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <form onSubmit={handleInject} className="p-4 border-t border-zinc-900 bg-black/20">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Inject runtime control instruction..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2.5 pl-4 pr-10 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
              />
              <button type="submit" className="absolute right-3 text-cyan-400 hover:text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}

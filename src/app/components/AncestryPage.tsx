import React, { useState } from 'react';
import { 
  BookOpen, 
  MapPin, 
  FileText, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Compass, 
  Info,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Generated Assets
import vintageFamilyBook from '../../assets/ancestry/vintage_family_book.png';
import historicalCensusShip from '../../assets/ancestry/historical_census_ship.png';
import ancestorGentleman from '../../assets/ancestry/ancestor_gentleman.png';
import ancestorLady from '../../assets/ancestry/ancestor_lady.png';

interface AncestorNode {
  id: string;
  name: string;
  role: string;
  years: string;
  image: string;
  x: number; // Percentage coordinate on family tree
  y: number;
  bio: string;
  location: string;
}

const ANCESTORS_DATA: AncestorNode[] = [
  { id: '1', name: 'Arthur Atkinson', role: 'Patriarch', years: '1832 – 1912', image: ancestorGentleman, x: 50, y: 15, bio: 'Emigrated from England to New York in 1852. Established the family homestead and worked as a master carpenter.', location: 'Yorkshire, UK to New York, US' },
  { id: '2', name: 'Margaret Atkinson', role: 'Matriarch', years: '1838 – 1920', image: ancestorLady, x: 74, y: 15, bio: 'A skilled botanist and community organizer. Preserved extensive journals detailing early pioneer life.', location: 'Dublin, IE to Ohio, US' },
  { id: '3', name: 'James Atkinson', role: 'Son / Industrialist', years: '1865 – 1941', image: ancestorGentleman, x: 86, y: 35, bio: 'Led the family business expansion during the steel boom. Advocated for early railroad developments.', location: 'Ohio, US' },
  { id: '4', name: 'Henry Atkinson', role: 'Grandson / Scholar', years: '1892 – 1974', image: ancestorGentleman, x: 18, y: 55, bio: 'Professor of Classical History and primary archivist of the Atkinson Ancestry collections.', location: 'Boston, US' },
  { id: '5', name: 'Clara Atkinson', role: 'Granddaughter', years: '1898 – 1989', image: ancestorLady, x: 50, y: 65, bio: 'Celebrated landscape artist whose oil paintings of the family farm are preserved in the archive.', location: 'Vermont, US' },
  { id: '6', name: 'Edward Atkinson', role: 'Great-Grandson', years: '1924 – 2011', image: ancestorGentleman, x: 68, y: 65, bio: 'WWII naval engineer and pioneer of industrial agriculture machinery designs.', location: 'California, US' },
  { id: '7', name: 'Eleanor Atkinson', role: 'Great-Granddaughter', years: '1928 – Present', image: ancestorLady, x: 80, y: 65, bio: 'Retired schoolteacher who digitised the first generation of family records and letters.', location: 'Oregon, US' }
];

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  details: string;
}

const TIMELINE_DATA: TimelineEvent[] = [
  { year: '1840', title: 'The Voyage Begins', description: 'Arthur Atkinson secures passage aboard the ship *Atlantic* leaving Liverpool.', details: 'Facing economic hardship in the textile mills, 18-year-old Arthur left Yorkshire with nothing but a chest of woodworking tools and his father\'s pocket watch.' },
  { year: '1870', title: 'New Beginnings', description: 'The family homestead is built in the rolling hills of Ohio.', details: 'After years of hard labor in New York, Arthur and Margaret acquired 40 acres of land. They constructed the original timber frame cabin that stood for over a century.' },
  { year: '1900', title: 'Stories Unfold', description: 'James Atkinson expands the family woodworking shop into a steam-powered mill.', details: 'With the arrival of the local railway line, the family enterprise grew rapidly, supplying oak and pine timber for the expanding cities of the Midwest.' },
  { year: '1930', title: 'Through Challenge', description: 'Archival records document resilience through the Great Depression.', details: 'The family transitioned to community cooperative farming, sharing resources and trade logs that became a template for local recovery.' },
  { year: '1960', title: 'Building Futures', description: 'Edward Atkinson establishes the legacy scholarship fund.', details: 'Following his service, Edward dedicated a portion of the family estate to education, financing local trade programs and regional research grants.' },
  { year: '1990', title: 'Connecting Miles', description: 'The first unified family reunion gathers over 150 direct descendants.', details: 'Eleanor Atkinson presents the initial printed edition of the lineage tree, compiling three decades of genealogical research.' },
  { year: 'Today', title: 'Our Story Continues', description: 'This digital archive goes live to preserve the heritage online.', details: 'We digitize and share hundreds of letters, ledgers, and original daguerreotypes for future generations to explore and expand.' }
];

export function AncestryPage() {
  const [selectedAncestor, setSelectedAncestor] = useState<AncestorNode | null>(null);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom states for filter search and search modal
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState<AncestorNode[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const results = ANCESTORS_DATA.filter(anc => 
      anc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anc.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anc.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    setShowSearchModal(true);
  };

  const handlePrevTimeline = () => {
    setActiveTimelineIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextTimeline = () => {
    setActiveTimelineIdx((prev) => (prev < TIMELINE_DATA.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#E7E5E4] font-serif selection:bg-[#C5A880]/30 selection:text-white relative overflow-x-hidden">
      
      {/* Background Subtle Watermark textures */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950/80 to-[#0C0A09] pointer-events-none z-0" />
      
      {/* Dynamic line pattern mimicking vintage paper map routes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#C5A880" strokeWidth="1" strokeDasharray="5,5" />
        <line x1="80%" y1="10%" x2="20%" y2="90%" stroke="#C5A880" strokeWidth="1" strokeDasharray="5,5" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex flex-col min-h-screen justify-between">
        
        {/* Navigation Header */}
        <header className="flex items-center justify-between border-b border-[#C5A880]/15 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full border border-[#C5A880]/40 flex items-center justify-center bg-stone-900">
              <span className="text-[#C5A880] font-bold text-sm tracking-widest">A</span>
            </div>
            <div>
              <span className="font-semibold text-xs tracking-[0.25em] text-[#C5A880] uppercase block">ATKINSON ANCESTRY</span>
              <span className="text-[9px] text-[#A8A29E] tracking-widest uppercase block font-sans">FAMILY HISTORIES & LEGACIES</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.2em] text-[#A8A29E]">
            {['Origins', 'Family Tree', 'Stories', 'Archive'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '-')}`} 
                className="hover:text-[#C5A880] transition-colors relative group py-2"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <form onSubmit={handleSearch} className="relative hidden sm:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lineage..."
                className="bg-stone-900/70 border border-[#C5A880]/20 rounded-full px-4 py-1.5 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#C5A880]/60 transition-colors w-44 font-sans"
              />
              <button type="submit" className="absolute right-3 text-stone-500 hover:text-[#C5A880] transition-colors">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <a 
              href="#family-tree"
              className="bg-transparent border border-[#C5A880]/40 hover:bg-[#C5A880]/10 text-[#C5A880] font-sans text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 rounded-lg transition-all"
            >
              Explore the Lineage
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16 md:py-24">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
                ESTABLISHED 1852
              </div>
              <h1 className="text-4xl md:text-6xl font-normal leading-tight text-stone-100 tracking-tight">
                Every name <br />
                <span className="italic font-light text-[#C5A880]">carried us here.</span>
              </h1>
              <p className="text-[#A8A29E] font-sans text-sm md:text-base leading-relaxed font-light max-w-md">
                Atkinson Ancestry is our private archive of names, photographs, places, and stories—preserved across generations for those who come next.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#family-tree"
                className="bg-[#C5A880] hover:bg-[#b8986d] text-stone-950 font-sans text-xs font-bold uppercase tracking-[0.2em] px-6 py-4 rounded-xl text-center shadow-[0_4px_20px_rgba(197,168,128,0.25)] transition-all"
              >
                Explore the family tree
              </a>
              <a 
                href="#archive"
                className="bg-stone-900 border border-[#C5A880]/20 hover:border-[#C5A880]/50 text-stone-200 font-sans text-xs uppercase tracking-[0.2em] px-6 py-4 rounded-xl text-center transition-all"
              >
                Open the archive
              </a>
            </div>
          </div>

          {/* Right Family Tree Node Visualizer (Reflecting Mockup chart design) */}
          <div id="family-tree" className="lg:col-span-7 bg-[#0E0B0A] border border-[#C5A880]/15 rounded-[2.5rem] p-6 md:p-8 aspect-[4/3] relative shadow-2xl overflow-hidden min-h-[400px]">
            
            {/* Tree Branch SVGs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C5A880" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C5A880" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {/* Connectors connecting nodes */}
              {/* Arthur (50, 15) to Henry (18, 55) & Clara (50, 65) */}
              <path d="M 50% 15% Q 30% 35% 18% 55%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M 50% 15% L 50% 65%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              
              {/* Margaret (74, 15) to James (86, 35) */}
              <path d="M 74% 15% Q 80% 25% 86% 35%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              
              {/* James (86, 35) to Edward (68, 65) & Eleanor (80, 65) */}
              <path d="M 86% 35% Q 78% 50% 68% 65%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M 86% 35% L 80% 65%" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3,3" />
              
              {/* Center Crest circle indicator */}
              <circle cx="62%" cy="40%" r="48" fill="#1C1613" stroke="#C5A880" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx="62%" cy="40%" r="42" fill="none" stroke="#C5A880" strokeWidth="0.5" strokeDasharray="4,4" strokeOpacity="0.5" />
            </svg>

            {/* Center Crest Text */}
            <div className="absolute left-[62%] top-[40%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
              <span className="text-3xl font-light text-[#C5A880] tracking-widest block font-serif uppercase">A</span>
              <span className="text-[7px] text-[#A8A29E] font-sans tracking-[0.2em] block uppercase mt-0.5">LINEAGE</span>
            </div>

            {/* Render Nodes */}
            {ANCESTORS_DATA.map((anc) => (
              <button
                key={anc.id}
                onClick={() => setSelectedAncestor(anc)}
                className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none group z-10"
                style={{ left: `${anc.x}%`, top: `${anc.y}%` }}
              >
                <div className="relative">
                  {/* Outer glowing gold ring */}
                  <div className="absolute -inset-1.5 rounded-full border border-[#C5A880]/30 opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(197,168,128,0.35)]" />
                  
                  {/* Frame ring */}
                  <div className="h-14 w-14 rounded-full border-2 border-[#C5A880]/60 p-0.5 overflow-hidden bg-stone-950 transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src={anc.image} 
                      alt={anc.name} 
                      className="w-full h-full object-cover rounded-full grayscale filter contrast-[110%] sepia-[15%]"
                    />
                  </div>

                  {/* Name badge popup tooltips */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-stone-950/95 border border-[#C5A880]/30 rounded px-2.5 py-1 w-28 text-center pointer-events-none opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all shadow-xl">
                    <span className="text-[9px] font-bold text-white block uppercase tracking-wider truncate">{anc.name}</span>
                    <span className="text-[8px] text-[#C5A880] block font-sans tracking-wide">{anc.years}</span>
                  </div>
                </div>
              </button>
            ))}

            {/* Instruction watermark */}
            <div className="absolute bottom-4 left-6 flex items-center gap-1.5 text-[10px] font-sans text-stone-500 tracking-wider">
              <Info className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>CLICK ANY NODE TO EXPLORE THEIR ARCHIVAL DOSSIER</span>
            </div>

          </div>

        </main>

      </div>

      {/* Selected Ancestor Bios Drawer Modal */}
      <AnimatePresence>
        {selectedAncestor && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedAncestor(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#120F0D] border border-[#C5A880]/20 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedAncestor(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="h-32 w-32 rounded-2xl border border-[#C5A880]/40 p-1 bg-stone-900 flex-shrink-0">
                  <img 
                    src={selectedAncestor.image} 
                    alt={selectedAncestor.name} 
                    className="w-full h-full object-cover rounded-xl grayscale filter contrast-110 sepia-20"
                  />
                </div>
                
                <div className="space-y-4 text-center sm:text-left flex-1">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#C5A880]">
                      {selectedAncestor.role}
                    </span>
                    <h3 className="text-2xl font-normal text-stone-100 mt-1">{selectedAncestor.name}</h3>
                    <p className="text-xs text-[#A8A29E] font-sans mt-0.5 tracking-wide">{selectedAncestor.years}</p>
                  </div>

                  <p className="text-stone-300 font-sans text-sm leading-relaxed font-light">
                    {selectedAncestor.bio}
                  </p>

                  <div className="pt-2 border-t border-[#C5A880]/15 grid grid-cols-2 gap-2 text-[10px] font-sans text-stone-500 uppercase tracking-widest">
                    <div>
                      <span>Origin / Lands</span>
                      <p className="text-stone-300 normal-case font-serif tracking-normal text-xs mt-0.5">{selectedAncestor.location}</p>
                    </div>
                    <div>
                      <span>Database ID</span>
                      <p className="text-stone-300 tracking-wider text-xs mt-0.5">#ANC-00{selectedAncestor.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 2: A Living Record */}
      <section id="origins" className="bg-[#120F0D] border-t border-b border-[#C5A880]/10 py-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-normal text-stone-100 tracking-tight leading-tight">
                A living record, <br />
                <span className="italic font-light text-[#C5A880]">not a dusty archive.</span>
              </h2>
              <p className="text-[#A8A29E] font-sans text-sm md:text-base leading-relaxed font-light max-w-lg">
                We bring together the threads of our family history—stories, places, and documents—so each generation can know where they came from and who walked before them.
              </p>
              
              <a 
                href="#stories" 
                className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#b8986d] transition-colors group"
              >
                <span>Discover the stories</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Selectors card rows */}
            <div className="space-y-4 max-w-lg">
              {[
                { icon: BookOpen, title: 'Stories', desc: 'Personal accounts and memories that bring our family to life.' },
                { icon: MapPin, title: 'Places', desc: 'The towns, farms, and landscapes that shaped our journey.' },
                { icon: FileText, title: 'Documents', desc: 'Original records and keepsakes from our family archive.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-stone-900/40 border border-[#C5A880]/10 hover:border-[#C5A880]/30 hover:bg-stone-900/60 transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-[#C5A880]/5 flex items-center justify-center border border-[#C5A880]/15 text-[#C5A880] group-hover:bg-[#C5A880]/10 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-200 text-sm tracking-wide font-sans">{item.title}</h4>
                    <p className="text-xs text-stone-400 font-sans leading-relaxed mt-1 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image stacked layers */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-8">
            <div className="relative max-w-md w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
              {/* Back Book Layer */}
              <img 
                src={vintageFamilyBook} 
                alt="Vintage family ledger books" 
                className="w-full h-full object-cover filter contrast-[105%] brightness-90 shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Generations Timeline */}
      <section id="stories" className="py-24 bg-[#0C0A09] relative">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-normal text-stone-100 uppercase tracking-tight">Our timeline</h2>
            <p className="text-[10px] text-[#C5A880] font-sans font-bold uppercase tracking-[0.25em]">EXPLORE KEY MOMENTS ACROSS GENERATIONS</p>
          </div>

          {/* Horizontal slider view */}
          <div className="relative border-t border-b border-[#C5A880]/15 py-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-stone-950/40 rounded-3xl px-6 md:px-12 max-w-5xl mx-auto shadow-inner">
            
            <button 
              onClick={handlePrevTimeline}
              disabled={activeTimelineIdx === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[#C5A880]/20 flex items-center justify-center hover:border-[#C5A880]/60 hover:bg-stone-900 disabled:opacity-30 disabled:hover:border-[#C5A880]/20 disabled:hover:bg-transparent transition-all cursor-pointer z-10"
            >
              <ChevronLeft className="w-5 h-5 text-[#C5A880]" />
            </button>

            <button 
              onClick={handleNextTimeline}
              disabled={activeTimelineIdx === TIMELINE_DATA.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[#C5A880]/20 flex items-center justify-center hover:border-[#C5A880]/60 hover:bg-stone-900 disabled:opacity-30 disabled:hover:border-[#C5A880]/20 disabled:hover:bg-transparent transition-all cursor-pointer z-10"
            >
              <ChevronRight className="w-5 h-5 text-[#C5A880]" />
            </button>

            {/* Timeline Progress Bar (HTML) */}
            <div className="w-full flex justify-between items-center relative py-6 max-w-3xl mx-auto overflow-x-auto scrollbar-none gap-6 px-8">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#C5A880]/15 -translate-y-1/2 z-0" />
              
              {TIMELINE_DATA.map((event, idx) => {
                const isActive = idx === activeTimelineIdx;
                return (
                  <button
                    key={event.year}
                    onClick={() => setActiveTimelineIdx(idx)}
                    className="relative z-10 flex flex-col items-center gap-3 shrink-0 cursor-pointer focus:outline-none"
                  >
                    <span className={`text-xs font-sans uppercase tracking-widest font-bold transition-all duration-300 ${isActive ? 'text-[#C5A880] scale-110' : 'text-stone-500'}`}>
                      {event.year}
                    </span>
                    <div className={`h-3 w-3 rounded-full border transition-all duration-300 ${isActive ? 'bg-[#C5A880] border-[#C5A880] scale-125 shadow-[0_0_8px_#C5A880]' : 'bg-stone-950 border-stone-700'}`} />
                  </button>
                );
              })}
            </div>

            {/* Timeline Info cards */}
            <div className="w-full max-w-xl mx-auto text-center md:text-left space-y-4 py-4 min-h-[160px] px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTimelineIdx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <h3 className="text-xl md:text-2xl font-normal text-stone-100">{TIMELINE_DATA[activeTimelineIdx].title}</h3>
                  <p className="text-[#C5A880] font-sans text-xs font-bold uppercase tracking-wider">
                    {TIMELINE_DATA[activeTimelineIdx].description}
                  </p>
                  <p className="text-stone-400 font-sans text-sm leading-relaxed font-light">
                    {TIMELINE_DATA[activeTimelineIdx].details}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Section 4: Built from Evidence */}
      <section id="archive" className="bg-[#120F0D] border-t border-b border-[#C5A880]/10 py-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Collage stack */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-8 order-2 lg:order-1">
            <div className="relative max-w-md w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-800">
              <img 
                src={historicalCensusShip} 
                alt="Census record details and steam passenger ships" 
                className="w-full h-full object-cover filter contrast-[105%] brightness-90 shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Compass icon layout badge overlay */}
              <div className="absolute bottom-5 left-5 bg-stone-950/80 border border-[#C5A880]/30 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm">
                <Compass className="w-6 h-6 text-[#C5A880] animate-spin-slow" />
                <div className="font-sans text-[10px] tracking-wider text-stone-400">
                  <span className="font-bold text-stone-200 block">VOYAGE ARCHIVES</span>
                  RECORDED 1880
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Block */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 lg:pl-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-normal text-stone-100 tracking-tight leading-tight">
                Built from the <br />
                <span className="italic font-light text-[#C5A880]">evidence they left behind.</span>
              </h2>
              <p className="text-[#A8A29E] font-sans text-sm md:text-base leading-relaxed font-light">
                Every photograph, record, and handwritten note is a piece of the bigger picture. We preserve the evidence so their legacy remains clear.
              </p>
              
              <a 
                href="#origins" 
                className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#b8986d] transition-colors group pt-2"
              >
                <span>Browse the archive</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Section 5: Add your branch CTA card */}
      <section className="py-20 max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-[#1C1613] border border-[#C5A880]/20 rounded-[3rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
          
          {/* Subtle vector tree background */}
          <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none scale-125">
            <svg viewBox="0 0 100 100" className="w-96 h-96" fill="#C5A880">
              <path d="M50,10 C60,25 70,30 70,50 C70,75 55,90 50,95 C45,90 30,75 30,50 C30,30 40,25 50,10 Z" />
            </svg>
          </div>

          <div className="space-y-4 max-w-xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-normal text-stone-100 tracking-tight uppercase leading-tight">
              Add your branch <br />
              <span className="italic font-light text-[#C5A880]">to the story.</span>
            </h2>
            <p className="text-[#A8A29E] font-sans text-sm leading-relaxed font-light">
              Our family tree grows stronger with every connection. Share what you know, preserve what you have, and help future generations belong.
            </p>
          </div>

          <div className="relative z-10 pt-2">
            <button 
              onClick={() => alert("Archive contribution portal coming soon!")}
              className="bg-transparent border border-[#C5A880] hover:bg-[#C5A880]/15 text-[#C5A880] font-sans text-xs font-bold uppercase tracking-[0.2em] px-8 py-4.5 rounded-xl transition-all shadow-lg hover:shadow-2xl cursor-pointer"
            >
              Explore the lineage
            </button>
          </div>

        </div>
      </section>

      {/* Page Footer */}
      <footer className="border-t border-[#C5A880]/10 bg-stone-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full border border-[#C5A880]/30 flex items-center justify-center bg-stone-900">
              <span className="text-[#C5A880] font-bold text-xs tracking-widest">A</span>
            </div>
            <div>
              <span className="font-semibold text-xs tracking-[0.2em] text-[#C5A880] uppercase block">ATKINSON ANCESTRY</span>
              <p className="text-[10px] text-stone-500 font-sans tracking-wide leading-relaxed mt-0.5">Preserving our past. Inspiring our future.</p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[10px] font-sans uppercase tracking-[0.2em] text-[#A8A29E]">
            <a href="#origins" className="hover:text-white transition-colors">Origins</a>
            <a href="#family-tree" className="hover:text-white transition-colors">Family Tree</a>
            <a href="#stories" className="hover:text-white transition-colors">Stories</a>
            <a href="#archive" className="hover:text-white transition-colors">Archive</a>
          </div>

          <div className="text-[10px] font-sans text-stone-600 tracking-wider text-center md:text-right">
            <span>© 2026 Atkinson Ancestry.</span>
            <span className="block mt-0.5">All rights reserved.</span>
          </div>

        </div>
      </footer>

      {/* Search Results Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowSearchModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#120F0D] border border-[#C5A880]/20 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowSearchModal(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-normal text-stone-100 font-serif uppercase tracking-wide">Search Results</h3>
                  <p className="text-xs text-stone-500 font-sans mt-0.5">Matching terms for "{searchQuery}"</p>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {searchResults.length > 0 ? (
                    searchResults.map((anc) => (
                      <button
                        key={anc.id}
                        onClick={() => {
                          setSelectedAncestor(anc);
                          setShowSearchModal(false);
                        }}
                        className="w-full text-left flex items-center gap-4 p-3 rounded-xl bg-stone-900/40 border border-[#C5A880]/15 hover:border-[#C5A880]/50 hover:bg-stone-900/80 transition-all cursor-pointer group"
                      >
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-[#C5A880]/40 flex-shrink-0">
                          <img src={anc.image} alt={anc.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-sans font-bold text-stone-200 block group-hover:text-[#C5A880] transition-colors truncate">{anc.name}</span>
                          <span className="text-[10px] text-stone-500 font-sans block">{anc.role} // {anc.years}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-[#C5A880] transition-all" />
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8 text-stone-500 font-sans text-xs">
                      No matching records found. Try "Arthur", "Matriarch", or "James".
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
export default AncestryPage;

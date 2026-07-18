import { motion } from "framer-motion";
import { Music, Play } from "lucide-react";

const releases = [
  {
    id: 1,
    title: "Evidence",
    year: "2025",
    type: "EP · 6 Tracks",
    src: "https://images.unsplash.com/photo-1741715588278-0927d007951e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXAlMjBoaXAlMjBob3AlMjBhbGJ1bSUyMGNvdmVyJTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTc4MTIzOTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    link: "#",
  },
  {
    id: 2,
    title: "Night Court",
    year: "2024",
    type: "Mixtape · 14 Tracks",
    src: "https://images.unsplash.com/photo-1592700819903-308f4820372d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxyYXAlMjBoaXAlMjBob3AlMjJhbGJ1bSUyMGNvdmVyJTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTc4MTIzOTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    link: "#",
  },
  {
    id: 3,
    title: "Open File",
    year: "2023",
    type: "Single",
    src: "https://images.unsplash.com/photo-1660292498853-244dcffe4d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxyYXAlMjBoaXAlMjBob3AlMjJhbGJ1bSUyMGNvdmVyJTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTc4MTIzOTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    link: "#",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-xs font-bold tracking-widest text-stone-500 uppercase mb-4 block">Discography</span>
            <h2 className="text-3xl md:text-4xl font-light text-stone-100">Selected Releases</h2>
          </div>
          <a href="#" className="hidden md:block text-sm border-b border-stone-600 pb-1 hover:text-stone-400 hover:border-stone-400 transition-colors text-stone-400">
            View Full Discography
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-4 bg-stone-900 aspect-square relative">
                <img
                  src={release.src}
                  alt={release.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="ml-1 text-black w-6 h-6" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-stone-100 flex items-center gap-2">
                    <Music className="w-4 h-4 text-stone-500" />
                    {release.title}
                  </h3>
                  <p className="text-sm text-stone-500 mt-0.5">{release.type}</p>
                </div>
                <span className="text-sm font-serif italic text-stone-600">{release.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="#" className="text-sm border-b border-stone-600 pb-1 hover:text-stone-400 hover:border-stone-400 transition-colors text-stone-400">
            View Full Discography
          </a>
        </div>
      </div>
    </section>
  );
}

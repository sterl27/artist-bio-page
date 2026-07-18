import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="py-24 px-6 bg-stone-900 text-stone-100">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-xs font-bold tracking-widest text-stone-500 uppercase mb-4 block">Interview</span>
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-stone-100">In the Booth with Cold Case</h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-video bg-stone-950 overflow-hidden shadow-2xl border border-stone-800"
        >
          {!isPlaying ? (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/60 group cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src="https://images.unsplash.com/photo-1559732277-7453b141e3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpbyUyMHJlY29yZGluZyUyMGhpcCUyMGhvcCUyMGRhcmt8ZW58MXx8fHwxNzgxMjM5NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Interview Thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-30"
              />
              <div className="relative z-10 w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <Play className="ml-1 text-stone-950 w-8 h-8" fill="currentColor" />
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Cold Case Interview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </motion.div>

        <p className="mt-8 text-stone-400 font-light max-w-2xl mx-auto">
          A sit-down session exploring Cold Case's creative process, lyricism, and the stories behind the <span className="italic">Evidence</span> EP.
          Filmed at Compound Studios, Los Angeles.
        </p>
      </div>
    </section>
  );
}

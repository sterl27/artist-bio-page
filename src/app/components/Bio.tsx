import { motion } from "framer-motion";

export function Bio() {
  return (
    <section id="bio" className="py-24 px-6 bg-stone-900 text-stone-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-bold tracking-widest text-stone-500 uppercase mb-4 block">Biography</span>
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-stone-100">
            "Every bar is a body of evidence."
          </h2>

          <div className="grid md:grid-cols-2 gap-12 text-stone-400 leading-relaxed font-light">
            <p>
              Cold Case is a Los Angeles-based rapper whose music sits at the intersection of street narrative and
              cinematic storytelling. Drawing from the gritty textures of West Coast hip-hop and the introspective
              weight of noir fiction, Cold Case crafts verses that feel like open investigations — unresolved, urgent,
              and impossible to ignore.
            </p>
            <p>
              After years of building underground credibility through local showcases and self-released mixtapes,
              Cold Case broke through with a sound that refuses easy categorization. Lyrically dense and atmospherically
              dark, the music has earned comparisons to early Kendrick Lamar and the late-night energy of ScHoolboy Q.
            </p>
            <p>
              Currently working on a debut studio album, Cold Case continues to push the boundaries of West Coast rap —
              weaving cold-case crime motifs, personal testimony, and philosophical inquiry into something wholly original.
              Featured in XXL, HotNewHipHop, and Complex.
            </p>
            <div className="bg-stone-800 p-6 border-l-2 border-stone-700">
              <h3 className="text-stone-100 font-medium mb-2">Milestones</h3>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>2025 — <span className="italic">Evidence</span> EP — 500K+ streams</li>
                <li>2024 — XXL Freshman Class Nomination</li>
                <li>2024 — <span className="italic">Night Court</span> mixtape — HotNewHipHop Pick</li>
                <li>2023 — Complex "Artists to Watch" feature</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

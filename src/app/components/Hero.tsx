import { motion } from "framer-motion";
import profilePic from "figma:asset/d5af311e95f7511a2e3d57d00adc3c70a81f9da8.png";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-stone-100 leading-tight">
            Every Bar <br />
            <span className="italic font-serif text-stone-600">A Cold Case</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-400 mb-8 max-w-md font-light leading-relaxed">
            West Coast rapper. Lyrically dense. Atmospherically dark. Telling stories the city left unsolved.
          </p>
          <a
            href="#gallery"
            className="inline-block border-b border-stone-100 pb-1 text-sm uppercase tracking-widest hover:text-stone-400 hover:border-stone-400 transition-all text-stone-100"
          >
            Listen Now
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-1 md:order-2 relative aspect-[3/4] md:aspect-square overflow-hidden"
        >
          <img
            src={profilePic}
            alt="Cold Case Portrait"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
          />
        </motion.div>
      </div>
    </section>
  );
}

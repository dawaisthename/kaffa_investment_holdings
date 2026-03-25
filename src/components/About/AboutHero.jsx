import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="bg-[#0a1622] pt-48 pb-24 px-8 md:px-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#c5a35d] uppercase tracking-[0.4em] text-[11px] font-bold mb-6 block"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-5xl md:text-6xl font-serif leading-[1.05] mb-8 tracking-tight font-bold"
          >
            About Kaffa Holding
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md pb-4"
        >
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
            A principled investment group committed to building enduring value
            through disciplined capital deployment and operational excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

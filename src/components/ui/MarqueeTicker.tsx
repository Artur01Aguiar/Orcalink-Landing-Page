import { motion } from 'framer-motion'

const items = [
  '📸 Fotógrafo',
  '🎨 Designer',
  '💉 Tatuador',
  '🏋️ Personal Trainer',
  '🥗 Nutricionista',
  '🎬 Videomaker',
  '⚖️ Advogado',
  '🏗️ Arquiteto',
  '💅 Esteticista',
  '🎵 Músico',
  '📐 Engenheiro',
  '🎓 Coach',
]

export default function MarqueeTicker() {
  const doubled = [...items, ...items]

  return (
    <div className="w-full overflow-hidden border-y border-border py-4 bg-white">
      <div className="flex relative">
        {/* Gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #fff 0%, transparent 100%)' }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, #fff 0%, transparent 100%)' }}
        />

        <motion.div
          className="flex gap-8 whitespace-nowrap flex-shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted px-2"
            >
              {item}
              <span className="text-border mx-2">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

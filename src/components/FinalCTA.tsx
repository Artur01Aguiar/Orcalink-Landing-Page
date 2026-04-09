import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedBorderButton } from './ui/AnimatedBorderButton'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-dark py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Blue glow center */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7"
        >
          {/* Tag */}
          <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Comece hoje, grátis
          </span>

          <h2 className="font-heading font-bold text-3xl lg:text-5xl text-white leading-tight tracking-tight">
            Quantas vendas você perdeu essa semana porque{' '}
            <span className="text-primary">demorou pra responder?</span>
          </h2>

          <p className="text-white/60 text-lg max-w-lg mx-auto">
            5 minutos pra criar seu link. Zero reais pra começar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedBorderButton
              href="#precos"
              borderRadius={12}
              duration={3}
              aria-label="Criar meu link agora — é grátis"
              className="bg-white text-dark font-heading font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:bg-background transition-colors"
            >
              Criar meu link agora — é grátis
              <ArrowRight size={18} />
            </AnimatedBorderButton>
          </div>

          <p className="text-white/35 text-sm">
            Sem cartão de crédito · Cancela quando quiser · Setup em 5 minutos
          </p>
        </motion.div>
      </div>
    </section>
  )
}

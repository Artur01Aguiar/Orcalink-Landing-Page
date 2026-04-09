import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Animated number counter ────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)   // ease-out cubic
      setValue(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])

  return value
}

// ── Metric card ────────────────────────────────────────────────────────────
function MetricCard({
  prefix,
  numericValue,
  suffix,
  label,
  active,
  delay,
}: {
  prefix?: string
  numericValue: number | null
  suffix: string
  label: string
  active: boolean
  delay: number
}) {
  const count = useCountUp(numericValue ?? 0, active && numericValue !== null, 1600)

  const displayValue =
    numericValue === null
      ? suffix              // static label like "R$0"
      : `${prefix ?? ''}${count}${suffix}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-colors overflow-hidden"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 60%)' }}
      />

      <p className="font-mono font-bold text-4xl lg:text-5xl text-white tracking-tight mb-3">
        {displayValue}
      </p>
      <p className="text-white/55 text-sm leading-relaxed">{label}</p>
    </motion.div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
const metrics = [
  {
    prefix: '',
    numericValue: 23,
    suffix: 'x/dia',
    label: 'É quantas vezes um fotógrafo responde "quanto custa?" no WhatsApp',
  },
  {
    prefix: '',
    numericValue: 47,
    suffix: ' min',
    label: 'Perdidos por dia respondendo orçamentos manualmente',
  },
  {
    prefix: '',
    numericValue: null,
    suffix: '32,5M',
    label: 'Autônomos e MEIs no Brasil com esse problema',
  },
  {
    prefix: '',
    numericValue: null,
    suffix: 'R$0',
    label: 'Que você precisa pagar pra começar hoje',
  },
]

export default function SocialProof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-dark py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Decorative blue glow top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-heading font-semibold uppercase tracking-widest mb-4">
            O problema
          </p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white leading-tight">
            Custa caro para{' '}
            <span className="text-primary">32 milhões</span>{' '}
            de brasileiros
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, i) => (
            <MetricCard
              key={i}
              {...m}
              active={inView}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

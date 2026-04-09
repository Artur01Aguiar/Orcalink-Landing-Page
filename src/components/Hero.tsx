import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp } from 'lucide-react'
import PhoneMockup from './PhoneMockup'
import { TextRotate } from './ui/TextRotate'
import { AnimatedBorderButton } from './ui/AnimatedBorderButton'
import MarqueeTicker from './ui/MarqueeTicker'

const notifications = [
  { emoji: '📸', text: 'Ana viu seu orçamento', delay: 0 },
  { emoji: '💰', text: 'Pedro aceitou: R$890', delay: 0.9 },
  { emoji: '⚡', text: '12 orçamentos hoje', delay: 1.8 },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const professions = [
  'fotógrafos',
  'designers',
  'tatuadores',
  'personal trainers',
  'nutricionistas',
  'videomakers',
]

export default function Hero() {
  return (
    <div>
      <section
        id="hero"
        className="relative overflow-hidden bg-white"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        {/* Background: subtle CSS grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Gradient orbs */}
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 65%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* ── Left: copy ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-xl"
            >
              {/* Trust badge */}
              <motion.div variants={itemVariants} className="mb-7">
                <span className="inline-flex items-center gap-2 text-xs font-semibold font-heading text-primary bg-light border border-blue-200 rounded-full px-4 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  A única ferramenta brasileira de orçamento automático
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-heading font-bold text-[42px] sm:text-5xl lg:text-[56px] text-dark leading-[1.06] tracking-tight mb-5"
              >
                Seu cliente pergunta o preço.{' '}
                <span className="text-primary">Você já respondeu.</span>
              </motion.h1>

              {/* Rotating professions */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 mb-5 text-lg text-muted"
              >
                <span>Feito para</span>
                <span className="inline-flex overflow-hidden" style={{ minWidth: 180, height: '1.5em' }}>
                  <TextRotate
                    texts={professions}
                    mainClassName="text-primary font-heading font-bold text-lg"
                    rotationInterval={2000}
                    staggerDuration={0.03}
                    transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                  />
                </span>
              </motion.div>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-base text-muted leading-relaxed mb-9 max-w-md"
              >
                Crie um link com seu cardápio de serviços. Seu cliente abre, escolhe o que quer e já vê o valor — sem te mandar mensagem.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
                <AnimatedBorderButton
                  href="#precos"
                  borderRadius={12}
                  duration={3.5}
                  aria-label="Criar meu link grátis"
                  className="bg-primary text-white font-heading font-bold text-base px-7 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Criar meu link grátis
                  <ArrowRight size={18} />
                </AnimatedBorderButton>

                <a
                  href="#demo"
                  className="inline-flex items-center gap-2.5 text-dark font-heading font-semibold text-base hover:text-primary transition-colors"
                >
                  <span className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <Play size={13} fill="currentColor" className="ml-0.5" />
                  </span>
                  Ver demo ao vivo
                </a>
              </motion.div>

              {/* Social proof bar */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-x-6 gap-y-1.5"
              >
                {['Sem cartão de crédito', 'Grátis pra sempre no plano básico', 'Setup em 5 minutos'].map(
                  (t, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-sm text-muted">
                      <span className="text-success font-bold">✓</span>
                      {t}
                    </span>
                  )
                )}
              </motion.div>

              {/* Live counter */}
              <motion.div
                variants={itemVariants}
                className="mt-8 inline-flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3"
              >
                <TrendingUp size={16} className="text-success flex-shrink-0" />
                <span className="text-sm text-dark">
                  <span className="font-mono font-bold text-success">847</span>
                  {' '}orçamentos gerados essa semana
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right: phone + floating notifications ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Glow behind phone */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.1) 0%, transparent 70%)',
                }}
              />

              <div className="relative">
                <PhoneMockup />

                {/* Floating notifications */}
                {notifications.map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: [0, -5, 0],
                    }}
                    transition={{
                      opacity: { delay: 1 + n.delay, duration: 0.4 },
                      x: { delay: 1 + n.delay, duration: 0.4 },
                      y: {
                        delay: 1.5 + n.delay,
                        duration: 3 + i * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className="absolute bg-white border border-border rounded-xl px-3 py-2 shadow-card flex items-center gap-2 whitespace-nowrap"
                    style={{
                      left: i === 0 ? '-128px' : i === 2 ? '-116px' : undefined,
                      right: i === 1 ? '-116px' : undefined,
                      top: i === 0 ? '55px' : i === 1 ? '185px' : '315px',
                    }}
                  >
                    <span className="text-base">{n.emoji}</span>
                    <span className="text-xs font-semibold text-dark font-heading">{n.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profession marquee — sits between hero and next section */}
      <MarqueeTicker />
    </div>
  )
}

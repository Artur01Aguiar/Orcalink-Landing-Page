import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, Zap, ArrowRight } from 'lucide-react'

type Plan = {
  name: string
  monthlyPrice: number | null
  annualPrice: number | null
  badge?: string
  highlighted?: boolean
  freeForever?: boolean
  features: string[]
  cta: string
  ctaNote?: string
}

const plans: Plan[] = [
  {
    name: 'Grátis',
    monthlyPrice: 0,
    annualPrice: 0,
    freeForever: true,
    features: [
      '1 formulário de orçamento',
      'Até 30 orçamentos/mês',
      'Link público personalizado',
      'Badge "Feito com OrcaLink"',
      'Notificações por email',
    ],
    cta: 'Criar conta grátis',
    ctaNote: 'Sem cartão de crédito',
  },
  {
    name: 'Pro',
    monthlyPrice: 29.9,
    annualPrice: 23.9,
    badge: 'Mais popular',
    highlighted: true,
    features: [
      'Formulários ilimitados',
      'Orçamentos ilimitados',
      'Sem badge OrcaLink',
      'Analytics de conversão',
      'Notificação por WhatsApp',
      'Suporte prioritário',
    ],
    cta: 'Começar 14 dias grátis',
  },
  {
    name: 'Business',
    monthlyPrice: 59.9,
    annualPrice: 47.9,
    features: [
      'Tudo do Pro',
      'Domínio customizado',
      'Múltiplos profissionais',
      'Analytics avançado',
      'Relatório mensal em PDF',
      'API de integrações',
    ],
    cta: 'Falar com a gente',
  },
]

function PriceBlock({
  plan,
  annual,
}: {
  plan: Plan
  annual: boolean
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={annual ? 'annual' : 'monthly'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
      >
        {plan.freeForever ? (
          <div className="flex flex-col gap-0.5">
            <span className="font-mono font-bold text-4xl text-dark">R$0</span>
            <span className="text-sm text-success font-semibold">para sempre</span>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {annual && plan.monthlyPrice! > 0 && (
              <span className="text-sm text-muted line-through font-mono">
                R${plan.monthlyPrice!.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-bold text-4xl text-dark">
                R${(annual ? plan.annualPrice! : plan.monthlyPrice!).toFixed(2).replace('.', ',')}
              </span>
              <span className="text-muted text-sm">/mês</span>
            </div>
            {annual && (
              <span className="text-xs text-success font-semibold">cobrado anualmente</span>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="precos" className="bg-white py-20 lg:py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-heading font-semibold uppercase tracking-widest mb-4">
            Preços
          </p>
          <h2 className="section-heading text-3xl lg:text-4xl mb-4">
            Começa grátis. Cresce com você.
          </h2>
          <p className="text-muted text-lg max-w-md mx-auto mb-8">
            Sem surpresas. Sem letras miúdas.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 bg-background border border-border rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200 ${
                !annual ? 'bg-white shadow text-dark' : 'text-muted hover:text-dark'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                annual ? 'bg-white shadow text-dark' : 'text-muted hover:text-dark'
              }`}
            >
              Anual
              <span className="text-[10px] bg-success text-white px-2 py-0.5 rounded-full font-heading leading-none">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl flex flex-col ${
                plan.highlighted
                  ? 'border-2 border-primary shadow-card-blue bg-white'
                  : 'border border-border bg-white shadow-card'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-white text-xs font-heading font-bold px-4 py-1.5 rounded-full shadow whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-xl text-dark mb-5">{plan.name}</h3>

                <div className="mb-7">
                  <PriceBlock plan={plan} annual={annual} />
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={11} className="text-success" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-dark">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <a
                    href="#"
                    className={`flex items-center justify-center gap-2 w-full font-heading font-bold text-sm py-3.5 rounded-xl transition-all duration-200 ${
                      plan.highlighted
                        ? 'bg-primary text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                        : 'bg-background border border-border text-dark hover:border-primary/50 hover:bg-light'
                    }`}
                    aria-label={`${plan.cta} — plano ${plan.name}`}
                  >
                    {plan.highlighted && <Zap size={14} />}
                    {plan.cta}
                    {plan.highlighted && <ArrowRight size={14} />}
                  </a>
                  {plan.ctaNote && (
                    <p className="text-xs text-muted text-center">{plan.ctaNote}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-muted text-sm mt-10 max-w-xl mx-auto leading-relaxed"
        >
          Break-even em 5 clientes. Com 30 clientes Pro ={' '}
          <span className="text-dark font-semibold">R$897/mês de receita recorrente</span> — ideal para quem indica a plataforma.
        </motion.p>
      </div>
    </section>
  )
}

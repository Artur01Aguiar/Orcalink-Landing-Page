import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

// ── Data ───────────────────────────────────────────────────────────────────
const allTestimonials = [
  {
    initials: 'AB',
    name: 'Ana Beatriz',
    role: 'Fotógrafa',
    city: 'Recife, PE',
    quote:
      'Eu respondia umas 20 mensagens de orçamento por dia. Com a OrcaLink, mando o link e o cliente já chega sabendo o preço. Só fecho a data.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    initials: 'PL',
    name: 'Pedro Lima',
    role: 'Designer Gráfico',
    city: 'São Paulo, SP',
    quote:
      'Meu link ficou mais bonito que o Typeform que eu usava e ainda calcula o preço automaticamente. Não tem comparação.',
    color: 'from-purple-500 to-purple-700',
  },
  {
    initials: 'CR',
    name: 'Camila Rocha',
    role: 'Personal Trainer',
    city: 'Belo Horizonte, MG',
    quote:
      'Três alunos fecharam o plano depois de ver o orçamento no link — sem eu precisar responder nada. Vale muito mais que R$30/mês.',
    color: 'from-green-500 to-green-700',
  },
  {
    initials: 'RM',
    name: 'Rafael Matos',
    role: 'Tatuador',
    city: 'Curitiba, PR',
    quote:
      'Antes eu recebia pedido de orçamento sem nenhuma referência. Agora o cliente já vem com a ideia formada e o preço na cabeça.',
    color: 'from-gray-600 to-gray-800',
  },
  {
    initials: 'JS',
    name: 'Julia Souza',
    role: 'Nutricionista',
    city: 'Rio de Janeiro, RJ',
    quote:
      'Eliminei 2 horas por dia respondendo as mesmas perguntas. Meus clientes adoram a experiência — parece de app grande.',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    initials: 'LF',
    name: 'Lucas Ferreira',
    role: 'Videomaker',
    city: 'Florianópolis, SC',
    quote:
      'O formulário qualifica o cliente antes mesmo do contato. Só entro em conversa com quem já entendeu o valor do meu trabalho.',
    color: 'from-orange-500 to-orange-700',
  },
  {
    initials: 'MK',
    name: 'Mariana Keller',
    role: 'Fotógrafa',
    city: 'Brasília, DF',
    quote:
      'Setup em 10 minutos e no mesmo dia já tinha compartilhado no Instagram. Recebi 3 pedidos de agendamento no fim do dia.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    initials: 'CE',
    name: 'Carlos Esteves',
    role: 'Designer UI/UX',
    city: 'Porto Alegre, RS',
    quote:
      'Profissionalizou minha imagem na hora. O cliente olha o link e já entende que lida com alguém sério.',
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    initials: 'BP',
    name: 'Beatriz Pinto',
    role: 'Personal Trainer',
    city: 'Fortaleza, CE',
    quote:
      'Fechei 5 alunos em uma semana só compartilhando o link no stories. Antes eu ficava horas no WhatsApp explicando pacotes.',
    color: 'from-pink-500 to-pink-700',
  },
]

// Split into 3 columns
const col1 = [allTestimonials[0], allTestimonials[3], allTestimonials[6]]
const col2 = [allTestimonials[1], allTestimonials[4], allTestimonials[7]]
const col3 = [allTestimonials[2], allTestimonials[5], allTestimonials[8]]

// ── Card ───────────────────────────────────────────────────────────────────
function TestimonialCard({
  initials,
  name,
  role,
  city,
  quote,
  color,
}: (typeof allTestimonials)[0]) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-card flex flex-col gap-4">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} fill="#F59E0B" className="text-amber-400" />
        ))}
      </div>

      <p className="text-dark text-sm leading-relaxed flex-1">"{quote}"</p>

      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white text-[10px] font-bold font-heading">{initials}</span>
        </div>
        <div>
          <p className="text-sm font-bold text-dark font-heading leading-none mb-0.5">{name}</p>
          <p className="text-xs text-muted">
            {role} · {city}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Scrolling column ───────────────────────────────────────────────────────
function TestimonialsColumn({
  testimonials,
  duration,
  direction = 'up',
}: {
  testimonials: typeof allTestimonials
  duration: number
  direction?: 'up' | 'down'
}) {
  const translateFrom = direction === 'up' ? '0%' : '-50%'
  const translateTo = direction === 'up' ? '-50%' : '0%'

  return (
    <div className="overflow-hidden flex-1 min-w-0" style={{ maxHeight: 680 }}>
      <motion.div
        className="flex flex-col gap-4"
        animate={{ translateY: [translateFrom, translateTo] }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      >
        {[0, 1].map((rep) => (
          <React.Fragment key={rep}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={`${rep}-${i}`} {...t} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-background py-20 lg:py-28 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-heading font-semibold uppercase tracking-widest mb-4">
            Depoimentos
          </p>
          <h2 className="section-heading text-3xl lg:text-4xl">
            O que profissionais estão dizendo
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ maskImage: 'linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)' }}
        >
          <TestimonialsColumn testimonials={col1} duration={20} direction="up" />
          <TestimonialsColumn testimonials={col2} duration={26} direction="down" />
          <TestimonialsColumn testimonials={col3} duration={22} direction="up" />
        </motion.div>
      </div>
    </section>
  )
}

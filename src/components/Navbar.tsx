import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Preços', href: '#precos' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-border/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 group">
            <span className="font-heading font-bold text-xl tracking-tight">
              <span className="text-primary">orca</span>
              <span className="text-dark">link</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-dark px-3 py-2 rounded-lg hover:bg-background transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#precos"
              className="text-sm font-medium text-muted hover:text-dark transition-colors"
            >
              Entrar
            </a>
            <a
              href="#precos"
              className="inline-flex items-center gap-1.5 bg-primary text-white font-heading font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-150 shadow-sm hover:shadow-md"
            >
              Criar meu link grátis
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-muted hover:text-dark hover:bg-background transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-muted hover:text-dark py-2.5 px-3 rounded-lg hover:bg-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 pb-1">
                <a
                  href="#precos"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-primary text-white font-heading font-semibold text-sm py-3 rounded-lg"
                >
                  Criar meu link grátis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

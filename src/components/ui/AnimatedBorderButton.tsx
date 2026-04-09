import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface AnimatedBorderButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  duration?: number
  borderRadius?: number
  'aria-label'?: string
}

/**
 * Primary CTA button with an animated light-streak border.
 * Drop-in replacement for <a> or <button>.
 */
export function AnimatedBorderButton({
  children,
  className = '',
  href,
  onClick,
  duration = 4,
  borderRadius = 12,
  'aria-label': ariaLabel,
}: AnimatedBorderButtonProps) {
  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center gap-2 ${className}`}
    >
      {/* Animated streak overlay — sits on top of the button border */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-1.5px',
          borderRadius: `${borderRadius + 1}px`,
          border: '1.5px solid rgba(255,255,255,0.18)',
          maskClip: 'padding-box, border-box',
          maskComposite: 'intersect',
          maskImage:
            'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        } as React.CSSProperties}
      >
        <motion.div
          className="absolute aspect-square"
          style={
            {
              width: 28,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.9) 100%)',
              offsetPath: `rect(0 auto auto 0 round ${borderRadius}px)`,
            } as React.CSSProperties
          }
          animate={{ offsetDistance: ['0%', '100%'] }}
          transition={{ repeat: Infinity, duration, ease: 'linear' }}
        />
      </div>

      {children}
    </Tag>
  )
}

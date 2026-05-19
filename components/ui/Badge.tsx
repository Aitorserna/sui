import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'green' | 'red' | 'yellow' | 'gray'
}

const variants = {
  gold: 'bg-gold-500/20 text-gold-400 border border-gold-500/30',
  green: 'bg-green-500/20 text-green-400 border border-green-500/30',
  red: 'bg-red-500/20 text-red-400 border border-red-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  gray: 'bg-white/10 text-white/60 border border-white/20',
}

export function Badge({ className, variant = 'gray', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
}

import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  gold?: boolean
}

export function Card({ className, gold, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-zinc-900 border',
        gold ? 'border-gold-500/50' : 'border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6 pb-0', className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

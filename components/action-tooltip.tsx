'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
  children: React.ReactNode
  label: string
  side?: 'left' | 'right' | 'top' | 'bottom' | undefined
  align?: 'start' | 'center' | 'end'
}

export const ActionTooltip = ({
  children,
  label,
  side,
  align
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="text-sm font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

"use client"

import { motion } from "motion/react"
import { useIconAnimation } from "../hooks/useIconAnimation"
import type { IconProps } from "../lib/types"

export const SavePlus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  lively = 'scale',
  trigger = 'hover',
  'aria-label': ariaLabel
}: IconProps) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, lively, trigger)
  const isDraw = lively === 'draw'

  const useCssDraw = isDraw && trigger === 'hover'
  const useMotionDraw = isDraw && trigger !== 'hover'
  const drawClass = useCssDraw ? 'draw-animation' : ''

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className || ''} ${drawClass}`.trim()}
      {...(!isDraw ? animationProps : useCssDraw ? drawWrapperProps : {})}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <motion.path
        d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      <motion.path
        d="M12 7v6"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
      <motion.path
        d="M9 10h6"
        pathLength={1}
        className={useCssDraw ? 'draw-path' : ''}
        {...(useMotionDraw ? pathAnimationProps : {})}
      />
    </motion.svg>
  )
}

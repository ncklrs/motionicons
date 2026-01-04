/**
 * Motion presets - predefined animation variants for each motion type
 */

import type { Variants, Transition } from 'motion/react'
import type { MotionType } from './types'

export interface MotionPreset {
  variants: Variants
  transition: Transition
}

/**
 * Spring transition presets for different animation feels
 */
const springBouncy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 10
}

const springSoft: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20
}

const springSnappy: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 25
}

// Available for custom transitions
export const easeSmooth: Transition = {
  duration: 0.3,
  ease: 'easeInOut'
}

/**
 * All available motion presets
 */
export const motionPresets: Record<MotionType, MotionPreset> = {
  scale: {
    variants: {
      initial: { scale: 1 },
      hover: { scale: 1.15 }
    },
    transition: springBouncy
  },

  rotate: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: 180 }
    },
    transition: springSoft
  },

  translate: {
    variants: {
      initial: { x: 0, y: 0 },
      hover: { x: 2, y: -2 }
    },
    transition: springSnappy
  },

  shake: {
    variants: {
      initial: { x: 0 },
      hover: { x: [0, -3, 3, -3, 3, 0] }
    },
    transition: { duration: 0.4 }
  },

  pulse: {
    variants: {
      initial: { scale: 1, opacity: 1 },
      hover: {
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1]
      }
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },

  bounce: {
    variants: {
      initial: { y: 0 },
      hover: { y: [0, -6, 0] }
    },
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      times: [0, 0.5, 1]
    }
  },

  draw: {
    variants: {
      initial: { opacity: 0.4, scale: 0.9 },
      hover: { opacity: 1, scale: 1 }
    },
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },

  spin: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: 360 }
    },
    transition: {
      duration: 0.8,
      ease: 'linear',
      repeat: Infinity
    }
  },

  ring: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: [0, 14, -12, 8, -6, 3, 0] }
    },
    transition: {
      duration: 0.6,
      ease: [0.36, 0, 0.66, 1]
    }
  },

  wiggle: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: [0, -12, 12, -8, 8, -4, 4, 0] }
    },
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },

  heartbeat: {
    variants: {
      initial: { scale: 1 },
      hover: { scale: [1, 1.15, 1, 1.1, 1] }
    },
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
      times: [0, 0.14, 0.28, 0.42, 1]
    }
  },

  swing: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: [0, 15, -10, 5, -5, 0] }
    },
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },

  float: {
    variants: {
      initial: { y: 0 },
      hover: { y: [0, -8, 0] }
    },
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity
    }
  },

  none: {
    variants: {
      initial: {},
      hover: {}
    },
    transition: { duration: 0 }
  }
}

/**
 * Get motion preset by type
 */
export function getMotionPreset(type: MotionType = 'scale'): MotionPreset {
  return motionPresets[type] || motionPresets.scale
}

/**
 * List of all available motion types for UI display
 */
export const motionTypeList: { type: MotionType; label: string; description: string }[] = [
  { type: 'scale', label: 'Scale', description: 'Grow on hover' },
  { type: 'rotate', label: 'Rotate', description: 'Spin on hover' },
  { type: 'translate', label: 'Translate', description: 'Slide on hover' },
  { type: 'shake', label: 'Shake', description: 'Wobble effect' },
  { type: 'pulse', label: 'Pulse', description: 'Heartbeat effect' },
  { type: 'bounce', label: 'Bounce', description: 'Bouncy spring' },
  { type: 'draw', label: 'Draw', description: 'Fade reveal' },
  { type: 'spin', label: 'Spin', description: 'Continuous rotation' },
  { type: 'ring', label: 'Ring', description: 'Bell swing' },
  { type: 'wiggle', label: 'Wiggle', description: 'Playful wiggle' },
  { type: 'heartbeat', label: 'Heartbeat', description: 'Double pulse' },
  { type: 'swing', label: 'Swing', description: 'Pendulum swing' },
  { type: 'float', label: 'Float', description: 'Gentle hover' },
  { type: 'none', label: 'None', description: 'No animation' }
]

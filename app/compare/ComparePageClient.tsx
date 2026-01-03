"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  Heart, Star, Bell, Check, X,
  ArrowRight, Zap, Eye, Sparkles, Refresh
} from "../../src/icons"
import { Navigation } from "../components/Navigation"
import { LogoWithText } from "../components/Logo"

type LibraryKey = 'livelyicons' | 'lucide' | 'heroicons' | 'phosphor'

interface Library {
  name: string
  description: string
  iconCount: string
  bundleSize: string
  animations: boolean
  animationTypes: number
  triggerModes: number
  typescript: boolean
  treeShaking: boolean
  rsc: boolean
  customization: 'full' | 'basic' | 'limited'
  website: string
  strengths: string[]
}

const libraries: Record<LibraryKey, Library> = {
  livelyicons: {
    name: "LivelyIcons",
    description: "Animated icons powered by Motion for React",
    iconCount: "1300+",
    bundleSize: "1.8 KB",
    animations: true,
    animationTypes: 9,
    triggerModes: 4,
    typescript: true,
    treeShaking: true,
    rsc: true,
    customization: 'full',
    website: "https://livelyicons.com",
    strengths: [
      "Built-in hover animations",
      "9 motion types (scale, rotate, pulse, draw, etc.)",
      "4 trigger modes (hover, loop, mount, inView)",
      "Motion-powered smooth 60fps animations",
      "RSC-compatible static exports",
      "shadcn/ui registry support"
    ]
  },
  lucide: {
    name: "Lucide",
    description: "Beautiful & consistent icon toolkit",
    iconCount: "1400+",
    bundleSize: "~1 KB",
    animations: false,
    animationTypes: 0,
    triggerModes: 0,
    typescript: true,
    treeShaking: true,
    rsc: true,
    customization: 'basic',
    website: "https://lucide.dev",
    strengths: [
      "Largest icon collection",
      "Fork of Feather Icons",
      "Active community",
      "Consistent design language",
      "Multi-framework support"
    ]
  },
  heroicons: {
    name: "Heroicons",
    description: "Hand-crafted icons by the Tailwind team",
    iconCount: "300+",
    bundleSize: "~0.5 KB",
    animations: false,
    animationTypes: 0,
    triggerModes: 0,
    typescript: true,
    treeShaking: true,
    rsc: true,
    customization: 'basic',
    website: "https://heroicons.com",
    strengths: [
      "Made by Tailwind CSS team",
      "Outline and solid variants",
      "24px and 20px sizes",
      "Perfect Tailwind integration",
      "Clean, minimal design"
    ]
  },
  phosphor: {
    name: "Phosphor Icons",
    description: "Flexible icon family for interfaces",
    iconCount: "1200+",
    bundleSize: "~1.2 KB",
    animations: false,
    animationTypes: 0,
    triggerModes: 0,
    typescript: true,
    treeShaking: true,
    rsc: true,
    customization: 'full',
    website: "https://phosphoricons.com",
    strengths: [
      "6 weights per icon",
      "Large icon collection",
      "Figma plugin available",
      "Consistent across weights",
      "Multi-framework support"
    ]
  }
}

const features = [
  { key: 'animations', label: 'Built-in Animations', description: 'Icons animate on interaction without extra code' },
  { key: 'animationTypes', label: 'Animation Types', description: 'Number of distinct animation styles available' },
  { key: 'triggerModes', label: 'Trigger Modes', description: 'Ways to trigger animations (hover, loop, mount, inView)' },
  { key: 'iconCount', label: 'Icon Count', description: 'Total number of icons in the library' },
  { key: 'bundleSize', label: 'Bundle Size (1 icon)', description: 'Gzipped size when importing a single icon' },
  { key: 'typescript', label: 'TypeScript', description: 'Full TypeScript support with exported types' },
  { key: 'treeShaking', label: 'Tree Shaking', description: 'Import only what you use' },
  { key: 'rsc', label: 'React Server Components', description: 'Works in Next.js App Router server components' },
] as const

export default function ComparePageClient() {
  const [selectedLibrary, setSelectedLibrary] = useState<LibraryKey | null>(null)

  return (
    <div className="min-h-screen bg-void">
      <Navigation />

      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <span className="tag tag-electric mb-4 inline-block">
                Comparison
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-bone mb-4">
                How LivelyIcons compares
              </h1>
              <p className="text-silver max-w-2xl mx-auto text-lg">
                See how LivelyIcons stacks up against other popular React icon libraries.
                The right choice depends on your needs.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Key Differentiator */}
        <div className="border-b border-graphite bg-carbon">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 bg-graphite border border-electric/30 px-6 py-4 mb-8">
                <Sparkles size={24} className="text-electric" lively="pulse" trigger="loop" />
                <span className="text-bone font-display font-semibold">
                  LivelyIcons is the only library with built-in animations
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Refresh, value: '9', label: 'Motion Types', sublabel: 'scale, rotate, pulse, draw...' },
                  { icon: Zap, value: '4', label: 'Trigger Modes', sublabel: 'hover, loop, mount, inView' },
                  { icon: Eye, value: '60fps', label: 'Smooth Motion', sublabel: 'Powered by Motion library' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 bg-graphite border border-electric/30 flex items-center justify-center">
                      <stat.icon size={28} className="text-electric" />
                    </div>
                    <div className="text-3xl font-display font-bold text-bone">{stat.value}</div>
                    <div className="text-sm text-ghost">{stat.label}</div>
                    <div className="text-xs text-silver mt-1">{stat.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold text-bone mb-6 text-center">
                See the difference
              </h2>
              <p className="text-silver text-center mb-8 max-w-xl mx-auto">
                Other libraries give you static icons. LivelyIcons brings them to life.
                Hover over the icons below to see the animation.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Static comparison */}
                <div className="bg-carbon border border-graphite p-6">
                  <div className="text-xs text-silver uppercase tracking-wider mb-6">Other Libraries</div>
                  <div className="flex gap-4 justify-center mb-6">
                    <div className="w-14 h-14 bg-graphite border border-steel flex items-center justify-center text-silver">
                      <Heart size={26} animated={false} />
                    </div>
                    <div className="w-14 h-14 bg-graphite border border-steel flex items-center justify-center text-silver">
                      <Star size={26} animated={false} />
                    </div>
                    <div className="w-14 h-14 bg-graphite border border-steel flex items-center justify-center text-silver">
                      <Bell size={26} animated={false} />
                    </div>
                  </div>
                  <p className="text-sm text-silver text-center">Static • No interaction feedback</p>
                </div>

                {/* Animated comparison */}
                <div className="bg-carbon border border-electric/30 p-6">
                  <div className="text-xs text-electric uppercase tracking-wider mb-6">LivelyIcons</div>
                  <div className="flex gap-4 justify-center mb-6">
                    <div className="w-14 h-14 bg-graphite border border-electric/30 flex items-center justify-center text-electric cursor-pointer">
                      <Heart size={26} lively="pulse" />
                    </div>
                    <div className="w-14 h-14 bg-graphite border border-electric/30 flex items-center justify-center text-electric cursor-pointer">
                      <Star size={26} lively="scale" />
                    </div>
                    <div className="w-14 h-14 bg-graphite border border-electric/30 flex items-center justify-center text-electric cursor-pointer">
                      <Bell size={26} lively="shake" />
                    </div>
                  </div>
                  <p className="text-sm text-electric text-center">Animated • Hover to interact</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="font-display text-2xl font-bold text-bone mb-8 text-center">
                Feature Comparison
              </h2>

              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-graphite">
                      <th className="text-left py-4 px-4 text-xs text-silver uppercase tracking-wider w-48">Feature</th>
                      {(Object.keys(libraries) as LibraryKey[]).map((key) => (
                        <th
                          key={key}
                          className={`text-center py-4 px-4 text-xs uppercase tracking-wider ${
                            key === 'livelyicons' ? 'text-electric bg-electric/5' : 'text-silver'
                          }`}
                        >
                          {libraries[key].name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature) => (
                      <tr key={feature.key} className="border-b border-graphite/50">
                        <td className="py-4 px-4">
                          <div className="text-sm text-ghost font-medium">{feature.label}</div>
                          <div className="text-xs text-silver">{feature.description}</div>
                        </td>
                        {(Object.keys(libraries) as LibraryKey[]).map((key) => {
                          const lib = libraries[key]
                          const value = lib[feature.key as keyof Library]
                          const isLively = key === 'livelyicons'

                          return (
                            <td
                              key={key}
                              className={`text-center py-4 px-4 ${isLively ? 'bg-electric/5' : ''}`}
                            >
                              {typeof value === 'boolean' ? (
                                value ? (
                                  <Check size={20} className={isLively ? 'text-electric mx-auto' : 'text-leaf-dim mx-auto'} />
                                ) : (
                                  <X size={20} className="text-steel mx-auto" />
                                )
                              ) : typeof value === 'number' ? (
                                <span className={`text-sm font-medium ${value > 0 ? (isLively ? 'text-electric' : 'text-ghost') : 'text-steel'}`}>
                                  {value > 0 ? value : '—'}
                                </span>
                              ) : (
                                <span className={`text-sm ${isLively ? 'text-electric font-medium' : 'text-ghost'}`}>
                                  {value}
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="lg:hidden space-y-4">
                {(Object.keys(libraries) as LibraryKey[]).map((key) => {
                  const lib = libraries[key]
                  const isLively = key === 'livelyicons'
                  const isSelected = selectedLibrary === key

                  return (
                    <motion.div
                      key={key}
                      className={`bg-carbon border ${isLively ? 'border-electric/30' : 'border-graphite'} overflow-hidden`}
                    >
                      <button
                        onClick={() => setSelectedLibrary(isSelected ? null : key)}
                        className="w-full px-4 py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {isLively && <Sparkles size={18} className="text-electric" />}
                          <span className={`font-display font-semibold ${isLively ? 'text-electric' : 'text-bone'}`}>
                            {lib.name}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isSelected ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight size={18} className="text-silver rotate-90" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-3 border-t border-graphite/50 pt-4">
                              {features.map((feature) => {
                                const value = lib[feature.key as keyof Library]
                                return (
                                  <div key={feature.key} className="flex justify-between items-center">
                                    <span className="text-sm text-silver">{feature.label}</span>
                                    {typeof value === 'boolean' ? (
                                      value ? (
                                        <Check size={18} className="text-electric" />
                                      ) : (
                                        <X size={18} className="text-steel" />
                                      )
                                    ) : (
                                      <span className="text-sm text-ghost">{value}</span>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* When to Choose Each */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="font-display text-2xl font-bold text-bone mb-8 text-center">
                When to choose each library
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(Object.keys(libraries) as LibraryKey[]).map((key, i) => {
                  const lib = libraries[key]
                  const isLively = key === 'livelyicons'

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      className={`bg-carbon border ${isLively ? 'border-electric/30' : 'border-graphite'} p-5`}
                    >
                      <h3 className={`font-display font-semibold mb-2 ${isLively ? 'text-electric' : 'text-bone'}`}>
                        {lib.name}
                      </h3>
                      <p className="text-sm text-silver mb-4">{lib.description}</p>
                      <div className="text-xs text-silver uppercase tracking-wider mb-2">Best for:</div>
                      <ul className="space-y-1">
                        {lib.strengths.slice(0, 3).map((strength, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <Check size={14} className={`mt-0.5 shrink-0 ${isLively ? 'text-electric' : 'text-leaf-dim'}`} />
                            <span className="text-ghost">{strength}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={lib.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-sm mt-4 ${
                          isLively ? 'text-electric' : 'text-silver hover:text-ghost'
                        } transition-colors`}
                      >
                        Visit website
                        <ArrowRight size={14} />
                      </a>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Code Comparison */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold text-bone mb-4 text-center">
                Adding animations: LivelyIcons vs Others
              </h2>
              <p className="text-silver text-center mb-8 max-w-2xl mx-auto">
                With other libraries, you need to wrap icons in animation components.
                With LivelyIcons, animations are built-in.
              </p>

              <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Other libraries */}
                <div className="bg-carbon border border-graphite overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-graphite">
                    <div className="w-3 h-3 rounded-full bg-amber" />
                    <div className="w-3 h-3 rounded-full bg-leaf-dim" />
                    <div className="w-3 h-3 rounded-full bg-leaf" />
                    <span className="ml-4 text-xs text-silver">other-library.tsx</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                    <code className="text-ghost">{`import { Heart } from 'lucide-react'
import { motion } from 'motion/react'

// You need to add motion wrapper
<motion.div
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring" }}
>
  <Heart />
</motion.div>`}</code>
                  </pre>
                </div>

                {/* LivelyIcons */}
                <div className="bg-carbon border border-electric/30 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-electric/30">
                    <div className="w-3 h-3 rounded-full bg-amber" />
                    <div className="w-3 h-3 rounded-full bg-leaf-dim" />
                    <div className="w-3 h-3 rounded-full bg-leaf" />
                    <span className="ml-4 text-xs text-electric">livelyicons.tsx</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                    <code className="text-ghost">{`import { Heart } from 'livelyicons'

// Animation is built-in!
<Heart lively="scale" />

// Or try other animations
<Heart lively="pulse" />
<Heart lively="bounce" />
<Heart lively="draw" />`}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 sm:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-carbon to-void" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-6">
                Ready to bring your icons to life?
              </h2>
              <p className="text-lg text-silver mb-10 max-w-2xl mx-auto">
                Try LivelyIcons today and see how animated icons can enhance your user experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/icons" className="btn-primary flex items-center justify-center gap-2">
                  Browse Icons
                  <ArrowRight size={18} />
                </Link>
                <Link href="/docs" className="btn-secondary">
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-graphite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/">
              <LogoWithText iconSize={24} />
            </Link>
            <p className="text-sm text-silver">
              Built with Motion for React
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

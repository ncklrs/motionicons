"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Star, Check, ArrowRight, Copy } from "../../src/icons"
import { useState } from "react"

export default function DocsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyCode = (code: string, section: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const CodeBlock = ({ code, section }: { code: string; section: string }) => (
    <div className="relative code-block group">
      <button
        onClick={() => copyCode(code, section)}
        className="absolute top-3 right-3 p-2 bg-graphite hover:bg-steel transition-colors opacity-0 group-hover:opacity-100"
      >
        {copiedSection === section ? (
          <Check size={16} className="text-electric" />
        ) : (
          <Copy size={16} className="text-silver" />
        )}
      </button>
      <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
        <code className="text-ghost">{code}</code>
      </pre>
    </div>
  )

  const installCode = `pnpm add motion-icons`

  const basicUsageCode = `import { Check, Heart, Loader } from 'motion-icons'

function App() {
  return (
    <div>
      <Check size={24} />
      <Heart size={32} strokeWidth={1.5} />
      <Loader size={24} />
    </div>
  )
}`

  const providerCode = `import { IconProvider } from 'motion-icons'

// Disable all animations globally
<IconProvider config={{ animated: false }}>
  <App />
</IconProvider>

// Override at component level
<IconProvider config={{ animated: false }}>
  <Check />           {/* Static */}
  <Heart animated />  {/* Animated - overrides provider */}
</IconProvider>`

  const accessibilityCode = `// Decorative icons (default)
<Heart />  {/* aria-hidden="true" */}

// Meaningful icons with labels
<Heart aria-label="Add to favorites" />
<Check aria-label="Task completed" />`

  const sections = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Basic Usage" },
    { id: "animation", label: "Animation Control" },
    { id: "accessibility", label: "Accessibility" },
    { id: "api", label: "API Reference" },
  ]

  return (
    <div className="min-h-screen bg-void">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-void/80 backdrop-blur-xl border-b border-graphite">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric rounded-sm flex items-center justify-center">
              <Star size={18} className="text-void" />
            </div>
            <span className="font-display font-bold text-lg text-bone">
              MotionIcons
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/icons"
              className="text-sm text-silver hover:text-electric transition-colors"
            >
              Icons
            </Link>
            <Link
              href="/docs"
              className="text-sm text-electric"
            >
              Docs
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 border-r border-graphite overflow-y-auto">
          <nav className="p-6 space-y-1">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block px-4 py-2 text-sm text-silver hover:text-electric hover:bg-carbon transition-colors"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="tag tag-electric mb-4 inline-block">Documentation</span>
            <h1 className="font-display text-4xl font-bold text-bone mb-4">
              Getting Started
            </h1>
            <p className="text-silver text-lg mb-12">
              Everything you need to add animated icons to your React application.
            </p>
          </motion.div>

          {/* Installation */}
          <section id="installation" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">1</span>
              Installation
            </h2>
            <p className="text-silver mb-6">
              Install MotionIcons using your package manager of choice:
            </p>
            <CodeBlock code={installCode} section="install" />
            <p className="text-sm text-silver mt-4">
              MotionIcons requires React 18+ and Motion 12+.
            </p>
          </section>

          <div className="divider my-12" />

          {/* Basic Usage */}
          <section id="usage" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">2</span>
              Basic Usage
            </h2>
            <p className="text-silver mb-6">
              Import icons individually and use them as React components. Each icon accepts <code className="text-electric">size</code>, <code className="text-electric">strokeWidth</code>, and <code className="text-electric">className</code> props.
            </p>
            <CodeBlock code={basicUsageCode} section="usage" />

            <div className="mt-8 bg-carbon border border-graphite p-6">
              <h4 className="font-display font-semibold text-bone mb-3">Default Values</h4>
              <ul className="space-y-2 text-sm text-silver">
                <li className="flex items-center gap-3">
                  <span className="text-electric">size</span>
                  <span className="text-steel">—</span>
                  <span>24 pixels</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-electric">strokeWidth</span>
                  <span className="text-steel">—</span>
                  <span>2</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-electric">animated</span>
                  <span className="text-steel">—</span>
                  <span>true (unless reduced motion is preferred)</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="divider my-12" />

          {/* Animation Control */}
          <section id="animation" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">3</span>
              Animation Control
            </h2>
            <p className="text-silver mb-6">
              MotionIcons provides three layers of animation control:
            </p>

            <div className="space-y-4 mb-8">
              {[
                { level: "System", desc: "Respects prefers-reduced-motion automatically" },
                { level: "Context", desc: "IconProvider controls all child icons" },
                { level: "Component", desc: "animated prop overrides everything" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-carbon border border-graphite p-4">
                  <span className="text-xs text-electric uppercase tracking-wider w-24 shrink-0">{item.level}</span>
                  <span className="text-sm text-silver">{item.desc}</span>
                </div>
              ))}
            </div>

            <CodeBlock code={providerCode} section="provider" />
          </section>

          <div className="divider my-12" />

          {/* Accessibility */}
          <section id="accessibility" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">4</span>
              Accessibility
            </h2>
            <p className="text-silver mb-6">
              Icons are decorative by default (<code className="text-electric">aria-hidden="true"</code>). Add meaning with the <code className="text-electric">aria-label</code> prop:
            </p>
            <CodeBlock code={accessibilityCode} section="a11y" />

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-carbon border border-graphite p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={18} className="text-electric" />
                  <span className="text-sm font-semibold text-bone">Reduced Motion</span>
                </div>
                <p className="text-xs text-silver">
                  Animations disable automatically when prefers-reduced-motion is set
                </p>
              </div>
              <div className="bg-carbon border border-graphite p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={18} className="text-electric" />
                  <span className="text-sm font-semibold text-bone">Screen Readers</span>
                </div>
                <p className="text-xs text-silver">
                  Use aria-label for meaningful icons, omit for decorative
                </p>
              </div>
            </div>
          </section>

          <div className="divider my-12" />

          {/* API Reference */}
          <section id="api" className="mb-16 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-bone mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-graphite flex items-center justify-center text-sm text-electric">5</span>
              API Reference
            </h2>

            <h3 className="font-display font-semibold text-bone mb-4 mt-8">Icon Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-graphite">
                    <th className="text-left py-3 px-4 text-silver font-medium">Prop</th>
                    <th className="text-left py-3 px-4 text-silver font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-silver font-medium">Default</th>
                  </tr>
                </thead>
                <tbody className="text-ghost">
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">size</td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">24</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">strokeWidth</td>
                    <td className="py-3 px-4">number</td>
                    <td className="py-3 px-4">2</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">className</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4">undefined</td>
                  </tr>
                  <tr className="border-b border-graphite/50">
                    <td className="py-3 px-4 text-electric">animated</td>
                    <td className="py-3 px-4">boolean</td>
                    <td className="py-3 px-4">undefined</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-electric">aria-label</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4">undefined</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-display font-semibold text-bone mb-4 mt-10">Available Icons</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {[
                'ArrowLeft', 'ArrowRight', 'Bell', 'Check', 'ChevronDown',
                'ChevronUp', 'Copy', 'Download', 'Eye', 'EyeOff',
                'Heart', 'Loader', 'Menu', 'Minus', 'Plus',
                'Refresh', 'Search', 'Settings', 'Star', 'Upload', 'X'
              ].map(icon => (
                <div key={icon} className="px-3 py-2 bg-carbon border border-graphite text-xs text-ghost text-center">
                  {icon}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 bg-carbon border border-graphite p-8 text-center">
            <h3 className="font-display text-xl font-bold text-bone mb-4">
              Ready to explore?
            </h3>
            <Link href="/icons" className="btn-primary inline-flex items-center gap-2">
              Browse All Icons
              <ArrowRight size={18} />
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

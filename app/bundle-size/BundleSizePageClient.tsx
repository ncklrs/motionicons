"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import * as Icons from "../../src/icons"
import { Navigation } from "../components/Navigation"
import bundleStats from "../../src/lib/bundle-stats.json"

// Helper to format bytes
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// Get max gzip size for scaling bars
const maxGzipSize = bundleStats.scenarios[bundleStats.scenarios.length - 1].bundleSize.gzip

export default function BundleSizePageClient() {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null)
  const [showInstructions, setShowInstructions] = useState(false)

  // Calculate tree shaking savings
  const oneIconSize = bundleStats.scenarios[0].bundleSize.gzip
  const fullSize = bundleStats.scenarios[bundleStats.scenarios.length - 1].bundleSize.gzip
  const savingsPercent = ((1 - oneIconSize / fullSize) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-void">
      <Navigation />

      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="tag tag-electric mb-4 inline-block">
                Tree Shaking Proof
              </span>
              <h1 className="font-display text-4xl font-bold text-bone mb-4">
                Bundle Size Analysis
              </h1>
              <p className="text-silver max-w-2xl">
                LivelyIcons is fully tree-shakeable. Import only the icons you need
                and your bundle stays small. See the proof below.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid sm:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-carbon border border-graphite p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icons.Package size={24} className="text-electric" />
                  <span className="text-xs text-silver uppercase tracking-wider">1 Icon Import</span>
                </div>
                <div className="text-3xl font-display font-bold text-bone">
                  {formatBytes(oneIconSize)}
                </div>
                <div className="text-sm text-silver mt-1">gzipped</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-carbon border border-graphite p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icons.Zap size={24} className="text-electric" />
                  <span className="text-xs text-silver uppercase tracking-wider">Savings</span>
                </div>
                <div className="text-3xl font-display font-bold text-electric">
                  {savingsPercent}%
                </div>
                <div className="text-sm text-silver mt-1">smaller than full import</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-carbon border border-graphite p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icons.Copy size={24} className="text-electric" />
                  <span className="text-xs text-silver uppercase tracking-wider">Total Icons</span>
                </div>
                <div className="text-3xl font-display font-bold text-bone">
                  {bundleStats.totalIconCount.toLocaleString()}
                </div>
                <div className="text-sm text-silver mt-1">available icons</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="font-display text-2xl font-bold text-bone mb-6">
                Bundle Size Comparison
              </h2>
              <p className="text-silver mb-8">
                Visual comparison of bundle sizes when importing different numbers of icons.
                Hover over a bar to see details.
              </p>

              <div className="space-y-4">
                {bundleStats.scenarios.map((scenario, index) => {
                  const widthPercent = (scenario.bundleSize.gzip / maxGzipSize) * 100
                  const isSelected = selectedScenario === index

                  return (
                    <motion.div
                      key={scenario.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="group"
                      onMouseEnter={() => setSelectedScenario(index)}
                      onMouseLeave={() => setSelectedScenario(null)}
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <span className={`text-sm font-medium w-32 ${isSelected ? 'text-electric' : 'text-ghost'}`}>
                          {scenario.name}
                        </span>
                        <div className="flex-1 h-8 bg-graphite relative overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${widthPercent}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
                            className={`h-full ${
                              index === bundleStats.scenarios.length - 1
                                ? 'bg-gradient-to-r from-electric/50 to-electric'
                                : 'bg-electric'
                            } ${isSelected ? 'opacity-100' : 'opacity-80'}`}
                          />
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 flex items-center justify-end pr-4"
                            >
                              <span className="text-xs text-void font-medium bg-bone px-2 py-0.5">
                                {formatBytes(scenario.bundleSize.gzip)} ({scenario.percentOfFull}%)
                              </span>
                            </motion.div>
                          )}
                        </div>
                        <span className="text-sm text-silver w-20 text-right">
                          {formatBytes(scenario.bundleSize.gzip)}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold text-bone mb-6">
                Detailed Breakdown
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-graphite">
                      <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider">Import</th>
                      <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider">Raw Size</th>
                      <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider">Gzip Size</th>
                      <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider">% of Full</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bundleStats.scenarios.map((scenario, index) => (
                      <tr
                        key={scenario.name}
                        className={`border-b border-graphite/50 ${
                          index === bundleStats.scenarios.length - 1 ? 'bg-graphite/30' : ''
                        }`}
                      >
                        <td className="py-3 px-4 text-sm text-ghost font-medium">{scenario.name}</td>
                        <td className="py-3 px-4 text-sm text-silver text-right">{formatBytes(scenario.bundleSize.raw)}</td>
                        <td className="py-3 px-4 text-sm text-electric text-right font-medium">{formatBytes(scenario.bundleSize.gzip)}</td>
                        <td className="py-3 px-4 text-sm text-silver text-right">{scenario.percentOfFull}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Static Icons Table */}
              <h3 className="font-display text-xl font-bold text-bone mt-10 mb-4">
                Static Icons (RSC Compatible)
              </h3>
              <p className="text-silver mb-6">
                Static icons work without Motion and have even smaller bundle sizes.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-graphite">
                      <th className="text-left py-3 px-4 text-xs text-silver uppercase tracking-wider">Import</th>
                      <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider">Raw Size</th>
                      <th className="text-right py-3 px-4 text-xs text-silver uppercase tracking-wider">Gzip Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bundleStats.staticScenarios.map((scenario) => (
                      <tr key={scenario.name} className="border-b border-graphite/50">
                        <td className="py-3 px-4 text-sm text-ghost font-medium">{scenario.name}</td>
                        <td className="py-3 px-4 text-sm text-silver text-right">{formatBytes(scenario.bundleSize.raw)}</td>
                        <td className="py-3 px-4 text-sm text-electric text-right font-medium">{formatBytes(scenario.bundleSize.gzip)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Prove It Yourself */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-bone">
                  Prove It Yourself
                </h2>
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="btn-secondary text-sm flex items-center gap-2"
                >
                  {showInstructions ? 'Hide' : 'Show'} Instructions
                  <motion.div
                    animate={{ rotate: showInstructions ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icons.ChevronDown size={16} />
                  </motion.div>
                </button>
              </div>

              <AnimatePresence>
                {showInstructions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-carbon border border-graphite p-6 mb-6">
                      <p className="text-silver mb-6">
                        Want to verify these numbers yourself? Follow these steps to run the benchmark locally:
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-ghost mb-2">1. Clone the repository</h4>
                          <pre className="bg-void p-4 overflow-x-auto text-sm text-silver">
                            <code>git clone https://github.com/your-username/livelyicons.git{"\n"}cd livelyicons</code>
                          </pre>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-ghost mb-2">2. Install dependencies</h4>
                          <pre className="bg-void p-4 overflow-x-auto text-sm text-silver">
                            <code>pnpm install</code>
                          </pre>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-ghost mb-2">3. Build the library</h4>
                          <pre className="bg-void p-4 overflow-x-auto text-sm text-silver">
                            <code>pnpm run build:lib</code>
                          </pre>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-ghost mb-2">4. Run the benchmark</h4>
                          <pre className="bg-void p-4 overflow-x-auto text-sm text-silver">
                            <code>npx tsx scripts/benchmark-bundle-size.ts</code>
                          </pre>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-ghost mb-2">5. Check the results</h4>
                          <p className="text-silver text-sm">
                            Results are saved to <code className="text-electric">src/lib/bundle-stats.json</code>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-carbon border border-graphite p-6">
                      <h4 className="text-sm font-medium text-ghost mb-4">Or use your own bundler</h4>
                      <p className="text-silver text-sm mb-4">
                        Create a test file and bundle it with your preferred bundler (webpack, vite, rollup, esbuild):
                      </p>
                      <pre className="bg-void p-4 overflow-x-auto text-sm text-silver">
                        <code>{`// test.ts
import { Heart } from 'livelyicons'
export { Heart }

// Bundle with esbuild:
// esbuild test.ts --bundle --minify --external:react --external:react-dom --external:motion`}</code>
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Why Tree Shaking Works */}
        <div className="border-b border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="font-display text-2xl font-bold text-bone mb-6">
                Why Tree Shaking Works
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: Icons.FileCode,
                    title: 'ESM Exports',
                    description: 'All icons use ES module named exports, enabling bundlers to analyze dependencies statically.'
                  },
                  {
                    icon: Icons.Ban,
                    title: 'No Side Effects',
                    description: 'Package.json declares "sideEffects": false, telling bundlers unused exports are safe to remove.'
                  },
                  {
                    icon: Icons.Copy,
                    title: 'Individual Files',
                    description: 'Each icon is in its own file with a single export, making it easy for bundlers to include only what\'s needed.'
                  },
                  {
                    icon: Icons.Zap,
                    title: 'Code Splitting',
                    description: 'tsup builds with splitting enabled, allowing shared code to be extracted without duplication.'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-carbon border border-graphite p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon size={18} className="text-electric" />
                      <span className="text-sm font-semibold text-bone">{item.title}</span>
                    </div>
                    <p className="text-xs text-silver">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* External Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://bundlephobia.com/package/livelyicons"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Icons.ExternalLink size={18} />
              View on Bundlephobia
            </a>
            <a
              href="https://www.npmjs.com/package/livelyicons"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Icons.Package size={18} />
              View on npm
            </a>
          </motion.div>
        </div>

        {/* Metadata Footer */}
        <div className="border-t border-graphite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <p className="text-xs text-steel">
              Last measured: {new Date(bundleStats.timestamp).toLocaleDateString()} |
              Package: {bundleStats.packageName}@{bundleStats.packageVersion} |
              Bundler: {bundleStats.metadata.bundler} |
              Target: {bundleStats.metadata.target}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

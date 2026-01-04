"use client"

import { useState, useEffect } from "react"
import {
  Heart, Star, Bell, Settings, Search, Refresh, Loader, Check,
  Download, Eye, Mail, User, Home, Calendar, Menu, Copy,
  Play, Pause, Music, Camera, Video, Mic, Volume2,
  Clock, Zap, Shield, Lock, Unlock, Key, Award, Trophy,
  Sun, Moon, Cloud, CloudRain, Thermometer, Wind,
  ShoppingCart, CreditCard, Gift, Package, Truck,
  Bookmark, MessageCircle, Send, Phone, AtSign,
  Folder, File, FileText, Database, Code, Terminal,
  Wifi, Bluetooth, Battery, Cpu, Monitor, Smartphone,
  MapPin, Navigation, Compass, Globe, Map,
  ThumbsUp, Smile, Frown, Meh, AlertCircle, Info
} from "../../src/icons"
import type { MotionType, TriggerType } from "../../src/lib/types"

const allIcons = [
  { name: "Heart", Icon: Heart },
  { name: "Star", Icon: Star },
  { name: "Bell", Icon: Bell },
  { name: "Settings", Icon: Settings },
  { name: "Search", Icon: Search },
  { name: "Refresh", Icon: Refresh },
  { name: "Loader", Icon: Loader },
  { name: "Check", Icon: Check },
  { name: "Download", Icon: Download },
  { name: "Eye", Icon: Eye },
  { name: "Mail", Icon: Mail },
  { name: "User", Icon: User },
  { name: "Home", Icon: Home },
  { name: "Calendar", Icon: Calendar },
  { name: "Menu", Icon: Menu },
  { name: "Copy", Icon: Copy },
  { name: "Play", Icon: Play },
  { name: "Pause", Icon: Pause },
  { name: "Music", Icon: Music },
  { name: "Camera", Icon: Camera },
  { name: "Video", Icon: Video },
  { name: "Mic", Icon: Mic },
  { name: "Volume2", Icon: Volume2 },
  { name: "Clock", Icon: Clock },
  { name: "Zap", Icon: Zap },
  { name: "Shield", Icon: Shield },
  { name: "Lock", Icon: Lock },
  { name: "Unlock", Icon: Unlock },
  { name: "Key", Icon: Key },
  { name: "Award", Icon: Award },
  { name: "Trophy", Icon: Trophy },
  { name: "Sun", Icon: Sun },
  { name: "Moon", Icon: Moon },
  { name: "Cloud", Icon: Cloud },
  { name: "CloudRain", Icon: CloudRain },
  { name: "Thermometer", Icon: Thermometer },
  { name: "Wind", Icon: Wind },
  { name: "ShoppingCart", Icon: ShoppingCart },
  { name: "CreditCard", Icon: CreditCard },
  { name: "Gift", Icon: Gift },
  { name: "Package", Icon: Package },
  { name: "Truck", Icon: Truck },
  { name: "Bookmark", Icon: Bookmark },
  { name: "MessageCircle", Icon: MessageCircle },
  { name: "Send", Icon: Send },
  { name: "Phone", Icon: Phone },
  { name: "AtSign", Icon: AtSign },
  { name: "Folder", Icon: Folder },
  { name: "File", Icon: File },
  { name: "FileText", Icon: FileText },
  { name: "Database", Icon: Database },
  { name: "Code", Icon: Code },
  { name: "Terminal", Icon: Terminal },
  { name: "Wifi", Icon: Wifi },
  { name: "Bluetooth", Icon: Bluetooth },
  { name: "Battery", Icon: Battery },
  { name: "Cpu", Icon: Cpu },
  { name: "Monitor", Icon: Monitor },
  { name: "Smartphone", Icon: Smartphone },
  { name: "MapPin", Icon: MapPin },
  { name: "Navigation", Icon: Navigation },
  { name: "Compass", Icon: Compass },
  { name: "Globe", Icon: Globe },
  { name: "Map", Icon: Map },
  { name: "ThumbsUp", Icon: ThumbsUp },
  { name: "Smile", Icon: Smile },
  { name: "Frown", Icon: Frown },
  { name: "Meh", Icon: Meh },
  { name: "AlertCircle", Icon: AlertCircle },
  { name: "Info", Icon: Info },
]

const livelyTypes: MotionType[] = ["scale", "rotate", "translate", "shake", "pulse", "bounce", "draw", "spin"]
const triggerTypes: TriggerType[] = ["hover", "loop", "mount", "inView"]

type Preset = "hero" | "grid" | "animation-showcase" | "single-row" | "custom"

const presets: Record<Preset, { icons: number; cols: number; size: number; gap: number }> = {
  "hero": { icons: 16, cols: 4, size: 48, gap: 24 },
  "grid": { icons: 36, cols: 6, size: 40, gap: 16 },
  "animation-showcase": { icons: 9, cols: 3, size: 64, gap: 32 },
  "single-row": { icons: 8, cols: 8, size: 48, gap: 20 },
  "custom": { icons: 16, cols: 4, size: 48, gap: 24 },
}

export default function DemoCaptureClient() {
  const [showControls, setShowControls] = useState(true)
  const [background, setBackground] = useState<"dark" | "light" | "gradient">("dark")
  const [preset, setPreset] = useState<Preset>("hero")
  const [iconCount, setIconCount] = useState(16)
  const [cols, setCols] = useState(4)
  const [iconSize, setIconSize] = useState(48)
  const [gap, setGap] = useState(24)
  const [lively, setLively] = useState<MotionType>("scale")
  const [trigger, setTrigger] = useState<TriggerType>("loop")
  const [mixAnimations, setMixAnimations] = useState(false)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [iconColor, setIconColor] = useState("#ffffff")
  const [staggerDelay, setStaggerDelay] = useState(true)

  const handlePresetChange = (newPreset: Preset) => {
    setPreset(newPreset)
    if (newPreset !== "custom") {
      const p = presets[newPreset]
      setIconCount(p.icons)
      setCols(p.cols)
      setIconSize(p.size)
      setGap(p.gap)
    }
  }

  const bgClasses = {
    dark: "bg-[#0a0a0b]",
    light: "bg-white",
    gradient: "bg-gradient-to-br from-[#0a0a0b] via-[#1a1a2e] to-[#0a0a0b]",
  }

  const displayedIcons = allIcons.slice(0, iconCount)

  return (
    <div className={`min-h-screen ${bgClasses[background]} transition-colors duration-300`}>
      {/* Controls Panel */}
      {showControls && (
        <div className="fixed top-4 left-4 z-50 bg-zinc-900/95 backdrop-blur border border-zinc-700 rounded-lg p-4 w-80 max-h-[90vh] overflow-y-auto text-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-white">Capture Controls</h2>
            <button
              onClick={() => setShowControls(false)}
              className="text-zinc-400 hover:text-white"
            >
              Hide (H)
            </button>
          </div>

          {/* Preset */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Preset</label>
            <select
              value={preset}
              onChange={(e) => handlePresetChange(e.target.value as Preset)}
              className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-white"
            >
              <option value="hero">Hero (4x4, 48px)</option>
              <option value="grid">Grid (6x6, 40px)</option>
              <option value="animation-showcase">Showcase (3x3, 64px)</option>
              <option value="single-row">Single Row (8, 48px)</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* Background */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Background</label>
            <div className="flex gap-2">
              {(["dark", "light", "gradient"] as const).map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBackground(bg)}
                  className={`px-3 py-1 rounded capitalize ${
                    background === bg
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Animation Type */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Animation</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="mixAnimations"
                checked={mixAnimations}
                onChange={(e) => setMixAnimations(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="mixAnimations" className="text-zinc-300">Mix animations</label>
            </div>
            {!mixAnimations && (
              <select
                value={lively}
                onChange={(e) => setLively(e.target.value as MotionType)}
                className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-white"
              >
                {livelyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            )}
          </div>

          {/* Trigger */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Trigger</label>
            <select
              value={trigger}
              onChange={(e) => setTrigger(e.target.value as TriggerType)}
              className="w-full bg-zinc-800 border border-zinc-600 rounded px-2 py-1.5 text-white"
            >
              {triggerTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Icon Count */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Icons: {iconCount}</label>
            <input
              type="range"
              min={4}
              max={allIcons.length}
              value={iconCount}
              onChange={(e) => {
                setIconCount(Number(e.target.value))
                setPreset("custom")
              }}
              className="w-full"
            />
          </div>

          {/* Columns */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Columns: {cols}</label>
            <input
              type="range"
              min={2}
              max={12}
              value={cols}
              onChange={(e) => {
                setCols(Number(e.target.value))
                setPreset("custom")
              }}
              className="w-full"
            />
          </div>

          {/* Icon Size */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Size: {iconSize}px</label>
            <input
              type="range"
              min={24}
              max={96}
              value={iconSize}
              onChange={(e) => {
                setIconSize(Number(e.target.value))
                setPreset("custom")
              }}
              className="w-full"
            />
          </div>

          {/* Gap */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Gap: {gap}px</label>
            <input
              type="range"
              min={8}
              max={48}
              value={gap}
              onChange={(e) => {
                setGap(Number(e.target.value))
                setPreset("custom")
              }}
              className="w-full"
            />
          </div>

          {/* Stroke Width */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Stroke: {strokeWidth}px</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.5}
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Icon Color */}
          <div className="mb-4">
            <label className="block text-zinc-400 mb-1">Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                className="w-10 h-8 rounded cursor-pointer"
              />
              <input
                type="text"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-white font-mono text-xs"
              />
            </div>
            <div className="flex gap-1 mt-2">
              {["#ffffff", "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                <button
                  key={color}
                  onClick={() => setIconColor(color)}
                  className="w-6 h-6 rounded border border-zinc-600"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Stagger */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-zinc-300">
              <input
                type="checkbox"
                checked={staggerDelay}
                onChange={(e) => setStaggerDelay(e.target.checked)}
                className="rounded"
              />
              Stagger animation start
            </label>
          </div>

          {/* Recording Tips */}
          <div className="mt-4 pt-4 border-t border-zinc-700">
            <p className="text-zinc-500 text-xs">
              <strong>Tips:</strong><br />
              • Press H to hide/show controls<br />
              • Use Kap or ScreenToGif to record<br />
              • Aim for 800px wide, 15fps<br />
              • Loop trigger = continuous animation
            </p>
          </div>
        </div>
      )}

      {/* Toggle Controls Button */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="fixed top-4 left-4 z-50 bg-zinc-900/80 text-white px-3 py-1.5 rounded text-sm hover:bg-zinc-800"
        >
          Show Controls (H)
        </button>
      )}

      {/* Icon Grid - Centered */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${iconSize}px)`,
            gap: `${gap}px`,
          }}
        >
          {displayedIcons.map(({ name, Icon }, index) => {
            const iconLively = mixAnimations
              ? livelyTypes[index % livelyTypes.length]
              : lively

            return (
              <div
                key={name}
                className="flex items-center justify-center"
                style={{
                  color: iconColor,
                  animationDelay: staggerDelay ? `${index * 100}ms` : "0ms",
                }}
              >
                <Icon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  lively={iconLively}
                  trigger={trigger}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Keyboard Handler */}
      <KeyboardHandler
        onToggleControls={() => setShowControls((prev) => !prev)}
      />
    </div>
  )
}

function KeyboardHandler({ onToggleControls }: { onToggleControls: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H") {
        onToggleControls()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onToggleControls])

  return null
}

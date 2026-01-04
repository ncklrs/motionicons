import type { Metadata } from "next"
import DemoCaptureClient from "./DemoCaptureClient"

export const metadata: Metadata = {
  title: "Demo Capture | LivelyIcons",
  robots: "noindex, nofollow",
}

export default function DemoCapturePage() {
  return <DemoCaptureClient />
}

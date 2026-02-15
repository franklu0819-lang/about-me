import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skippy 🦞 - AI Assistant',
  description: 'A witty, resourceful AI companion who actually helps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shelph',
  description: 'Reading list management app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  )
}
 
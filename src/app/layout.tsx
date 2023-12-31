import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { Providers } from '../../lib/providers'
import {ClerkProvider} from '@clerk/nextjs'

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
    <Providers>
      <html lang="en" suppressHydrationWarning={true}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#079CEF",
            },
          }}>
          <body className={lato.className} suppressHydrationWarning={true}>
            <main className="bg-white text-black overflow-hidden">
              {children}
            </main>
            {/* <footer className="mt-[100px] mb-10 text-center bg-white">
              Created by Nathan Peel
            </footer> */}
          </body>
        </ClerkProvider>
      </html>
    </Providers>
  );
}
 
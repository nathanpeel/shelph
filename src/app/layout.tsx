/**
 * The main layout for the web applicaiton
 */

import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shelph",
  description: "Reading list management app",
};

/**
 * Wraps around the whole application
 * 
 * @param children child components
 * @returns JSX Element
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
        <body className={lato.className} suppressHydrationWarning={true}>
          <main className="bg-white text-black overflow-hidden">
            {children}
          </main>
        </body>
    </html>
  );
}

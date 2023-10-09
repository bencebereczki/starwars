
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "./themeProvider"
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
// Title & meta
export const metadata: Metadata = {
  title: 'StarWars Demo',
  description: 'Created by Bence Bereczki',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (

    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} >
        {/* Theme Provider for detect system dark/light mode */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex min-h-screen flex-col items-center justify-top p-6">
          <Link href={"/"}> <div className="relative flex place-items-center z-[-1] mb-8 headerrow">

              <Image
                className="relative dark:invert-0 "
                src="/swlogo2.png"
                alt="StarWars Logo"
                width={180}
                height={37}
                priority
              />
            </div></Link>
           
            {children}
            
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

import { Providers } from '@/components/Providers';
import './globals.css'
import type { Metadata } from 'next'
import { Quicksand, Orbitron } from 'next/font/google';
const quicksand = Quicksand({ 
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '一晌贪欢',
  description: 'wellcome to my blog'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${orbitron.variable} font-quicksand antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
import NextAuthSessionProvider from '@/providers/sessionProvider'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title:'Siatema de Delivery Admin',
  description: 'Sistema de gerenciamento de um delivery'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <NextAuthSessionProvider>
          { children }
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
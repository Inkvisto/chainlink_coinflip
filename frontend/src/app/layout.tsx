import Web3Provider from '../../web3/zustand/context/web3.provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blockchain template',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    
  return (
    <html lang="en">
      <body className={inter.className}>

        <Web3Provider connectType={'auto'} >
          {children}
        </Web3Provider>

      </body>
    </html>
  )
}

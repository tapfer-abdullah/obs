"use client"
import Footer from '@/Components/Shared-Pages/Footer'
import NavBar from '@/Components/Shared-Pages/NavBar'
import OrderState from '@/Components/State/OrderState'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import './globals.css'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'OdbhootStore',
//   // description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const resultArray = pathname.split("/").filter(Boolean);
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <OrderState>
            {
              resultArray[0] != "dashboard" && <NavBar />
            }

            <div className='min-h-[80vh]'>
              {children}
            </div>
            {
              resultArray[0] != "dashboard" && <Footer />
            }
          </OrderState>
        </LocalizationProvider>

      </body>
    </html>
  )
}

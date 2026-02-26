import Navbar from '@/myComponents/navbar/Navbar'
import React from 'react'

export default function CommonLayout({children}:{children: React.ReactNode}) {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

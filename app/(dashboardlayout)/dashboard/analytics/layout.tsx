
import Link from 'next/link'
import React from 'react'

export default function AnalyticsLayout({children}:{children: React.ReactNode}) {
  return (
    <div>
<div className='flex gap-2.5'>
    <Link href='/dashboard/analytics/weekly'>Weekly</Link>
    <Link href='/dashboard/analytics/monthly'>Monthly</Link>
</div>
        {children}
    </div>
  )
}

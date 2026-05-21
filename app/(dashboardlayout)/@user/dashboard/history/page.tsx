import { PaginationControll } from '@/components/ui/pagination-controll'
import HistoryTable from '@/myComponents/dashboard/HistoryTable'
import { blogService } from '@/src/services/blog.services'
import React from 'react'

export default async function HistoryPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {

    const { page } = await searchParams

    const { data } = await blogService.getBlogPosts({ page })

    const posts = data?.posts || []
    const meta = data?.paginationData || {
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 0
    }

    // console.log(meta);
    return (
        <div className='space-y-3'>
            <HistoryTable
                posts={posts}
            />

            <PaginationControll 
            metaData={meta}
            />
        </div>
    )
}

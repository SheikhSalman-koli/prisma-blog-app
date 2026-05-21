import { BlogPost } from '@/src/types'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function HistoryTable({posts}: {posts: BlogPost[]}) {
  return (
    <Table className='border rounded-md'>
  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
  <TableHeader>
    <TableRow>
      <TableHead>Title</TableHead>
      <TableHead>Content</TableHead>
      <TableHead>Tags</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    
        {posts?.map((post) => {
            return(
               <TableRow key={post?.id}>
                    <TableCell>{post?.title}</TableCell>
                    <TableCell>{post?.content}</TableCell>
                    <TableCell>{post?.tags?.join(', ')}</TableCell>
                    <TableCell>{post?.status}</TableCell>
               </TableRow>
            )
        })}
    
  </TableBody>
</Table>
  )
}

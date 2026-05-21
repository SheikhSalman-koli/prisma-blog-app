

import React from 'react'
import CreatePostForm from '@/myComponents/dashboard/CreatePost'

import { BlogPost } from '@/src/types'
import { CreateBlogFormClient } from '@/myComponents/dashboard/CreatePostClient'
import { blogService } from '@/src/services/blog.services'

export default async function CreateBlogpage() {

  const {data} = await blogService?.getBlogPosts()

  return (
    <div>
      {/* <CreatePostForm /> */}
      <CreateBlogFormClient />
      {data?.posts?.map((post: BlogPost) => {
        return (
          <p key={post.id}>{post.title}</p>
        )
      })}
    </div> 
  )
}

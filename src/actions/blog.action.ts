'use server'

import { updateTag } from "next/cache";
import { BlogData, blogService } from "../services/blog.services";


export const getBlogs = async ()=>{
    return await blogService.getBlogPosts()
}


export const createPost = async(postData: BlogData) => {
    const res = await blogService.createBlogPost(postData)
    updateTag('blogPosts')
    return res
}
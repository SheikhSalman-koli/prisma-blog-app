'use server'

import { blogServices } from "../services/blog.services"

export const getBlogs = async ()=>{
    return await blogServices.getPosts()
}

import BlogCard from "@/myComponents/homepage/BlogCard";
import { getBlogs } from "@/src/actions/blog.action";

import { BlogPost } from "@/src/types";


export default async function Home() {

 const {data} = await getBlogs()


  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto p-8 gap-6">
    
      {
       data?.posts?.map((post: BlogPost) => (
           <BlogCard key={post.id} post={post} />
        ))
    }
    </div>
  );
}

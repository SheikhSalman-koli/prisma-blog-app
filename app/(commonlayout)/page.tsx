import { Button } from "@/components/ui/button";
import BlogCard from "@/myComponents/homepage/BlogCard";
import { blogServices } from "@/src/services/blog.services";
import { userServices } from "@/src/services/user.services";
import { BlogPost } from "@/src/types";


export default async function Home() {

  const { data } = await blogServices.getPosts()

  console.log(data?.posts);

  const me = await userServices.getSession()
  
  console.log(me);

  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      <p>oiur34jrp</p>
      {
        data?.posts.map((post: BlogPost) => (
           <BlogCard key={post.id} post={post} />
        ))
    }
    </div>
  );
}

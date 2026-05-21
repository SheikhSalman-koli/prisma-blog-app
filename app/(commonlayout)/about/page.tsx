'use client'

import { getBlogs } from '@/src/actions/blog.action';
import React, { useEffect, useState } from 'react'

export default function AboutPage() {

  // await new Promise((resolve)=> setTimeout(resolve, 4000))

  //throw new Error('something went wrong!')

  const [data, setData] = useState()
  // console.log(data);

  useEffect(() => {
    (async ()=> {
      const {data} = await getBlogs()
      setData(data)
    })();
  },[])

  return (
    <div>this is about page</div>
  )
}

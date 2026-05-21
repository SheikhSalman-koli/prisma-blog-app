import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { env } from '@/src/env'
import { userServices } from '@/src/services/user.services'
import { updateTag } from 'next/cache'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import React from 'react'

const APIURL = env.API_URL

export default function CreatePostForm() {

    const createPost = async (formData: FormData) => {
        'use server'
       
        const title = formData.get('title') as string
        const content = formData.get('content') as string
        const tags = formData.get('tags') as string
        const thumbnail = formData.get('thumbnail') as string
        const status = formData.get('status') as string

        const {data} = await userServices.getSession()

        const postData = {
            title,
            content,
            thumbnail,
            authorId: data?.user?.id,
            status,
            tags: tags?.split(',').map(item => item.trim()).filter(item=> item !== '')
        }
 // console.log(postData);
     
        const cookieStore =await cookies()

        
        // console.log(data?.user?.id);

        const res = await fetch(`${APIURL}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                cookie: cookieStore.toString()
            },
            body: JSON.stringify(postData)
        })

        if(res.ok){
            revalidateTag('blogPosts', 'max')
            // updateTag('blogPosts')
        }

        // console.log(res);

        // we can use here toast for better user experience and error handling
       
    }


    return (
        <div>
            <Card className='max-w-2xl mx-auto'>
                <CardHeader>
                    <CardTitle>Create a post</CardTitle>
                    <CardDescription>Write your thoughts and share them with the world.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form id='post-form' action={createPost}>
                 
                <FieldGroup>
    <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
            id="title"
            type="text"
            name="title"
            placeholder="Enter post title"
            required
        />
    </Field>

    <Field>
        <FieldLabel htmlFor="content">Content</FieldLabel>
        <Textarea
            id="content"
            name="content"
            placeholder="Write your post content"
            required
        />
    </Field>

    <Field>
        <FieldLabel htmlFor="thumbnail">Thumbnail</FieldLabel>
        <Input
            id="thumbnail"
            type="text"
            name="thumbnail"
            placeholder="Enter thumbnail URL"
            required
        />
    </Field>

    <Field>
        <FieldLabel htmlFor="status">Status</FieldLabel>
        <select
            id="status"
            name="status"
            required
        >
            <option value="">Select status</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
        </select>
    </Field>

    <Field>
        <FieldLabel htmlFor="tags">Tags</FieldLabel>
        <Input
            id="tags"
            type="text"
            name="tags"
            placeholder="react,nextjs,nodejs"
            required
        />
    </Field>
</FieldGroup>

                    </form>
                </CardContent>

                <CardFooter>
                    <Button type='submit' form='post-form'>
                        Publish Post
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

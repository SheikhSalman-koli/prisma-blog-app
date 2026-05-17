import { env } from "../env"

const API_URL = env.API_URL

// No dynamic and no {cache: "no-store"} == SSG => static site generation
// {cache: "no-store"} == SSR => server side rendering
// next = {revalidate: 10} == ISR => incremental static regeneration

interface BlogPostParams {
    isFeatured?: boolean;
    search?: string
}

interface Options {
    cache?: RequestCache;
    revalidate?: number
}

export const blogServices = {

    getPosts: async function (params?: BlogPostParams, options?: Options) {
        try {
            const url = new URL(`${API_URL}/post`)

            // console.log("line 15", url.searchParams.append('key', 'value'));
            // console.log("line 16", options);

            if (params) {

                Object.entries(params).forEach(([key, value]) => {
                    // console.log(key, value);
                    if(value !== undefined && value !== null && value !== ""){
                        url.searchParams.append(key, value)
                    }
                })
            }

            const config: RequestInit = {}
            if(options?.cache){
                config.cache = options?.cache
            }

            if(options?.revalidate){
                config.next = {revalidate: options?.revalidate}
            }

            const res = await fetch(url.toString(), options)
            const { data } = await res.json()

            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: 'something went wrong!' } }
        }
    }

}
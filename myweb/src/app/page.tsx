import Link from 'next/link'
import React from 'react'
import Item from './item'

const getPosts = async () => {
    // Because this is server components, we have to define the URL with http
    const res = await fetch(process.env.BASE_URL + '/api/post', { next: { revalidate: 0 } })

    // Define the output to json, because if only res, it will return by any type
    const json = await res.json()
    return json
}

const Page = async () => {

    const posts = await getPosts()

    return (
        <div className='w-[1200px] mx-auto py-20'>
            // This will link to the create page
            <Link href={"/create"} className='px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white'>Create</Link>

            <div className='grid grid-cols-3 gap-5 mt-8'>
                {posts?.posts?.map((post: any, i: number) => (
                    <Item key={i} post={post} />
                )).sort().reverse()}
            </div>
        </div>
    )
}

export default Page
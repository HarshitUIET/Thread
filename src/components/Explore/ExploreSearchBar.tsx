'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSearchUsers } from '@/lib/serverMethods'

export default function ExploreSearchBar() {

    const [query,setQuery] = useState<string>("")

    const router = useRouter()

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        router.replace(`/explore?query=${query}`)
    }

  return (
    <div className='mt-5' >
    <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search Users' className='w-full p-2 rounded-lg bg-muted outline-none'
        value={query} onChange={(e)=>setQuery(e.target.value)}
        />
    </form>
    </div>
  )
}

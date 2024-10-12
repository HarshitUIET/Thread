"use client"
import React from 'react'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DynamicNavbar({title}:{title:string}) {
    const router = useRouter()
  return (
    <div>
        <div className='flex space-x-8 items-center'>
        <MoveLeft size={30} width={30} className='cursor-pointer' onClick={()=>router.back()} />
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>
    </div>
  )
}

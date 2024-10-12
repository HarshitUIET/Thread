"use client";
import { Bell, Home, Search, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import Sidebarlinks from '../common/Sidebarlinks';


export default function LeftSidebar() {

    const pathname = usePathname()

  return (
    <div className='h-screen border-r-2 hidden md:block md:w-1/4 lg:p-10 md:pt-5' >
        <div className='flex justify-center items-center' >
          <Image src='/images/logo.svg' width={50} height={50} alt='logo' />
          <h1 className='font-bold text-xl ml-2' >Threads</h1>
        </div>
        <Sidebarlinks/>
    </div>
  )
}

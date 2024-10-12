"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Home, Search, User2 } from 'lucide-react'
import { Button } from '../ui/button';
import { ThemeToggleBtn } from './ThemeToggleBtn';
import SignOutBtn from './SignOutBtn';

export default function Sidebarlinks() {
    const pathname = usePathname()

    return (
        <div>
            <ul className='mt-10'>
                <li className='' >
                    <Link className={`flex justify-start items-center space-x-8 hover:font-bold mt-6 ${pathname === '/' ? "font-bold" : ""}`} href='/'>
                        <Home size={30} />
                        <h1 className='text-lg lg:text-xl ml-2' >Home</h1>
                    </Link>
                </li>
                <li className='' >
                    <Link className={`flex justify-start items-center space-x-8 hover:font-bold mt-6 ${pathname === '/explore' ? "font-bold" : ""}`} href='/explore'>
                        <Search size={30} />
                        <h1 className='text-lg lg:text-xl ml-2' >Explore</h1>
                    </Link>
                </li>
                <li className='' >
                    <Link className={`flex justify-start items-center space-x-8 hover:font-bold mt-6 ${pathname === '/notification' ? "font-bold" : ""}`} href='/notification'>
                        <Bell size={30} />
                        <h1 className='text-lg lg:text-xl ml-2' >Notifications</h1>
                    </Link>
                </li>
                <li className='' >
                    <Link className={`flex justify-start items-center space-x-8 hover:font-bold mt-6 ${pathname === '/notifications' ? "font-bold" : ""}`} href='/profile'>
                        <User2 size={30} />
                        <h1 className='text-lg lg:text-xl ml-2' >Profile</h1>
                    </Link>
                </li>
                <li className='flex items-center absolute bottom-10'>
                     <SignOutBtn/>
                    <ThemeToggleBtn/>
                </li>
            </ul>
        </div>
    )
}

"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, Home, Search, User2 } from 'lucide-react'
import { Button } from '../ui/button';
import { ThemeToggleBtn } from './ThemeToggleBtn';
import SignOutBtn from './SignOutBtn';
import axios from 'axios';

export default function Sidebarlinks() {
    const pathname = usePathname()
    const router = useRouter()
    const [notificationCount, setNotificationCount] = useState(0)

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/api/notification')
                if (response.data.status === 200) {
                    const unviewedNotifications = response.data.data.filter(
                        (notification: any) => !notification.is_viewed
                    )
                    setNotificationCount(unviewedNotifications.length)
                }
            } catch (error) {
                console.error('Error fetching notifications:', error)
            }
        }

        fetchNotifications()
        // Set up polling every 30 seconds
        const interval = setInterval(fetchNotifications, 30000)
        return () => clearInterval(interval)
    }, [])

    const handleNotificationClick = async () => {
        if (notificationCount > 0) {
            try {
                await axios.post('/api/notification')
                setNotificationCount(0)
            } catch (error) {
                console.error('Error marking notifications as viewed:', error)
            }
        }
        router.push('/notification')
    }

    return (
        <div className="flex flex-col h-full justify-between">
            <ul className='mt-10'>
                <li>
                    <Link className={`flex justify-start items-center space-x-8 hover:font-bold mt-6 ${pathname === '/' ? "font-bold" : ""}`} href='/'>
                        <Home size={30} />
                        <h1 className='text-lg lg:text-xl ml-2'>Home</h1>
                    </Link>
                </li>
                <li>
                    <Link className={`flex justify-start items-center space-x-8 hover:font-bold mt-6 ${pathname === '/explore' ? "font-bold" : ""}`} href='/explore'>
                        <Search size={30} />
                        <h1 className='text-lg lg:text-xl ml-2'>Explore</h1>
                    </Link>
                </li>
                <li>
                    <div 
                        className={`flex justify-start items-center space-x-8 hover:font-bold mt-6 cursor-pointer ${pathname === '/notification' ? "font-bold" : ""}`}
                        onClick={handleNotificationClick}
                    >
                        <div className="relative">
                            <Bell size={30} />
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationCount}
                                </span>
                            )}
                        </div>
                        <h1 className='text-lg lg:text-xl ml-2'>Notifications</h1>
                    </div>
                </li>
                <li>
                    <Link className={`flex justify-start items-center space-x-8 hover:font-bold mt-6 ${pathname === '/notifications' ? "font-bold" : ""}`} href='/profile'>
                        <User2 size={30} />
                        <h1 className='text-lg lg:text-xl ml-2'>Profile</h1>
                    </Link>
                </li>
            </ul>
            <div className="flex items-center space-x-4 mt-[4rem] sm:mt-0 mb-8 ">
                <SignOutBtn />
                <div className="relative">
                    <ThemeToggleBtn />
                </div>
            </div>
        </div>
    )
}

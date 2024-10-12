"use client";
import React, { use } from 'react'
import UserAvatar from './UserAvatar';
import Link from 'next/link'
import { Button } from '../ui/button';
''

export default function UserListCard({user}: {user:UserType}) {
  return (
    <div className='w-full mt-2 shadow-sm p-4 rounded-md mb-3' > 
    <div className='flex'>
        <UserAvatar name='Harshit'/>
        <div className='flex justify-between items-start w-full'>
            <div className='flex flex-col ' >
            <strong className='text-md font-bold ml-2' >{user?.name}</strong>
            <span className='text-sm font-light ml-2' >{user?.username}</span>
            </div>
            <Link href={`/user/${user?.id}`}>
            <Button size='sm' >View</Button>
            </Link>
        </div>
    </div>
    </div>
  )
}

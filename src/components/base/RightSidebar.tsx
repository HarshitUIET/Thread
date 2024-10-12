import React from 'react'
import UserListCard from '../common/UserListCard'
import { getUsers } from '@/lib/serverMethods'

export default async function RightSidebar() {

  const users:Array<UserType> | [] = await getUsers();


  return (
    <div className='h-screen border-l-2 lg:w-1/4 hidden lg:block lg:pt-5 lg:px-2 xl:p-5 ' >
         <h1 className='text-2xl font-bold ' >Suggestion for you</h1>
         {users && users.length > 0 && users.map((user:UserType) => <UserListCard key={user.id} 
         user={user} />)}
         {
              users.length === 0 && <div className='text-center mt-5 text-xl' >No Suggestions Found</div>
         } 
    </div>
  )
}

import DynamicNavbar from '@/components/common/DynamicNavbar'
import UserListCard from '@/components/common/UserListCard'
import ExploreSearchBar from '@/components/Explore/ExploreSearchBar'
import { getSearchUsers } from '@/lib/serverMethods'
import React from 'react'

export default async function Explore({
  searchParams
}:{searchParams:{
  [key:string]:string | undefined
}}) {

  const users : Array<UserType> | [] = await getSearchUsers(searchParams.query??"")

  console.log("check ", searchParams?.query?.length!);

  console.log("Users are ",users);


  return (
    <div>
        <DynamicNavbar title="Explore" />
        <ExploreSearchBar/>
        <div className='mt-5'>
          {users && users.length > 0 && searchParams?.query?.length!>0 && users.map((user:UserType) => (
            <UserListCard key={user.id} user={user} />
          ))}
          {users && users.length<1 && searchParams?.query?.length!>0 && <h1 className='text-center mt-5 text-lg'>No users found</h1>}
        </div>
    </div>
  )
}

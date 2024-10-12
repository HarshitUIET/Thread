import UserProfileAvatar from '@/components/common/UserProfileAvatar'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getShowUser, getUserComment, getUserPosts } from '@/lib/serverMethods'
import PostCard from '@/components/common/PostCard'
import DynamicNavbar from '@/components/common/DynamicNavbar'
import CommentCard from '@/components/common/CommentCard'


export default async function ShowUsers({params}:{params:{id:number}}) {

  const user:ShowUserType | null = await getShowUser(params.id);

  return (
    <div>
      <DynamicNavbar title="Profile" />
      <div className='mt-8 flex items-center space-x-4'>
        <UserProfileAvatar name={user?.name?? "H"} />
        <div>
          <h1 className='text-2xl font-bold'>{user?.name}</h1>
          <p className=' text-md text-orange-300'>{user?.username}</p>
          <h1 className='text-xl'>{user?.email}</h1>
        </div>
      </div>
      <div className='mt-8' >
        <Tabs defaultValue="post" className="w-full">
          <TabsList className='w-full' >
            <TabsTrigger value="post" className='w-full'  >Post</TabsTrigger>
            <TabsTrigger value="comment" className='w-full'>Comment</TabsTrigger>
          </TabsList >
          <TabsContent className='mt-12' value="post">
            {user?.Post && user?.Post.length < 1 && <h1 className='text-2xl font-bold text-center'>No Post Found</h1>}
            {user?.Post && user?.Post.length > 0 && user?.Post.map((post) => <PostCard  isAuthCard={true} post={post} key={post.id} />)}
          </TabsContent>
          <TabsContent className='mt-12' value="comment">
            {user?.Comment && user?.Comment.length < 1 && <h1 className='text-2xl font-bold text-center'>No Comment Found</h1>}
            {user?.Comment && user?.Comment.length > 0 && user?.Comment.map((comment)=><CommentCard isAuthCard={true} comment={comment} key={comment.id} />) }.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

import UserAvatar from '@/components/common/UserAvatar'
import UserProfileAvatar from '@/components/common/UserProfileAvatar'
import { MoveLeft } from 'lucide-react'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions, CustomSession } from '@/app/api/auth/[...nextauth]/option'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserComment, getUserPosts } from '@/lib/serverMethods'
import PostCard from '@/components/common/PostCard'
import DynamicNavbar from '@/components/common/DynamicNavbar'
import CommentCard from '@/components/common/CommentCard'


export default async function Profile() {

  const session: CustomSession | null = await getServerSession(authOptions)

  const posts: Array<PostType> | [] = await getUserPosts()
  const comments: Array<CommentType> | [] = await getUserComment()

  return (
    <div>
      <DynamicNavbar title="Profile" />
      <div className='mt-8 flex items-center space-x-4'>
        <UserProfileAvatar name="Harshit" />
        <div>
          <h1 className='text-2xl font-bold'>{session?.user?.name}</h1>
          <p className=' text-md text-orange-300'>{session?.user?.username}</p>
          <h1 className='text-xl'>{session?.user?.email}</h1>
        </div>
      </div>
      <div className='mt-8' >
        <Tabs defaultValue="post" className="w-full">
          <TabsList className='w-full' >
            <TabsTrigger value="post" className='w-full'  >Post</TabsTrigger>
            <TabsTrigger value="comment" className='w-full'>Comment</TabsTrigger>
          </TabsList >
          <TabsContent className='mt-12' value="post">
            {posts && posts.length < 1 && <h1 className='text-2xl font-bold text-center'>No Post Found</h1>}
            {posts && posts.length > 0 && posts.map((post) => <PostCard  isAuthCard={true} post={post} key={post.id} />)}
          </TabsContent>
          <TabsContent className='mt-12' value="comment">
            {comments && comments.length < 1 && <h1 className='text-2xl font-bold text-center'>No Comment Found</h1>}
            {comments && comments.length > 0 && comments.map((comment)=><CommentCard isAuthCard={true} comment={comment} key={comment.id} />) }.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

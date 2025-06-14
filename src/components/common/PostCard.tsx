'use client'
import React, { useState } from 'react'
import UserPostBar from './UserPostBar'
import Image from 'next/image'
import { Heart, MessageCircle, SendHorizonal } from 'lucide-react'
import Env from '@/config/env'
import ImageView from './ImageView'
import AddComment from '../threads/AddComment'
import Link from 'next/link'
import SharePost from '../threads/SharePost'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

export default function PostCard({post,noRedirect,isAuthCard}:{post :PostType,noRedirect?:boolean,isAuthCard?:boolean}) {
  
  const [status,setStatus] = useState(false)

  const {toast} = useToast()

  const likeDislike = async (status:boolean) => {
    // Optimistically update UI
    setStatus(status)
    if(status) {
      post.likes_count++
    } else {
      post.likes_count--
    }

    try {
      const res = await axios.post('/api/like',{
        toUser_id:post.user_id,
        post_id:post.id,
        status
      })
      
      if(res.data.status === 200){
        toast({
          title:"Success",
          description:res.data.message,
          className:"bg-green-500"
        })
        // Fetch updated post data in background
        axios.get(`/api/post/${post.id}`)
        .then((response) => {
          if(response.data.status === 200) {
            Object.assign(post, response.data.data)
          }
        })
      }
    } catch (error) {
      // Revert optimistic update on error
      setStatus(!status)
      if(status) {
        post.likes_count--
      } else {
        post.likes_count++
      }
      
      toast({
        title:"Error",
        description:"An unexpected error occurred",
        className:"bg-red-500"
      })
    }
  }

  return (
    <div  className='mb-8'>
        <UserPostBar isAuthCard={isAuthCard} post={post} />
        <div className='ml-12 mt-[-8px]' >
           <Link href={ noRedirect ? "#" : `/post/${post.id}`} className='cursor-pointer' >{post.content}</Link>
        </div>
        {post.image && 
        <ImageView image={post.image} />
}
        <div className=' flex mt-2 space-x-4'>
          {
            post?.Like?.length > 0 || status ?
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-500 cursor-pointer"
              onClick={() => likeDislike(false)}
            >
              <path
                d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            : 
            <Heart height={20} width={20} className=' cursor-pointer' 
            onClick={() =>likeDislike(true)}
            />
          }
            <AddComment post={post} />
            <SharePost url={`${Env.APP_URL}/post/${post.id}`} />
        </div>
        <div className='mt-2' >
          <span>{post?.comments_count || 0}  replies</span>
          <span className='ml-2' > {post?.likes_count} likes</span>
        </div>
    </div>
  )
}

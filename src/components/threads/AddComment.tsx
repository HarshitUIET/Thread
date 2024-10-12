'use client'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { MessageCircle } from 'lucide-react'
import UserPostBar from '../common/UserPostBar'  
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import UserAvatar from '../common/UserAvatar'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

export default function AddComment({post}:{post :PostType}) {

    const {data} = useSession()
    const {toast} = useToast()

    const [content, setContent] = useState<string>('')
    const [error, setError] = useState<PostErrorType>({})
    const [loading, setLoading] = useState<boolean>(false)

    const submit = async () => {
            setLoading(true)
            axios.post('/api/comment', {
                content,
                post_id: post.id.toString(),
                toUser_id: post.user_id
            })
            .then((res) => {
                setLoading(false)
                if(res.data.status === 400) {
                    setError(res.data.errors)
                }
                else if(res.data.status === 200) {
                    setError({})
                    setContent('')
                     toast({
                        title: 'Success',
                        description: res.data.message,
                        className: 'bg-green-500 '
                    })
                }
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
        } 
    

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
    <MessageCircle height={20} width={20} className=' cursor-pointer ' />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Add Comment </AlertDialogTitle>
        <AlertDialogDescription>
          <div className='mt-5' >
           <UserPostBar post={post}/>
           <div className='ml-12 mt-[-12px]'>{post.content}</div>
           <div className='mt-5 flex justify-start items-start' >
           <UserAvatar name={data?.user?.name!} />
              <textarea className='w-full h-24 bg-background outline-none resize-none rounded-lg placeholder:font-normal p-2' placeholder='Type your Comment...' value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
              </div>
              <span className='text-red-500 ml-12 font-bold' >{error.content}</span>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={submit}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}


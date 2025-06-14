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
import { formatDate } from '@/lib/utils'

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
                    // Fetch updated post data
                    axios.get(`/api/post/${post.id}`)
                    .then((response) => {
                        if(response.data.status === 200) {
                            // Update the post object with new data
                            Object.assign(post, response.data.data)
                        }
                    })
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
        <MessageCircle height={20} width={20} className='cursor-pointer hover:text-blue-500 transition-colors' />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">Add Comment</AlertDialogTitle>
          <AlertDialogDescription>
            <div className='mt-5'>
              <UserPostBar post={post}/>
              <div className='ml-12 mt-2 text-gray-600'>{post.content}</div>
              <div className='mt-5 flex justify-start items-start gap-3'>
                <UserAvatar name={data?.user?.name!} />
                <div className="flex-1">
                  <textarea 
                    className='w-full h-24 bg-background outline-none resize-none rounded-lg placeholder:font-normal p-3 border border-gray-200 focus:border-blue-500 transition-colors' 
                    placeholder='Type your Comment...' 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                  />
                  {error.content && (
                    <span className='text-red-500 text-sm mt-1 block'>{error.content}</span>
                  )}
                </div>
              </div>
              {post.Comment && post.Comment.length > 0 && (
                <div className='mt-6 border-t pt-4 h-[200px] overflow-y-auto'>
                  <h3 className="font-semibold mb-3">Comments</h3>
                  <div className="space-y-4 mr-2">
                    {post.Comment.map((comment) => (
                      <div key={comment.id} className='flex items-start gap-3'>
                        <UserAvatar name={comment.user.name} />
                        <div className='flex-1'>
                          <div className='flex justify-between items-start'>
                            <div className='font-semibold text-sm'>{comment.user.name}</div>
                            <div className='text-xs text-gray-400'>{formatDate(comment.created_at)}</div>
                          </div>
                          <div className='text-sm text-gray-600 mt-1'>{comment.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-100">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={submit}
            className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !content.trim()}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


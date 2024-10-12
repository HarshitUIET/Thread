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
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'


export default function DeleteComment({id}:{id:number}) {

    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const { toast } = useToast()

    const deleteComment = () => {
        setLoading(true)
        axios.delete(`/api/comment/${id}`)
        .then((res)=>{
            setLoading(false)
            if(res.status === 400){
                toast({
                    title:"Error",
                    description:res.data.message,
                    className:"bg-red-500 text-white"
                })
            }
            else if(res.status === 200){
                router.refresh()
                toast({
                    title:"Success",
                    description:res.data.message,
                    className:"bg-green-500"
                })
                
            }
        })
        .catch((err)=>{
            setLoading(false)
            toast({
                title:"Error",
                description:err.message,
                className:"bg-red-500 text-white"
            })
        })

    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger className=' cursor-pointer text-red-400' asChild>
                <Trash2 height={20} width={20} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the comment.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteComment} disabled={loading} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

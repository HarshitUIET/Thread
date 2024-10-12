'use client'
import React, { useRef, useState, useEffect } from 'react'
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
import { Copy, SendHorizonal } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {FacebookIcon,FacebookShareButton,TelegramIcon,TelegramShareButton,WhatsappIcon,WhatsappShareButton,LinkedinIcon,LinkedinShareButton} from 'next-share'

export default function SharePost({ url }: { url: string }) {

    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const dialogRef = useRef<HTMLDivElement>(null)

    const copyUrl = () => {
        navigator.clipboard.writeText(url)
        toast({
            title: "Copied",
            description: "Link copied to clipboard",
            className: "bg-green-500 text-white"
        })
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <SendHorizonal height={20} width={20} className='cursor-pointer ' />
            </AlertDialogTrigger>
            {open && (
                <AlertDialogContent ref={dialogRef}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Share Post</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className='flex rounded-md border justify-between p-5 mt-5' >
                                <strong>{url}</strong>
                                <Copy onClick={copyUrl} height={20} width={20} className='cursor-pointer' />
                            </div>
                            <div className='mt-5 flex space-x-5 items-center ' >
                              <FacebookShareButton url={url}
                               quote='Check out this post shared by Harshit Thread app'
                              >
                                <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <WhatsappShareButton url={url}
                                title='Check out this post shared by Harshit Thread app'
                                >
                                <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                                <TelegramShareButton url={url}
                                title='Check out this post shared by Harshit Thread app'
                                >
                                <TelegramIcon size={32} round />
                                </TelegramShareButton>
                                <LinkedinShareButton url={url}
                                title='Check out this post shared by Harshit Thread app'
                                >
                                <LinkedinIcon size={32} round />
                                </LinkedinShareButton>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setOpen(false)}>
                            Close
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            )}
        </AlertDialog>
    )
}

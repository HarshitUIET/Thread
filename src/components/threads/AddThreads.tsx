"use client";
import React, { useRef, useState } from 'react'
import UserAvatar from '../common/UserAvatar'
import { Image } from 'lucide-react'
import { Button } from '../ui/button'
import ImagePreviewCard from '../common/ImagePreviewCard';
import axios from 'axios'
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


export default function AddThreads() {

    const {toast} = useToast()
    const router = useRouter()


    const imageRef = useRef<HTMLInputElement>(null)

    const [image, setImage] = useState<File | null>(null)

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<PostErrorType>({})

    const handleClick = () => {
        imageRef.current?.click()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file)
            const imageUrl = URL.createObjectURL(file)
            setPreviewUrl(imageUrl)
        }
    }

    const removePreviewURL = () => {
        setPreviewUrl(null)
        setImage(null)
    }

    const postSubmit = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image)
        }
        axios.post('/api/post', formData)
            .then((res) => {
                setLoading(false)
                const response = res.data;
                if(response.status === 400) {
                    setError(response.errors)
                }
                else if(response.status === 200) {
                    router.refresh()
                    toast({
                        title: 'Success',
                        description: response.message,
                        className: 'bg-green-500 text-white'
                    })
                    setContent('')
                    setPreviewUrl(null)
                    setImage(null)
                    setError({})
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }


    return (
        <div className='mt-5' >
            {previewUrl && <ImagePreviewCard image={previewUrl} callback={removePreviewURL} />}
            <div className='flex justify-start items-start space-x-4 ' >
                <UserAvatar name="Ha" image='' />
                <textarea className='w-full h-24 text-md p-2 bg-muted outline-none resize-none rounded-lg placeholder:font-normal'
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    placeholder='Post something here...'
                >
                </textarea>
            </div>
            <span className='text-red-400 font-bold' >{error.content}</span>
            <div className=' ml-14 mt-4 flex justify-between items-center' >
                <input ref={imageRef} onChange={handleImageChange} type='file' className='hidden' />
                <Image onClick={handleClick} width={30} height={30}
                    className='cursor-pointer'
                />
                <Button size='sm' onClick={postSubmit} disabled={content?.length < 3 || loading} >POST</Button>
            </div>
        </div>
    )
}

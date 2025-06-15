import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'

export default function ImageView({ image }: { image: string }) {
    // Check if the image URL is a Cloudinary URL
    const isCloudinaryUrl = image.startsWith('http');
    const imageUrl = isCloudinaryUrl ? image : `/uploads/${image}`;

    return (
        <div>
            <Sheet > 
                <SheetTrigger asChild >
                    <Image
                        src={imageUrl}
                        width={400}
                        height={400}
                        alt='post'
                        className='w-full rounded-md mt-2 cursor-pointer
         object-contain h-[400px]'
                    />
                </SheetTrigger>
                <SheetContent  side='bottom'>
                    <SheetHeader>
                        <SheetTitle>Image</SheetTitle>
                        <SheetDescription className='mb-4 w-full flex justify-center items-center' >
                            <Image
                                src={imageUrl}
                                width={400}
                                height={400}
                                alt='post'
                                className='w-full rounded-md mt-2 cursor-pointer
         object-contain h-[500px] unoptimized'
                            />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

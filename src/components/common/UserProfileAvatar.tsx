import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function UserProfileAvatar({name,image}:{name:string,image?:string}) {
    return (
        <Avatar className='h-20 w-20'  >
            <AvatarImage src={image} />
            <AvatarFallback className='text-2xl font-bold' >{name[0]}</AvatarFallback>
        </Avatar>
    )
}

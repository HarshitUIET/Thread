import { formatDate } from '@/lib/utils'
import { comment } from 'postcss'
import React from 'react'
import UserAvatar from './UserAvatar'

export default function NotificationCard({notification}:{notification:NotificationType}) {
    return (
        <div className='mb-3' >
        <div className='flex items-center space-x-4' >
          <UserAvatar name={notification?.user?.name} />
        <div className='bg-muted w-full rounded-lg p-4'>
         <div className='flex justify-between items-start w-full'>
             <p className='font-bold' >{notification?.user?.name}</p>
             <div className='flex' >
                 <span>{formatDate(notification?.created_at)}</span>
             </div>
         </div>
         <div>{notification?.content}</div>
        </div>
        </div>
     </div>
    )
}

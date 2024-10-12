import DynamicNavbar from '@/components/common/DynamicNavbar'
import NotificationCard from '@/components/common/NotificationCard';
import { getNotification } from '@/lib/serverMethods';
import { formatDate } from '@/lib/utils';
import React from 'react'

export default async function Notification() {

    const notification: Array<NotificationType> | [] = await getNotification();

    return (
        <div>
            <DynamicNavbar title='Notifications' />
            <div className='mt-5' >
                {notification && notification.length < 1 ? <h1 className='text-center font-bold text-xl'>No Notifications</h1> : null}
                {
                    notification && notification.length > 0 && notification.map((item: NotificationType) => (
                      <NotificationCard key={item.id} notification={item} />
                    ))
                }
            </div>
        </div>
    )
}

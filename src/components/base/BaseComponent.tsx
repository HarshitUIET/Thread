import React from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import MobileNav from './MobileNav'
import { ScrollArea } from '../ui/scroll-area'

export default function BaseComponent({children}:{children:React.ReactNode}) {
  return (
    <div className='md:container p-5 h-screen overflow-hidden'>
      <div className='flex h-full'>
        <LeftSidebar />
        <ScrollArea className='h-screen w-full lg:w-2/4 md:w-3/4 lg:px-8 lg:py-4 xl:px-12 md:p-6 overflow-y-auto'>
          <MobileNav />
          {children}
        </ScrollArea>
        <RightSidebar />
      </div>
    </div>
  )
}

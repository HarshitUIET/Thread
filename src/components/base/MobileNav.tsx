import React from 'react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, User2 } from 'lucide-react'
import Image from 'next/image'
import Sidebarlinks from '../common/Sidebarlinks'
import Link from 'next/link'

export default function MobileNav() {
    return (
        <nav className='md:hidden flex justify-between items-center' >
            <div className='flex items-center'>
                <Sheet>
                    <SheetTrigger><Menu height={30} width={30} className='font-bold' />
                    </SheetTrigger>
                    <SheetContent side='left' >
                        <SheetHeader>
                            <SheetTitle>
                                <div className='flex justify-center items-center' >
                                    <Image src='/images/logo.svg' width={50} height={50} alt='logo' />
                                    <h1 className='font-bold text-xl ml-2' >Threads</h1>
                                </div>
                            </SheetTitle>
                            <SheetDescription>
                               <Sidebarlinks/>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <Image src='images/logo.svg' width={30} height={30} alt='logo' />
            <Link href='/profile' >
             <User2 size={30} />
            </Link>
        </nav>
    )
}

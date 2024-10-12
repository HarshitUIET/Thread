import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

export default function ImagePreviewCard({image,callback}:{image:string,callback:() => void}) {
  return (
    <div className='w-full h-72 bg-cover mb-5'
    style={{backgroundImage:`url(${image})`,
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
  }}
    >
      <div className='text-right mr-2'>
        <Button size='icon' className='mt-2' onClick={callback} >
          <X/>
        </Button>
      </div>

    </div>
  )
}

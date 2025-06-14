import Image from 'next/image'
import AddThreads from "@/components/threads/AddThreads";
import { getPosts } from '@/lib/serverMethods';
import PostCard from '@/components/common/PostCard';
import { Suspense } from 'react';

export default async function Home() {
  try {
    const posts:Array<PostType> | [] = await getPosts();

    console.log("Posts",posts);

    return (
        <div>
          <div className='flex justify-center items-center'>
            <Image src='/images/logo.svg' className='hidden md:block' width={40} height={40} alt='logo' />
          </div>
          <AddThreads/>
          <div className='mt-5'>
            <Suspense fallback={<div>Loading posts...</div>}>
              {
                posts.map((item)=> <PostCard post={item} key={item.id} /> )
              }
            </Suspense>
          </div>
        </div>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600">Please try refreshing the page</p>
      </div>
    );
  }
}



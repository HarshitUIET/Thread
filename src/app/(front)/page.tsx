import Image from 'next/image'
import AddThreads from "@/components/threads/AddThreads";
import { getPosts } from '@/lib/serverMethods';
import PostCard from '@/components/common/PostCard';


export default async function Home() {

  const posts:Array<PostType> | [] = await getPosts();

  console.log(posts);

  return (
      <div>
        <div className='flex justify-center items-center'>
          <Image src='/images/logo.svg' className='hidden md:block' width={40} height={40} alt='logo' />
        </div>
        <AddThreads/>
        <div className='mt-5'>
          {
            posts.map((item)=> <PostCard post={item} key={item.id} /> )
          }
        </div>
      </div>
  );
}



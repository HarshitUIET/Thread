import CommentCard from '@/components/common/CommentCard';
import DynamicNavbar from '@/components/common/DynamicNavbar';
import PostCard from '@/components/common/PostCard';
import { getPost } from '@/lib/serverMethods'
import { comment } from 'postcss';
import React from 'react'

export default async function ShowPost({ params }: { params: { id: number } }) {
    try {
        const post = await getPost(params.id);

        return (
            <div>
                <DynamicNavbar title='Show Post' />
                {
                    post && (<div className='mt-7'>
                        <PostCard noRedirect={true} post={post} />
                    </div>)
                }
                <div className='mt-5' >
                    <h1 className='font=bold mb-5 text-lg' >Comments</h1>
                    {
                        post?.Comment?.length !== 0 ? (
                            <div>
                                {post?.Comment.map((comment: CommentType) => (
                                    <CommentCard isAuthCard={false} key={comment.id} comment={comment} />
                                ))}
                            </div>
                        ) : (
                            <h1 className='font-bold text-black' >No Comment found</h1>
                        )
                    }
                </div>
            </div>
        )
    } catch (error) {
        return <div>Error loading post</div>
    }
}

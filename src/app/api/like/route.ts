import { NextRequest,NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";


export async function POST(req: NextRequest) {
   const session:CustomSession | null = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({status:401,message:"Unauthorized"})
    }

    const payload:likeType = await req.json()

    if(!payload.toUser_id || !payload.post_id){
        return NextResponse.json({status:400,message:"Bad Request"})
    }

    if(payload.status){
        if(Number(session?.user?.id) !== Number(payload.toUser_id)) {
            await prisma.notification.create({
                data:{
                    user_id:Number(session?.user?.id),
                    toUser_id:Number(payload.toUser_id),
                    content:`${session?.user?.name} liked your post`
                }
            })
        }
        await prisma.post.update({
            where:{
                id:Number(payload.post_id)
            },
            data:{
                likes_count :{
                    increment:1
                }
            }
        })
    
        await prisma.like.create({
            data:{
                user_id:Number(session?.user?.id),
                post_id:Number(payload.post_id),
            }
        })
    }
    else{
        await prisma.post.update({
            where:{
                id:Number(payload.post_id)
            },
            data:{
                likes_count :{
                    decrement:1
                }
            }
        })
    
        await prisma.like.deleteMany({
            where:{
                user_id:Number(session?.user?.id),
                post_id:Number(payload.post_id),
            }
        })
    }

    return NextResponse.json({status:200,message:payload.status?"Post Liked Successfully":"Post Unliked Successfully"})

}
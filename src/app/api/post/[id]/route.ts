import prisma from "@/DB/db.config";
import { rmSync, stat } from "fs";
import { NextRequest,NextResponse } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { join } from "path";

export async function GET(req:NextRequest,{params}:{params:{id:number}}) {
    const session:CustomSession | null = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({status:401,data:"Unauthorized"})
    }

    try {
        const post = await prisma.post.findUnique({
            where:{
                id:Number(params.id)
            },
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        username:true,
                    }
                },
                Comment:{
                    include:{
                        user:{
                            select:{
                                id:true,
                                name:true,
                                username:true,
                            }
                        }
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                },
                Like:{
                   where:{
                    user_id:Number(session?.user?.id)
                   }
                }
            }
        })

        if (!post) {
            return NextResponse.json({status:404,data:"Post not found"})
        }

        return NextResponse.json({status:200,data:post})
    } catch (error) {
        return NextResponse.json({status:500,data:"Internal Server Error"})
    }
}

export async function DELETE(req:NextRequest,{params}:{params:{id:number}}) {
    
    const session:CustomSession | null = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({status:401,data:"Unauthorized"})
    }

    const findPost = await prisma.post.findUnique({
        where:{
            id:Number(params.id),
            user_id:Number(session?.user?.id)
        }
    })

    if(!findPost){
        return NextResponse.json({status:401,data:"Unauthorized"})
    }

    if(findPost.image !== "" && findPost.image !== null){
        const dir = join(process.cwd(),"public","/uploads");
        const path = dir + "/" + findPost.image;
        rmSync(path,{force:true});
    }

    await prisma.post.delete({
        where:{
            id:Number(params.id)
        }
    })

    return NextResponse.json({status:200,data:"Post Deleted Successfully"})
   
}
import prisma from "@/DB/db.config";
import { rmSync, stat } from "fs";
import { NextRequest,NextResponse } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { join } from "path";
import { v2 as cloudinary } from 'cloudinary';

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

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ status: 401, data: "Unauthorized" });
    }

    const findPost = await prisma.post.findUnique({
        where: {
            id: Number(params.id),
            user_id: Number(session?.user?.id)
        }
    });

    if (!findPost) {
        return NextResponse.json({ status: 401, data: "Unauthorized" });
    }

    if (findPost.image !== "" && findPost.image !== null) {
        try {
            // Extract public_id from Cloudinary URL
            const publicId = findPost.image.split('/').slice(-1)[0].split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
            // Continue with post deletion even if image deletion fails
        }
    }

    await prisma.post.delete({
        where: {
            id: Number(params.id)
        }
    });

    return NextResponse.json({ status: 200, data: "Post Deleted Successfully" });
}
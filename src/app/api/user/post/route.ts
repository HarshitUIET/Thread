import { NextResponse,NextRequest } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { stat } from "fs";
import prisma from "@/DB/db.config";

export async function  GET(req:NextRequest) {

    const session : CustomSession | null = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({status:401,message:"Unauthorized"});
    }

    const posts = await prisma.post.findMany({
        where:{
            user_id:Number(session.user?.id)
        },
        include: {
            user: {
                select: {
                    name: true,
                    id:true,
                    username:true
                }
            },
            Like :{
               where:{
                user_id:Number(session?.user?.id)
               }
            }
        },
        orderBy: {
            id: 'desc'
        }
    });

    return NextResponse.json({status:200,data:posts});

}
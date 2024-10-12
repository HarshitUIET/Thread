import prisma from "@/DB/db.config";
import { NextRequest,NextResponse } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";



export async function DELETE(req:NextRequest,{params}:{params:{id:number}}) {
    
    const session:CustomSession | null = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({status:401,data:"Unauthorized"})
    }

    const findComment = await prisma.comment.findUnique({
        where:{
            id:Number(params.id),
            user_id:Number(session?.user?.id)
        }
    })

    if(!findComment){
        return NextResponse.json({status:401,data:"Unauthorized"})
    }

    await prisma.comment.delete({
        where:{
            id:Number(params.id)
        }
    })

    return NextResponse.json({status:200,data:"Comment Deleted Successfully"})
   
}
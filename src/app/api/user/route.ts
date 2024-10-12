import { NextResponse,NextRequest } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";


export async function GET(req:NextRequest) {
  
    const session:CustomSession | null = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({status:401,message:'Unauthorized'});
    }

    const users = await prisma.user.findMany({
        where:{
            NOT : {
                id:Number(session.user?.id)
            }
        },
        select:{
            id:true,
            name:true,
            username:true,
        }
    });

    return NextResponse.json({status:200,data:users});

}
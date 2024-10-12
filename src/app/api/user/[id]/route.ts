import prisma from "@/DB/db.config";
import { NextRequest,NextResponse } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

export async function GET(req:NextRequest,{params}:{params:{id:Number}}){

    const session:CustomSession|null = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({status:401,message:"Unauthorized"})
    }
 
    const user = await prisma.user.findUnique({
        where:{
            id:Number(params.id)
        },
        select:{
            id:true,
            name:true,
            email:true,
            username:true,
            Post:{
                include:{
                    user:{
                        select:{
                            id:true,
                            name:true,
                            username:true
                        }
                    }
                }
            },
            Comment:{
                include:{
                    user:{
                        select:{
                            id:true,
                            name:true,
                            username:true
                        }
                    }
                }
            },
            Like :{
                take:1,
               where:{
                user_id:Number(session?.user?.id)
               }
            }
            
        }
    })

    return NextResponse.json({status:200,data:user})

}
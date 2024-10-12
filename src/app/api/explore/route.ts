import { NextRequest,NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";

export async function GET(req: NextRequest) {
   
    const session : CustomSession | null = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({status: 401, message: "Unauthorized"})
    }
    
    const query = req.nextUrl.searchParams.get("query");

    const users = await prisma.user.findMany({
        where: {
            OR :[
                {
                    username: {
                        contains: query??"",
                        mode: "insensitive"
                    }
                },
                {
                    name: {
                        contains: query??"",
                        mode: "insensitive"
                    }
                }
            ],
            NOT:{
                id:Number(session?.user?.id)
            }
        },
        select: {
            id: true,
            name: true,
            username: true,
        }
    })

    return NextResponse.json({status: 200,data: users})
    
}
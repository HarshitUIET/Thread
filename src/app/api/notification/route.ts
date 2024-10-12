import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from '../auth/[...nextauth]/option';
import { getServerSession } from 'next-auth';
import prisma from "@/DB/db.config";

export async function GET(req: NextRequest) {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    const notifications = await prisma.notification.findMany({
        where: {
            toUser_id: Number(session.user?.id)
        },
        include:{
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true
                }
            }
        },
        orderBy: {
            id: 'desc'
        }
    });
        
    return NextResponse.json({ status: 200, data: notifications });

}

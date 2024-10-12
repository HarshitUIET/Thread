import { NextRequest, NextResponse } from "next/server";
import { authOptions, CustomSession } from '../auth/[...nextauth]/option';
import { getServerSession } from 'next-auth';
import { CustomErrorReporter } from '@/validation/CustomErrorReporter';
import vine, { errors } from '@vinejs/vine';
import { commentSchema } from "@/validation/CommentSchema";
import prisma from "@/DB/db.config";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const session: CustomSession | null = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json({ status: 401, message: "Unauthorized" });
        }

        vine.errorReporter = () => new CustomErrorReporter();

        const validator = vine.compile(commentSchema);
        const payload = await validator.validate(data);

        await prisma.post.update({
            where: { id: Number(payload.post_id) },
            data: { comments_count: { increment: 1 } }
        });

        await prisma.notification.create({
            data : {
                user_id : Number(session?.user?.id),
                toUser_id : Number(payload.toUser_id),
                content : `${session?.user?.name} commented on your post`,
            }
        })

        await prisma.comment.create({
            data: {
                content: payload.content,
                user_id: Number(session.user?.id),
                post_id: Number(payload.post_id)
            }
        });

        return NextResponse.json({ status: 200, message: "Comment created successfully" });

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({
                status: 400,
                errors: error.messages,
            });
        }

        console.log(error);
        return NextResponse.json({ status: 500, message: "An unexpected error occurred." });
    }
}

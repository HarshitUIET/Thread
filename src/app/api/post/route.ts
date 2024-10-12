import { NextRequest, NextResponse } from 'next/server';
import { authOptions, CustomSession } from '../auth/[...nextauth]/option';
import { getServerSession } from 'next-auth';
import { CustomErrorReporter } from '@/validation/CustomErrorReporter';
import vine, { errors } from '@vinejs/vine';
import { postSchema } from '@/validation/postSchema';
import { imageValidator } from '@/validation/imageValidator';
import { join } from 'path';
import { getRandomNumber } from '@/lib/utils';
import { writeFile } from 'fs/promises';
import prisma from '@/DB/db.config';


export async function GET(req: NextRequest) {
    try {

        const session:CustomSession | null = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ status: 401, message: "Unauthorized" });
        }

        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        id:true,
                        username:true
                    }
                },
               Like :{
                    take:1,
                   where:{
                    user_id:Number(session?.user?.id)
                   }
                }
            },
            orderBy: {
                id: 'desc'
            }
        });

        return NextResponse.json({ status: 200, data:posts });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, message: "An unexpected error occurred." });
    }

}

export async function POST(req: NextRequest) {
    try {
        const session: CustomSession | null = await getServerSession(authOptions);


        if (!session) {
            return NextResponse.json({ status: 401, message: "Unauthorized" });
        }

        const formData = await req.formData();

        const data = {
            content: formData.get("content")?.toString() || "",
            image: ""
        };

        vine.errorReporter = () => new CustomErrorReporter();

        const validator = vine.compile(postSchema);
        const payload = await validator.validate(data);

        const image = formData.get("image") as File | null;


        if (image) {
            const isImageNotValid = imageValidator(image.name, image.size);
            if (isImageNotValid) {
                return NextResponse.json({
                    status: 400,
                    errors: {
                        image: isImageNotValid,
                    }
                });
            }


            try {
                const buffer = Buffer.from(await image.arrayBuffer());
                const uploadDir = join(process.cwd(), 'public', 'uploads');
                const uniqueName = `${Date.now()}_${getRandomNumber(1, 9999)}`;
                const imgExt = image?.name.split('.').pop() || 'png';
                const fileName = `${uniqueName}.${imgExt}`;
                await writeFile(`${uploadDir}/${fileName}`, buffer);
                data.image = fileName;
            } catch (error) {
                return NextResponse.json({
                    status: 500,
                    message: "Failed to upload the image.",
                });
            }
        }

        console.log(session);

        await prisma.post.create({
            data: {
                content: payload.content,
                user_id: Number(session.user?.id),
                image: data.image || null,
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Post uploaded successfully",
        });

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({
                status: 400,
                errors: error.messages,
            });
        }

        return NextResponse.json({
            status: 500,
            message: "An unexpected error occurred.",
        });
    }
}

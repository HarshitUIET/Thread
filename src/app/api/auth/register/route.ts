import { CustomErrorReporter } from '@/validation/CustomErrorReporter';
import { registerSchema } from '@/validation/registerschema';
import vine,{errors} from '@vinejs/vine';
import { stat } from 'fs';
import {NextRequest,NextResponse} from 'next/server'
import { genSaltSync, hashSync } from 'bcryptjs';
import prisma from '@/DB/db.config';

export async function POST(req:NextRequest) {
    try {
        const data = await req.json();

        vine.errorReporter = () =>  new CustomErrorReporter();

        const validator = vine.compile(registerSchema);
        const payload = await validator.validate(data);

        const isEmailExist = await prisma.user.findUnique({
            where : {
                email:payload.email
            }
        })

        if(isEmailExist){
            return NextResponse.json({status:400,errors:{email:"Email already exist"}});
        }

        const isUsernameExist = await prisma.user.findUnique({  
            where : {
                username:payload.username
            }
        })

        if(isUsernameExist){
            return NextResponse.json({status:400,errors:{username:"Username already exist"}});
        }

        const salt = genSaltSync(10);

        payload.password = hashSync(payload.password,salt);


        await prisma.user.create({
            data:payload
        })

        return NextResponse.json({status:200,message:"User registered successfully !"});

    } catch (error) {
        if(error instanceof errors.E_VALIDATION_ERROR){
            console.log(error.messages);
            return NextResponse.json({status:400,errors:error.messages});
        }
    }
}
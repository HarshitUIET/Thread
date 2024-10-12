import { CustomErrorReporter } from "@/validation/CustomErrorReporter";
import { NextRequest,NextResponse } from "next/server";
import vine,{errors} from "@vinejs/vine";
import { loginSchema } from "@/validation/loginschema";
import prisma from "@/DB/db.config";
import { compareSync } from "bcryptjs";

export async function POST(req:NextRequest) {
    try{
        const data = await req.json();
        console.log(data);

        vine.errorReporter = () => new CustomErrorReporter();

        const validator = vine.compile(loginSchema);

        const payload = await validator.validate(data);

        const findUser = await prisma.user.findUnique({
            where:{
                email:payload.email
            }
        });

        if(!findUser){
            return NextResponse.json({status:400,errors:{email:"Email not found"}});
        }

        const isPasswordMatch = compareSync(payload.password,findUser.password!);

        if(!isPasswordMatch){
            return NextResponse.json({status:400,errors:{password:"Password not match"}});
        }

        return NextResponse.json({status:200,message:"Login Successfully"});
    }
    catch(error){
        console.log(error);
        if(error instanceof errors.E_VALIDATION_ERROR){
            console.log(error.messages);
            return NextResponse.json({status:400,errors:error.messages});
        }
    }
}
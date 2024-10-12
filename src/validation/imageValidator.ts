import { bytestoMB } from "@/lib/utils";

export function imageValidator(name:string|undefined,size:number|undefined) {
    
      let flag : string | null = null;

      if(name) {

        const getImgExt = name.split(".")
        const isValidExt:Array<string> = ['svg','jpg','gif','png','jpeg']
        if(!isValidExt.includes(getImgExt[1])) {
            flag = "Image is not in valid format";
        }
        else{
            flag = null;
        }
      }

      if(size) {
        const imageInMB = bytestoMB(size);
        if(imageInMB > 2 ){
            flag = "Image should be less than 2 MB"
        }else{
            flag = null
        }
      }

      return flag;

}
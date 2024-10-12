import vine,{errors} from "@vinejs/vine";

export const commentSchema = vine.object({
    content : vine.string().trim(),
    post_id : vine.number(),
    toUser_id : vine.number()
})
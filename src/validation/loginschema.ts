import vine from "@vinejs/vine";

export const loginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string()
});
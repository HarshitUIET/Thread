import vine from '@vinejs/vine'
import { use } from 'react'

export const registerSchema = vine.object({
    username: vine.string().minLength(3).maxLength(50),
    name: vine.string().minLength(3).maxLength(50),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(50).confirmed(),
})
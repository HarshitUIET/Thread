export {default} from 'next-auth/middleware'

export const config = {matcher:['/','/profile','/explore','/post/path/:slug*']};
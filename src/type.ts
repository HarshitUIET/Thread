type AuthStateType = {
    email?: string
    name?: string
    username?: string
    password?:string
    password_confirmation?:string
}

type AuthErrors = {
    email?:string
    name?:string
    username?:string
    password?:string
    password_confirmation?:string
}

type PostErrorType  = {
    content?:string
}

type PostType = {
    id: number
    user_id:number
    content:string
    image?:string
    created_at: string
    user : UserType
    comments_count:number
    Like: Array<PostLikeType> | []
    likes_count:number
    Comment: Array<CommentType> | []
}

type UserType = {
    id: number
    name:string
    username:string
}

type CommentType = {
    id: number,
    user_id: number,
    post_id: number,
    content: string,    
    created_at: string,
    user: UserType
}


type ShowUserType = {
    id: number
    name:string
    username:string
    email:string
    Post: Array<PostType> | []
    Comment: Array<CommentType> | []
}

type NotificationType = {
    id: number
    user_id: number
    toUser_id: number
    content: string
    created_at: string
    user: UserType
}

type likeType = {
    toUser_id: number
    post_id: number
    status: boolean
}

type PostLikeType = {
    id: number
    user_id: number
    post_id: number
}
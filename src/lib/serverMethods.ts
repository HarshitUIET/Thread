import Env from "@/config/env";
import { headers } from "next/headers";

export async function  getPosts() {

    console.log("IN posts");

    const res = await fetch(`${Env.APP_URL}/api/post`,{
        cache: 'no-cache',
        headers:headers(),
    });

    console.log("Res",res);

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();

    return response?.data;

}

export async function  getUserPosts() {

    const res = await fetch(`${Env.APP_URL}/api/user/post`,{
        cache: 'no-cache',
        headers:headers(),
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();

    return response?.data;

}

export async function getUsers() {

    const res = await fetch(`${Env.APP_URL}/api/user`,{
        cache: 'no-cache',
        headers:headers(),
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();

    return response?.data;

}

export async function getPost(id:Number) {

    const res = await fetch(`${Env.APP_URL}/api/post/${id}`,{
        cache: 'no-cache',
        headers:headers(),
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();

    return response?.data;

}

export async function getUserComment() {

    const res = await fetch(`${Env.APP_URL}/api/user/comment`,{
        cache: 'no-cache',
        headers:headers(),
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();

    return response?.data;

}

export async function getShowUser(id:number) {

    const res = await fetch(`${Env.APP_URL}/api/user/${id}`,{
        cache: 'no-cache',
        headers:headers(),
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();

    return response?.data;

}


export async function getNotification() {

    const res = await fetch(`${Env.APP_URL}/api/notification`,{
        cache: 'no-cache',
        headers:headers(),
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();

    return response?.data;

}

export async function getSearchUsers(query:string) {

    const res = await fetch(`${Env.APP_URL}/api/explore?query=${query}`,{
        cache: 'no-cache',
        headers:headers(),
    });

    console.log("Res",res);

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await res.json();

    return response?.data;

}

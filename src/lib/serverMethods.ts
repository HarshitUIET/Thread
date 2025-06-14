import Env from "@/config/env";
import { cookies } from 'next/headers';

export async function getPosts() {
    try {
        if (!Env.APP_URL) {
            throw new Error("APP_URL environment variable is not set");
        }

        const cookieStore = cookies();
        const res = await fetch(`${Env.APP_URL}/api/post`, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `Failed to fetch posts: ${res.status}`);
        }

        const response = await res.json();
        return response?.data;
    } catch (error) {
        console.error("Error in getPosts:", error);
        throw error;
    }
}

export async function getUserPosts() {
    try {
        if (!Env.APP_URL) {
            throw new Error("APP_URL environment variable is not set");
        }

        const cookieStore = cookies();
        const res = await fetch(`${Env.APP_URL}/api/user/post`, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `Failed to fetch user posts: ${res.status}`);
        }

        const response = await res.json();
        return response?.data;
    } catch (error) {
        console.error("Error in getUserPosts:", error);
        throw error;
    }
}

export async function getUsers() {
    try {
        if (!Env.APP_URL) {
            throw new Error("APP_URL environment variable is not set");
        }

        const cookieStore = cookies();
        const res = await fetch(`${Env.APP_URL}/api/user`, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `Failed to fetch users: ${res.status}`);
        }

        const response = await res.json();
        return response?.data;
    } catch (error) {
        console.error("Error in getUsers:", error);
        throw error;
    }
}

export async function getPost(id: Number) {
    try {
        if (!Env.APP_URL) {
            throw new Error("APP_URL environment variable is not set");
        }

        const cookieStore = cookies();
        const res = await fetch(`${Env.APP_URL}/api/post/${id}`, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `Failed to fetch post: ${res.status}`);
        }

        const response = await res.json();
        return response?.data;
    } catch (error) {
        throw error;
    }
}

export async function getUserComment() {
    try {
        if (!Env.APP_URL) {
            throw new Error("APP_URL environment variable is not set");
        }

        const cookieStore = cookies();
        const res = await fetch(`${Env.APP_URL}/api/user/comment`, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `Failed to fetch user comments: ${res.status}`);
        }

        const response = await res.json();
        return response?.data;
    } catch (error) {
        console.error("Error in getUserComment:", error);
        throw error;
    }
}

export async function getShowUser(id: number) {
    try {
        if (!Env.APP_URL) {
            throw new Error("APP_URL environment variable is not set");
        }

        const cookieStore = cookies();
        const res = await fetch(`${Env.APP_URL}/api/user/${id}`, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `Failed to fetch user: ${res.status}`);
        }

        const response = await res.json();
        return response?.data;
    } catch (error) {
        console.error("Error in getShowUser:", error);
        throw error;
    }
}

export async function getNotification() {
    try {
        if (!Env.APP_URL) {
            throw new Error("APP_URL environment variable is not set");
        }

        const cookieStore = cookies();
        const res = await fetch(`${Env.APP_URL}/api/notification`, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `Failed to fetch notifications: ${res.status}`);
        }

        const response = await res.json();
        return response?.data;
    } catch (error) {
        console.error("Error in getNotification:", error);
        throw error;
    }
}

export async function getSearchUsers(query: string) {
    try {
        if (!Env.APP_URL) {
            throw new Error("APP_URL environment variable is not set");
        }

        const cookieStore = cookies();
        const res = await fetch(`${Env.APP_URL}/api/explore?query=${query}`, {
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `Failed to search users: ${res.status}`);
        }

        const response = await res.json();
        return response?.data;
    } catch (error) {
        console.error("Error in getSearchUsers:", error);
        throw error;
    }
}

"use server"; 
import { cookies } from 'next/headers';

export async function getAuth() {
    const cookieStore = cookies();
    const auth = cookieStore.get('auth');
    return auth ? auth.value : null; 
}

export async function setAuth(token: string) {
    console.log("token", token);
    cookies().set('auth', token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000), 
        secure: true, 
        httpOnly: true, 
    });
}
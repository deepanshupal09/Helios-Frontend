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
export async function getSignupCookie() {
    const cookieStore = cookies();
    const signup = cookieStore.get('signup');
    return signup ? signup.value : null; 
}

export async function setSignupCookie() {
    cookies().set('signup', 'true', {
        expires: new Date(Date.now() + 20 * 60 * 1000), 
        secure: true,
    });
}
export async function deleteAuth() {
    cookies().set('auth', '', {
        expires: new Date(Date.now() - 1 * 60 * 60 * 1000), 
        secure: true,
    });
}
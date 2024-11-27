"use server";
import { setAuth } from './cookie';

export async function loginUser(body: { email: string; password: string }) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
    }
    return await res.json(); 
}
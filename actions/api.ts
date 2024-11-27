"use server";
import { setAuth } from './cookie';

export const loginUser = async (email: string, password: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "email": email,
            "password": password,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
    }
    return await res.json();
};

export async function signupUser(body: { email: string; password: string, provider_id:string,name:string,battery:string,battery_capacity:string, phone:string}) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Signup failed');
    }

    return await res.json();
}
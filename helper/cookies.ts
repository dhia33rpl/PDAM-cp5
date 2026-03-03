"use server"; // menandakan bahwa function di file ini dijalankan di sisi server 
import { cookies } from "next/headers";

export async function storeCookie(key: string, value: string) {
    (await cookies()).set(key, value, {httpOnly: true, sameSite:`strict`, maxAge: 60 * 60 *24});
}

export async function getCookie(key: string) {
    return (await cookies()).get(key)?.value || ""
}

export async function deleteCookie(key: string) {
    (await cookies()).delete(key)
}
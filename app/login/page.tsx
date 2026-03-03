"use client"; // file ini akan di jalankan di sisi client (browser)

import { storeCookie } from "@/helper/cookies";
import { url } from "inspector/promises";
import { useRouter } from "next/dist/client/components/navigation";
import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { toast, ToastContainer } from "react-toastify/unstyled";

type ResponseLogin = {
  success: boolean;
  message: string;
  token?: string;
  role?: string;
};

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); //hook untuk navigasi antar halaman
  const [pending, startTransition] = useTransition();
  /**startTransition untuk beralih proses client ke proses server(client side -> server side),
   * panding ststus dari proses peralihan, jika nilainya true makan proses peralihan sedang berlangsung
   * jika false proses peralihan berakhir
   */
  async function handleLogin(e: FormEvent) {
    try {
      e.preventDefault();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;
      const requestData = { username, password };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        },
      });

      const responeData: ResponseLogin = await response.json();
      if (!response.ok) {
        //rspon ok => code 200,201,204
        const message = responeData.message;
        toast.error(message, { containerId: "toast-login" });
      }
      //login success
      if (responeData.success) {
        const message = responeData.message;
        toast.success(message, { containerId: "toast-login" });
        const token = responeData?.token || ""; //|| dibaca or
        startTransition(async function () {
          await storeCookie(`token`, token); //menyimpan token di cookie
        });

        const role = responeData?.role || "";
        if (role === "ADMIN") {
          setInterval(() => router.replace(`/admin/profile`), 1000); //redirect ke halaman admin/profile
        }
        if (role === "CUSTOMER") {
          setInterval(() => router.replace(`/customer/profile`), 1000); //redirect ke halaman customer/profile
        }

      } else {
        const message = responeData.message;
        toast.warning(message, { containerId: "toast-login" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-dvh bg-blue-300 flex justify-center items-center">
      <ToastContainer containerId={"toast-login"} />
      <div className="bg-white text-gray-700 rounded-2xl w-full md:w-1/2 lg:w-1/3 p-5">
        <h1 className="font-bold text-2xl text-center text-gray-700 p-2">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-5 border rounded-full mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-5 border rounded-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-5 border rounded-full text-center text-gray-700 font-bold bg-blue-500 cursor-pointer hover:bg-blue-600"
          >
            Login
          </button>
          <div className="flex justify-center mt-2">
            <a href="dashboard"></a>
          </div>
          <a>Don't have an account yet?</a>
          <a href="/register" className="text-blue-500 underline p-2">
            Register
          </a>
        </form>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhoneNumber] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); //tambah logika pendaftaran disini
    try {
      //prepare request data
      const request = {
        username,
        password,
        name,
        phone,
      };
      //prepare url address
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admins`;
      //send request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        // != not
        alert("Failed to register");
      }
      const responseData = await response.json();
      const message = responseData.message || "Register successful";
      alert(message); //menandakan requestnya berhasil
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
  return (
    <div className="w-full h-dvh flex bg-blue-300 justify-center items-center">
      <div className="bg-slate-100 text-gray-700 rounded-2xl w-full md:w-1/2 lg:w-1/3 p-5">
        <h1 className="font-bold text-2xl text-center p-2">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-5 border rounded-full mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required //wajib diisi gaboleh kosong
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-5 border rounded-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full p-5 border rounded-full mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-5 border rounded-full mb-4"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-5 border rounded-full text-center text-white font-bold bg-blue-500 cursor-pointer hover:bg-blue-600"
          >
            register
          </button>
          <div className="flex justify-center items-center mt-2"></div>
          <a href="/login" className="text-blue-500 underline p-2">
            have an account
          </a>
        </form>
      </div>
    </div>
  );
}

"use client";

import { getCookie } from "@/helper/cookies";
import { useRouter } from "next/dist/client/components/navigation";
import { FormEvent, useState, useTransition } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify/unstyled";

export default function AddServiceForm() {
  const [name, setName] = useState<string>("");
  const [min_usage, setMinUsage] = useState<number>(0); //inisial value adalah nilai awal
  const [max_usage, setMaxUsage] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  /**create function to send data to BE */
  async function handleSave(event: FormEvent) {
    try {
      event.preventDefault();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services`;
      const requestData = { name, min_usage, max_usage, price };
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getCookie(`token`)}`,
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        },
      });
      const responData = await response.json();
      if (!response.ok) {
        toast.warning(responData?.message, { containerId: `toastAddService` });
        return;
      }
      toast.success(responData?.message, { containerId: `toastAddService` });

      setInterval(() => router.replace(`/admin/services`), 1000);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to add service`, { containerId: `toastAddService` });
    }
  }
  return (
    <form onSubmit={handleSave}>
      <ToastContainer containerId={`toastAddService`} />
      <div className="my-2 flex flex-col">
        <small className="font-semibold text-sky-500">Name of Service</small>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="my-2 flex flex-col">
        <small className="font-semibold text-sky-500">Minimun Usage</small>
        <input
          type="number"
          id="min_usage"
          value={min_usage.toString()}
          onChange={(e) => setMinUsage(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="my-2 flex flex-col">
        <small className="font-semibold text-sky-500">Maximal Usage</small>
        <input
          type="number"
          id="max_usage"
          value={max_usage.toString()}
          onChange={(e) => setMaxUsage(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="my-2 flex flex-col">
        <small className="font-semibold text-sky-500">Price</small>
        <input
          type="number"
          id="price"
          value={price.toString()}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-sky-50 text-sky-500 px-3 py-1 rounded  cursor-pointer"
      >
        Create Service
      </button>
    </form>
  );
}

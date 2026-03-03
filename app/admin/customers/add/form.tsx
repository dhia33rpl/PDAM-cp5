"use client";

import { getCookie } from "@/helper/cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCustomerForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [customerNumber, setCustomerNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [serviceId, setServiceId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const router = useRouter();

  async function handleSave(e: FormEvent) {
    e.preventDefault();

    if (
      !username ||
      !password ||
      !customerNumber ||
      !address ||
      !serviceId ||
      !name ||
      !phone
    ) {
      toast.warning("Semua field wajib diisi", {
        containerId: "toastAddCustomer",
      });
      return;
    }

    try {
      const token = await getCookie("token");
      if (!token) {
        toast.error("Token tidak ditemukan, silakan login ulang", {
          containerId: "toastAddCustomer",
        });
        return;
      }
      console.log(
        JSON.stringify({
          username,
          password,
          customer_number: customerNumber,
          address,
          service_id: serviceId,
          name,
          phone,
        }),
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
          },
          body: JSON.stringify({
            username,
            password,
            customer_number: customerNumber,
            address,
            service_id: serviceId,
            name,
            phone,
          }),
        },
      );

      const result = await response.json();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", result);

      if (!response.ok) {
        toast.warning(result?.message || "Gagal menambahkan customer", {
          containerId: "toastAddCustomer",
        });
        return;
      }

      toast.success("Customer berhasil ditambahkan", {
        containerId: "toastAddCustomer",
      });

      setTimeout(() => {
        router.replace("/admin/customers");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan server", {
        containerId: "toastAddCustomer",
      });
    }
  }

  return (
    <form onSubmit={handleSave} className="max-w-lg">
      <ToastContainer containerId="toastAddCustomer" />
      <small className="font-semibold text-sky-500">Username of Customer</small>
      <input
        type="text"
        id="name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border rounded p-2"
      />
      <small className="font-semibold text-sky-500">Password</small>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded p-2"
      />
      <small className="font-semibold text-sky-500">Customer Number</small>
      <input
        type="text"
        id="customer_number"
        value={customerNumber}
        onChange={(e) => setCustomerNumber(e.target.value)}
        className="w-full border rounded p-2"
      />
      <small className="font-semibold text-sky-500">Name</small>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded p-2"
      />
      <small className="font-semibold text-sky-500">Phone</small>
      <input
        type="text"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded p-2"
      />
      <small className="font-semibold text-sky-500">Address</small>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border rounded p-2"
      />

      <div className="my-2 flex flex-col">
        <label className="font-semibold text-sky-500">Service ID</label>
        <input
          type="number"
          value={serviceId}
          onChange={(e) => setServiceId(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
      >
        Create Customer
      </button>
    </form>
  );
}

/** helper input component */
function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="my-2 flex flex-col">
      <label className="font-semibold text-sky-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded p-2"
      />
    </div>
  );
}

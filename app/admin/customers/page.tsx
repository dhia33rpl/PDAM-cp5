import { getCookie } from "@/helper/cookies";
import CustomerCard from "./card-customers";
import Link from "next/link";

export interface CustomerResponse {
  success: boolean;
  message: string;
  data: CustomerType[];
}

export interface CustomerType {
  id: number;
  user_id: number;
  customer_number: string;
  name: string;
  phone: string;
  address: string;
  service_id: number;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}

async function getCustomers(): Promise<CustomerResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customers`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        authorization: `Bearer ${await getCookie("token")}`,
      },
      cache: "no-store",
    });

    const data: CustomerResponse = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message, data: [] };
    }

    return data;
  } catch {
    return {
      success: false,
      message: "Failed to fetch customers",
      data: [],
    };
  }
}

export default async function AdminCustomersPage() {
  const { success, message, data } = await getCustomers();

  if (!success) {
    return <div className="p-5 text-red-500">{message}</div>;
  }

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold">Customer Data</h1>
      <p className="text-sm text-slate-500">
        This page display list of our customer in PDAM
      </p>
      <Link href="/admin/customers/add" className="my-3">
        <button
          type="button"
          className="bg-green-50 text-green-500 border border-green-500 px-3 py-1 rounded my-5 cursor-pointer"
        >
          Add New Customer
        </button>
      </Link>

      {data.length === 0 ? (
        <div className="bg-sky-50 p-4 rounded font-semibold">
          No customer data
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="w-full border rounded-md bg-sky-100">
            <div className="grid grid-cols-4 px-4 py-3 font-semibold">
              <div>Name</div>
              <div>Phone</div>
              <div>Address</div>
              <div>Action</div>
            </div>
          </div>

          {data.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}
    </div>
  );
}

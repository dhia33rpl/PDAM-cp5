import { getCookie } from "@/helper/cookies";
import CardService from "./card-service";
import Link from "next/link";

export interface ServiceResponse {
  success: boolean; //true or false
  message: string;
  data: ServiceType[]; //[]artinya array, bisa lebih dari 1 trs typenya list
  count: number;
}

export interface ServiceType {
  id: number;
  name: string;
  min_usage: number;
  max_usage: number;
  price: number;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}

/**create function to get all data service from BE */
async function getServices(): Promise<ServiceResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services`;
    const respone = await fetch(url, {
      method: "GET",
      headers: {
        "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        authorization: `Bearer ${await getCookie("token")}`,
      },
      cache: "no-store",
    });
    // convert data respone to json
    const responeData: ServiceResponse = await respone.json();
    if (!respone.ok) {
      return {
        success: false,
        message: responeData.message,
        data: [],
        count: 0,
      };
    }
    return responeData;
  } catch (error) {
    console.log(error);
    
    return {
      success: false,
      message: "Failed to get services",
      data: [],
      count: 0,
    };
  }
}

export default async function AdminServicesPage() {
  const { success, message, data, count } = await getServices();

  if (!success) {
    return <div className="w-full p-5">Soryy {message}</div>;
  }

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold">Service Data to PDAM</h1>
      <p className="text-sm text-slate-500">
        This page display list of our service in PDAM
      </p>
      <Link
        href="/admin/services/add"
        className="my-3"
      >
        <button type="button" className="bg-green-50 text-green-500 border border-green-500 px-3 py-1 rounded my-5 cursor-pointer">
            Add New Service
        </button>
      </Link>

      {count == 0 ? (
        <div className="w-full rounded p-5 bg-yellow-500 font-semibold">
          There are no data to display
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 items-start justify-center">
          {
            // show list of service
            data.map((service) => (
              <CardService key={`keyService-${service.id}`} service={service} />
            ))
          }
        </div>
      )}
    </div>
  );
}

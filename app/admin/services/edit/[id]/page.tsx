import { getCookie } from "@/helper/cookies";
import Link from "next/link";
import FormEditService from "./form";

export interface ServiceResponse {
  success: boolean;
  message: string;
  data: Service;
}

export interface Service {
  id: number;
  name: string;
  min_usage: number;
  max_usage: number;
  price: number;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}

/**membuat funtion untuk mendapatkan service bedasarkan id yang di tentukan */
async function getServiceById(id: string): Promise<Service | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${id}`;
    const response = await fetch(url, {
      method: `GET`,
      headers: {
        Authorization: `Bearer ${await getCookie("token")}`,
        "App-key": process.env.NEXT_PUBLIC_APP_KEY || "",
      },
    });

    const responseBody: ServiceResponse = await response.json();
    if (!response.ok) {
      return null;
    }
    return responseBody.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

type PageProp = {
  params: Promise<{
    id: string; /**define parameter URL that sent id as name of data, mengirimkan sebuah data dinamain id */
  }>;
};
export const dynamic = "force-dynamic";
export default async function EditServicePage(props: PageProp) {
  /**grab value of ID that sent to URL parameter,mengambil nilai ID */
  const id = (await props.params).id;
  /**grab data services from BE based on selected "id" */
  const selectedService = await getServiceById(id);
  if (selectedService === null) {
    return (
      <div className="w-full p-5">
        <p className="p-3 bg-yellow-50 rounded">
          Sorry, service data id {id} does not exists
        </p>
      </div>
    );
  }
  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold">Edit Service</h1>
      <p className="text-sm text-slate-500">
        This page use to update selected service, ensure you data is completed
      </p>
      <div className="my-5 text-slate-600 font-semibold flex flex-wrap items-center gap-3">
        <Link href={"/admin/services"}>
            Services
        </Link>
        <div>&gt;</div> 
        Edit {selectedService.name}
      </div>

      <FormEditService service={selectedService}></FormEditService>
    </div>
  );
}


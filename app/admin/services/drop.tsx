"use client";

import { getCookie } from "@/helper/cookies";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  id: number;
};
export default function DropService(props: Props) {
    const router = useRouter()
  /** create function to handle delete service */
  async function deleteService() {
    try {
      if (!window.confirm("Are you sure you want to delete this service?")) {
        return; //untuk menghentikan proses yang sedang berjlan
      }
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${props.id}`;
      const response = await fetch(url, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${await getCookie(`token`)}`,
          "app-key": process.env.NEXT_PUBLIC_APP_KEY || "",
        },
      });
      const responseData = await response.json()
      if(!response.ok){
        toast.error(responseData?.message || "", { containerId:  `toastDeleteServie${props.id}`})
        return; //untuk menghentikan proses yang sedang berjlan
      }
      toast.success(responseData?.message || "", {containerId: `toastDeleteServise${props.id}`})
      setTimeout(() => router.refresh(), 1000.)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <ToastContainer containerId={`toastDeleteService${props.id}`} />
        <button
        type="button" 
        onClick={() => deleteService()}
        className="px-3 py-1 text-sm bg-red-500 rounded text-white">
            Remove
        </button>   
    </div>
  )
}
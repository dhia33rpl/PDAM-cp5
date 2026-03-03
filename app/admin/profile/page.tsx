import { getCookie } from "@/helper/cookies";

export interface AdminProfile {
  success: boolean;
  message: string;
  data: Admin;
}

export interface Admin {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  owner_token: string;
  createdAt: string;
  updatedAt: string;
}
/**function ini di pakai untuk mendapatkan data profile admin dri back end */
async function getAdminProfile(): Promise<Admin | null> {
  // prommise itu type nya bisa gagal bisa berhasil
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admins/me`;
    const respone = await fetch(url, {
      method: "GET",
      headers: {
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY || "",
        Authorization: `Bearer ${await getCookie(`token`)}`,
      },
    });

    //  ambil data responenya
    const responeData: AdminProfile = await respone.json();

    if (!respone.ok) {
      console.log(responeData.message);
      return null; //jika gagal maka null (kosong)
    }

    return responeData.data;
  } catch (error) {
    console.log(error);
    return null; //jika gagal maka null (kosong) catch menanganni jika ada error pada blok try
  }
}
export default async function AdminProfilePage() {
  const adminData = await getAdminProfile();
  if (adminData === null) {
    return;
    <h1 className="w-full p-5">Sorry admin data does not exists</h1>;
  }

  return (
    <div className="w-full h-dvh p-5 bg-sky-50 rounded">
      <h1 className="font-bold text-sky-500 text-xl">Admin Profile</h1>
      <table>
        <tbody>
          <tr>
            <td className="p-2">Name</td>
            <td className="p-2">{adminData.name}</td>
          </tr>
          <tr>
            <td className="p-2">Username</td>
            <td className="p-2">{adminData.user.username}</td>
          </tr>
          <tr>
            <td className="p-2">Phone</td>
            <td className="p-2">{adminData.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

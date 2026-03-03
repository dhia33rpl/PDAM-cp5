import Link from "next/dist/client/link";
import { CustomerType } from "./page";

type Props = {
  customer: CustomerType;
};

export default function CustomerCard({ customer }: Props) {
  return (
    <div className="w-full border rounded-md bg-white">
      <div className="grid grid-cols-4 px-4 py-3 items-center">
        <div className="font-medium">{customer.name}</div>

        <div className="text-slate-600">{customer.phone}</div>

        <div className="text-slate-600">{customer.address}</div>

        <div className="text-slate-400 italic">-</div>
      </div>
      <div className="my-3 gap-2">
        <Link href={`/admin/customers/edit/${customer.id}`}>
          <button type="button" className="bg-sky-500 text-white rounded px-4 py-1 text-sm">
            Edit
          </button>
        </Link>
        </div>
    </div>
  );
}

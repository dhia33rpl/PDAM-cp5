import Link from "next/link";
import { ServiceType } from "./page";
import DropService from "./drop";

type Props = {
    service: ServiceType
}
export default function CardService(props: Props) {
  return (
    <div className="w-full md:max-w-92 p-5 rounded shadow bg-sky-200">
      <div className="flex flex-col gap-x-7">
        <strong>{props.service.name}</strong>
        <div className="bg-slate-400 w-fit text-white rounded px-3 py-1 text-sm">
          Rp {props.service.price}
        </div>
      </div>
      <div className=" my-4 flex justify-between items-center">
        <div className="bg-slate-400 text-white text-sm font-medium px-3 py-1 rounded">
          Min.Ussage: {props.service.min_usage}
        </div>
        <div className="bg-slate-400 text-white text-sm font-medium px-3 py-1 rounded">
          Max.Usage: {props.service.max_usage}
        </div>
      </div>
      <div className="my-3 flex gap-2 items-center">
        <Link href={`/admin/services/edit/${props.service.id}`}>
          <button type="button" className="bg-sky-500 text-white rounded px-4 py-1 text-sm">
            Edit
          </button>
        </Link>
        <DropService id={props.service.id} />
      </div>
    </div>
  );
}

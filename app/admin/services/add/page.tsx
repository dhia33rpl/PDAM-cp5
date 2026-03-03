import AddServiceForm from "./form";

export default function AdminServicesPage() {
  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold">
        Add New Service
      </h1>
      <p className="text-slate-500">
        This page is to add a new service.
      </p>
      <AddServiceForm />
    </div>
  );
}

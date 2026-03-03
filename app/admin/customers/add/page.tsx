import AddCustomerForm from "./form";

export default function AdminCustomerPage() {
  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold">
        Add New Customer
      </h1>
      <p className="text-slate-500">
        This page is to add a new Customer.
      </p>
      <AddCustomerForm />
    </div>
  );
}

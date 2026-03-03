"use client";

import { Children, useState } from "react";
import Link from "next/link";

interface AdminSidebarProps {
  children?: React.ReactNode;
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:flex block">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-sky-200 text-white p-4">
        <span className="font-bold">Admin Panel</span>
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-sky-200 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          md:relative fixed min-h-screen z-50 top-0 left-0 h-full w-64 bg-sky-200 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4 text-lg font-bold border-b text-gray-700   border-gray-700">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="block p-2 rounded text-gray-700 hover:bg-gray-700 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/profile"
            className="block p-2 rounded text-gray-700 hover:bg-gray-700 hover:text-white"
          >
            Profile
          </Link>
          <Link
            href="/admin/services"
            className="block p-2 rounded text-gray-700 hover:bg-gray-700 hover:text-white"
          >
            Services
          </Link>
          <Link
            href="/admin/customers"
            className="block p-2 rounded text-gray-700 hover:bg-gray-700 hover:text-white"
          >
            Customer
          </Link>
        </nav>
      </aside>
      <div className="w-full"> {children}</div>
    </div>
  );
}

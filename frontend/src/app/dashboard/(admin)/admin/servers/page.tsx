"use client";

import { Power, Trash2, Settings } from "lucide-react";
import AdminSidebar from "../../components/Sidebar";

const servers = [
  {
    id: "srv-001",
    name: "Web Server",
    status: "Running",
    cpu: "45% / 100%",
    ram: "3.2GB / 8GB",
    storage: "120GB / 200GB",
  },
  {
    id: "srv-002",
    name: "Database Server",
    status: "Offline",
    cpu: "N/A / 50%",
    ram: "N/A / 8GB",
    storage: "250GB / 500GB",
  },
  {
    id: "srv-003",
    name: "Application Server",
    status: "Running",
    cpu: "60% / 100%",
    ram: "5GB / 16GB",
    storage: "180GB / 256GB",
  },
];

export default function AdminServers() {
  return (
    <div className="flex min-h-screen text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 mt-16 md:mt-0">
        <section className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Manage Servers</h2>
          <p className="opacity-80 mt-2 text-lg">
            View and control all hosted servers.
          </p>
        </section>

        <div className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Server Overview</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary-a20/40">
                <th className="p-3">Server Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">CPU Usage</th>
                <th className="p-3">RAM</th>
                <th className="p-3">Storage</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server) => (
                <tr key={server.id} className="border-b border-primary-a20/40 hover:bg-primary-a10/20 transition">
                  <td className="p-3 font-medium">{server.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        server.status === "Running"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {server.status}
                    </span>
                  </td>
                  <td className="p-3">{server.cpu}</td>
                  <td className="p-3">{server.ram}</td>
                  <td className="p-3">{server.storage}</td>
                  <td className="p-3 flex justify-end gap-2">
                    <button className="p-2 bg-primary-a20/20 text-primary-a50 rounded-md hover:bg-yellow-500/20 transition">
                      <Power size={18} />
                    </button>
                    <button className="p-2 bg-primary-a20/20 text-primary-a50 rounded-md hover:bg-blue-500/20 transition">
                      <Settings size={18} />
                    </button>
                    <button className="p-2 bg-primary-a20/20 text-primary-a50 rounded-md hover:bg-red-500/20 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

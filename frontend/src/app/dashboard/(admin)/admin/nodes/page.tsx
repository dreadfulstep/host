"use client";

import { Server, HardDrive, Cpu, MemoryStick, Gauge, Settings, Trash2, Power } from "lucide-react";
import AdminSidebar from "../../components/Sidebar";

const nodes = [
  {
    id: "node-001",
    name: "Node Alpha",
    status: "Active",
    cpuUsage: "55%",
    memoryUsage: "12GB / 32GB",
    storageUsage: "500GB / 1TB",
    serverCount: 10,
  },
  {
    id: "node-002",
    name: "Node Beta",
    status: "Active",
    cpuUsage: "72%",
    memoryUsage: "24GB / 64GB",
    storageUsage: "800GB / 2TB",
    serverCount: 18,
  },
  {
    id: "node-003",
    name: "Node Gamma",
    status: "Maintenance",
    cpuUsage: "N/A",
    memoryUsage: "N/A",
    storageUsage: "N/A",
    serverCount: 0,
  },
];

export default function AdminNodes() {
  return (
    <div className="flex min-h-screen text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 mt-16 md:mt-0">
        <section className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Manage Nodes</h2>
          <p className="opacity-80 mt-2 text-lg">
            View and monitor all nodes running Docker containers.
          </p>
        </section>

        <div className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Nodes Overview</h3>
          <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-primary-a20/40">
                <th className="p-3 text-left w-[15%]">Node Name</th>
                <th className="p-3 text-left w-[10%]">Status</th>
                <th className="p-3 text-left w-[15%]">CPU Usage</th>
                <th className="p-3 text-left w-[20%]">Memory</th>
                <th className="p-3 text-left w-[20%]">Storage</th>
                <th className="p-3 text-left w-[10%]">Server Count</th>
                <th className="p-3 text-right w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node) => (
                <tr key={node.id} className="border-b border-primary-a20/40 hover:bg-primary-a10/20 transition">
                  <td className="p-3 font-medium">{node.name}</td>
                  <td className="p-3">
                  <span className={`px-2 py-1 rounded-md text-sm ${
                    node.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                    {node.status}
                    </span>
                  </td>
                  <td className="p-3">{node.cpuUsage}</td>
                  <td className="p-3">{node.memoryUsage}</td>
                  <td className="p-3">{node.storageUsage}</td>
                  <td className="p-3">{node.serverCount}</td>
                  <td className="p-3 flex justify-end gap-2">
                    <button className="p-2 bg-primary-a20/20 text-primary-a50 rounded-md hover:bg-blue-500/20 transition">
                      <Settings size={18} />
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

"use client";

import { Cpu, MemoryStick, HardDrive, Server, Settings } from "lucide-react";
import AdminSidebar from "../../../components/Sidebar";
import { useParams } from "next/navigation";
import NodeSidebar from "./components/Sidebar";

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

export default function NodeDetails() {
  const { nodeId } = useParams();

  const node = nodes.find((n) => n.id === nodeId);

  if (!node) {
    return (
      <div className="flex min-h-screen text-white">
        <AdminSidebar />
        <main className="flex-1 p-6 mt-16 md:mt-0">
          <h2 className="text-4xl font-bold tracking-tight">Node Not Found</h2>
          <p className="opacity-80 mt-2 text-lg">The node you are looking for does not exist.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen text-white">
      <NodeSidebar />

      <main className="flex-1 p-6 mt-16 md:mt-0">
        <section className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Node: {node.name}</h2>
          <p className="opacity-80 mt-2 text-lg">View and manage the details of this node.</p>
        </section>

        <div className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Node Overview</h3>
          <table className="w-full min-w-full table-auto">
            <thead>
              <tr className="border-b border-primary-a20/40">
                <th className="p-3 text-left">Attribute</th>
                <th className="p-3 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-primary-a20/40">
                <td className="p-3 font-medium">Status</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-md text-sm ${
                      node.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {node.status}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-primary-a20/40">
                <td className="p-3 font-medium">CPU Usage</td>
                <td className="p-3 flex items-center gap-2">
                  <Cpu size={16} />
                  {node.cpuUsage}
                </td>
              </tr>
              <tr className="border-b border-primary-a20/40">
                <td className="p-3 font-medium">Memory Usage</td>
                <td className="p-3 flex items-center gap-2">
                  <MemoryStick size={16} />
                  {node.memoryUsage}
                </td>
              </tr>
              <tr className="border-b border-primary-a20/40">
                <td className="p-3 font-medium">Storage Usage</td>
                <td className="p-3 flex items-center gap-2">
                  <HardDrive size={16} />
                  {node.storageUsage}
                </td>
              </tr>
              <tr className="border-b border-primary-a20/40">
                <td className="p-3 font-medium">Server Count</td>
                <td className="p-3 flex items-center gap-2">
                  <Server size={16} />
                  {node.serverCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Actions</h3>
          <div className="flex gap-4">
            <button className="p-3 bg-green-500/20 text-green-400 rounded-md hover:bg-green-500/30 transition">
              Start Node
            </button>
            <button className="p-3 bg-yellow-500/20 text-yellow-400 rounded-md hover:bg-yellow-500/30 transition">
              Maintenance Mode
            </button>
            <button className="p-3 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30 transition">
              Stop Node
            </button>
            <button className="p-3 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition">
              <Settings size={18} />
              Configure Node
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

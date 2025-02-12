"use client";

import { Cpu, MemoryStick, HardDrive, Server, Settings } from "lucide-react";
import AdminSidebar from "../../../components/Sidebar";
import { useParams } from "next/navigation";
import NodeSidebar from "./components/Sidebar";
import Link from "next/link";

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Status</h3>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-md text-md ${
                  node.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {node.status}
              </span>
            </div>
          </div>

          <div className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
            <h3 className="text-xl font-semibold mb-4">CPU Usage</h3>
            <div className="flex items-center gap-2">
              <Cpu size={24} className="text-primary-a50" />
              <span>{node.cpuUsage}</span>
            </div>
          </div>

          <div className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Memory Usage</h3>
            <div className="flex items-center gap-2">
              <MemoryStick size={24} className="text-primary-a50" />
              <span>{node.memoryUsage}</span>
            </div>
          </div>

          <div className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Storage Usage</h3>
            <div className="flex items-center gap-2">
              <HardDrive size={24} className="text-primary-a50" />
              <span>{node.storageUsage}</span>
            </div>
          </div>
        </div>

        <h3 className="mt-10 text-2xl font-bold">Quick Links</h3>
        <section className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href={`/dashboard/nodes/${nodeId}/servers`} className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
                <Server size={24} className="text-primary-a50" />
                <h3 className="text-xl font-semibold">Servers</h3>
            </div>
            <p className="opacity-80">Manage the servers associated with this node.</p>
            </Link>
            <Link href={`/dashboard/nodes/${nodeId}/settings`} className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
                <Settings size={24} className="text-primary-a50" />
                <h3 className="text-xl font-semibold">Settings</h3>
            </div>
            <p className="opacity-80">Configure node settings and preferences.</p>
            </Link>
            <Link href={`/dashboard/nodes/${nodeId}/cpu`} className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
                <Cpu size={24} className="text-primary-a50" />
                <h3 className="text-xl font-semibold">Console</h3>
            </div>
            <p className="opacity-80">Monitor the logs of this node.</p>
            </Link>
            <Link href={`/dashboard/nodes/${nodeId}/memory`} className="bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
                <MemoryStick size={24} className="text-primary-a50" />
                <h3 className="text-xl font-semibold">Memory Usage</h3>
            </div>
            <p className="opacity-80">Check the memory usage statistics.</p>
            </Link>
        </section>
      </main>
    </div>
  );
}

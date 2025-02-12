"use client";

import { Cpu, MemoryStick, HardDrive, Settings } from "lucide-react";
import { useParams } from "next/navigation";
import NodeSidebar from "../components/Sidebar";
import { useState } from "react";
import Link from "next/link";

const nodes = [
  {
    id: "node-001",
    name: "Node Alpha",
    status: "Active",
    serverCount: 10,
    servers: [
      { id: "server-001", cpuUsage: "45%", memoryUsage: "8GB / 16GB", storageUsage: "200GB / 500GB" },
      { id: "server-002", cpuUsage: "65%", memoryUsage: "10GB / 16GB", storageUsage: "300GB / 500GB" },
      { id: "server-003", cpuUsage: "50%", memoryUsage: "6GB / 16GB", storageUsage: "150GB / 500GB" },
      { id: "server-004", cpuUsage: "80%", memoryUsage: "12GB / 16GB", storageUsage: "400GB / 500GB" },
      { id: "server-005", cpuUsage: "60%", memoryUsage: "10GB / 16GB", storageUsage: "250GB / 500GB" },
      { id: "server-006", cpuUsage: "70%", memoryUsage: "8GB / 16GB", storageUsage: "300GB / 500GB" },
      { id: "server-007", cpuUsage: "40%", memoryUsage: "7GB / 16GB", storageUsage: "180GB / 500GB" },
      { id: "server-008", cpuUsage: "55%", memoryUsage: "9GB / 16GB", storageUsage: "220GB / 500GB" },
      { id: "server-009", cpuUsage: "65%", memoryUsage: "11GB / 16GB", storageUsage: "320GB / 500GB" },
      { id: "server-010", cpuUsage: "75%", memoryUsage: "10GB / 16GB", storageUsage: "350GB / 500GB" },
    ],
  },
];

export default function ServersPage() {
  const { nodeId } = useParams();
  const node = nodes.find((n) => n.id === nodeId);

  const [currentPage, setCurrentPage] = useState(1);
  const serversPerPage = 10;

  if (!node) {
    return (
      <div className="flex min-h-screen text-white">
        <NodeSidebar />
        <main className="flex-1 p-6 mt-16 md:mt-0">
          <h2 className="text-4xl font-bold tracking-tight">Node Not Found</h2>
          <p className="opacity-80 mt-2 text-lg">The node you are looking for does not exist.</p>
        </main>
      </div>
    );
  }

  const indexOfLastServer = currentPage * serversPerPage;
  const indexOfFirstServer = indexOfLastServer - serversPerPage;
  const currentServers = node.servers.slice(indexOfFirstServer, indexOfLastServer);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen text-white">
      <NodeSidebar />

      <main className="flex-1 p-6 mt-16 md:mt-0">
        <section className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Servers for Node: {node.name}</h2>
          <p className="opacity-80 mt-2 text-lg">Manage and view details for the servers on this node.</p>
        </section>

        {/* Servers Table */}
        <div className="overflow-x-auto bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
          <table className="w-full min-w-full table-auto">
            <thead>
              <tr className="border-b border-primary-a20/40">
                <th className="p-3 text-left">Server ID</th>
                <th className="p-3 text-left">CPU Usage</th>
                <th className="p-3 text-left">Memory Usage</th>
                <th className="p-3 text-left">Storage Usage</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentServers.map((server) => (
                <tr key={server.id} className="border-b border-primary-a20/40">
                  <td className="p-3 font-medium">{server.id}</td>
                  <td className="p-3">
                    <Cpu size={16} className="inline-block mr-2" />
                    {server.cpuUsage}
                  </td>
                  <td className="p-3">
                    <MemoryStick size={16} className="inline-block mr-2" />
                    {server.memoryUsage}
                  </td>
                  <td className="p-3">
                    <HardDrive size={16} className="inline-block mr-2" />
                    {server.storageUsage}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/dashboard/admin/servers/${server.id}`}
                    >
                        <button className="p-2 bg-primary-a20/20 text-primary-a50 rounded-md hover:bg-blue-500/20 transition">
                        <Settings size={18} />
                        </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="p-2 bg-primary-a0/10 text-primary-a50 rounded-md hover:bg-primary-a20/20 transition"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="mx-4 text-lg flex items-center">{`Page ${currentPage}`}</span>
          <button
            className="p-2 bg-primary-a0/10 text-primary-a50 rounded-md hover:bg-primary-a20/20 transition"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastServer >= node.servers.length}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

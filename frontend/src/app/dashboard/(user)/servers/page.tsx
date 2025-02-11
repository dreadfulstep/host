"use client";

import Sidebar from "../components/Sidebar";
import { Server, Play, StopCircle, Settings, Dot } from "lucide-react";

export default function ServersPage() {
  const servers = [
    {
      name: "Minecraft Server",
      status: 1, // 1 = Running, 0 = Stopped
      ip: "192.168.1.10",
      cpu: 28.3,
      memory: 512.4, // In MB
    },
    {
      name: "Web Hosting",
      status: 0,
      ip: "192.168.1.11",
      cpu: 0,
      memory: 0,
    },
    {
      name: "Database Server",
      status: 1,
      ip: "192.168.1.12",
      cpu: 40.7,
      memory: 1024.2,
    },
  ];

  return (
    <div className="flex min-h-screen text-white">
      <Sidebar />

      <main className="flex-1 p-6 mt-16 md:mt-0">
        <h2 className="text-4xl font-bold tracking-tight">Your Servers</h2>
        <p className="opacity-80 mt-2 text-lg">Manage your hosted services.</p>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server, index) => (
            <div
              key={index}
              className="p-6 border border-primary-a10/40 rounded-lg shadow-md backdrop-blur-md flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Server size={24} className="text-primary-a30" />
                  <h3 className="text-lg font-semibold">{server.name}</h3>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    server.status ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <Dot size={20} /> {server.status ? "Running" : "Stopped"}
                </div>
              </div>

              <p className="text-sm opacity-70">IP: {server.ip}</p>

              <div className="space-x-5 flex-row flex">
                <div>
                  <p className="text-sm opacity-80">CPU Usage</p>
                  <p className="text-md font-semibold">{server.cpu}%</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Memory Usage</p>
                  <p className="text-md font-semibold">{server.memory}MB</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                {server.status ? (
                  <button className="flex items-center gap-2 px-4 py-2 border border-primary-a30 rounded-lg text-primary-a30 hover:bg-primary-a30/10 transition">
                    <StopCircle size={18} /> Stop
                  </button>
                ) : (
                  <button className="flex items-center gap-2 px-4 py-2 border border-primary-a30 rounded-lg text-primary-a30 hover:bg-primary-a30/10 transition">
                    <Play size={18} /> Start
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 border border-primary-a30 rounded-lg text-primary-a30 hover:bg-primary-a30/10 transition">
                  <Settings size={18} /> Manage
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

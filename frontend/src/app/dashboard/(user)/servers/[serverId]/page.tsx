"use client";

import { useParams } from "next/navigation";
import ServerSidebar from "./components/ServerSidebar";

export default function ServerPage() {
  const { serverId } = useParams() ?? { serverId: '' };

  return (
    <div className="flex min-h-screen bg-surface-a0 text-white">
      {serverId && <ServerSidebar serverId={serverId as string} />}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold">Server: {serverId}</h1>
        <p className="text-tonal-a40 mt-2">Welcome to the server dashboard.</p>

        {/* Example Content */}
        <div className="mt-6 p-4 border border-primary-a10 rounded-lg bg-tonal-a10/40">
          <p>This is where server-specific content will go.</p>
        </div>
      </main>
    </div>
  );
}

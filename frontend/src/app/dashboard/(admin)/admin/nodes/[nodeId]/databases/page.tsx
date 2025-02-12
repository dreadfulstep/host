"use client";

import { Database, Settings } from "lucide-react";
import { useParams } from "next/navigation";
import NodeSidebar from "../components/Sidebar";
import { useState } from "react";
import Link from "next/link";

const nodes = [
  {
    id: "node-001",
    name: "Node Alpha",
    status: "Active",
    databaseCount: 5,
    databases: [
      { id: "db-001", size: "20GB", status: "Running" },
      { id: "db-002", size: "50GB", status: "Running" },
      { id: "db-003", size: "10GB", status: "Stopped" },
      { id: "db-004", size: "100GB", status: "Running" },
      { id: "db-005", size: "30GB", status: "Stopped" },
    ],
  },
];

export default function DatabasesPage() {
  const { nodeId } = useParams();
  const node = nodes.find((n) => n.id === nodeId);

  const [currentPage, setCurrentPage] = useState(1);
  const databasesPerPage = 5;

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

  const indexOfLastDatabase = currentPage * databasesPerPage;
  const indexOfFirstDatabase = indexOfLastDatabase - databasesPerPage;
  const currentDatabases = node.databases.slice(indexOfFirstDatabase, indexOfLastDatabase);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen text-white">
      <NodeSidebar />

      <main className="flex-1 p-6 mt-16 md:mt-0">
        <section className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Databases for Node: {node.name}</h2>
          <p className="opacity-80 mt-2 text-lg">Manage and view details for the databases on this node.</p>
        </section>

        {/* Databases Table */}
        <div className="overflow-x-auto bg-primary-a0/10 p-6 rounded-lg border border-primary-a20/40 shadow-md">
          <table className="w-full min-w-full table-auto">
            <thead>
              <tr className="border-b border-primary-a20/40">
                <th className="p-3 text-left">Database ID</th>
                <th className="p-3 text-left">Size</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDatabases.map((db) => (
                <tr key={db.id} className="border-b border-primary-a20/40">
                  <td className="p-3 font-medium">{db.id}</td>
                  <td className="p-3">{db.size}</td>
                  <td className="p-3">
                    <span className={`
                        bg-primary-a30/20 px-2 py-1 rounded-lg
                        `}>
                        {db.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/dashboard/admin/databases/${db.id}`}
                    >
                      <button className="p-2 bg-primary-a20/20 text-primary-a50 rounded-md hover:bg-primary-a20/40 transition">
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
            disabled={indexOfLastDatabase >= node.databases.length}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

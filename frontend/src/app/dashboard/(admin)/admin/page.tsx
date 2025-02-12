"use client";

import { Users, Server, LifeBuoy, Settings, BarChart } from "lucide-react";
import AdminSidebar from "../components/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 mt-16 md:mt-0">
        <section className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="opacity-80 mt-2 text-lg">
            Manage users, servers, and support requests.
          </p>
        </section>

        {/* Overview Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Users",
              value: "1,245",
              icon: <Users size={24} />,
            },
            {
              title: "Active Servers",
              value: "312",
              icon: <Server size={24} />,
            },
            {
              title: "Open Tickets",
              value: "28",
              icon: <LifeBuoy size={24} />,
            },
            {
              title: "System Load",
              value: "45%",
              icon: <BarChart size={24} />,
            },
          ].map((card, index) => (
            <div
              key={index}
              className="p-6 border border-primary-a10/40 rounded-lg shadow-md backdrop-blur-md flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-primary-a30">{card.icon}</span>
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Manage Users",
                description: "View and control user accounts.",
                icon: <Users size={24} />,
                link: "/admin/users",
              },
              {
                title: "Manage Servers",
                description: "Monitor and configure hosted services.",
                icon: <Server size={24} />,
                link: "/admin/servers",
              },
              {
                title: "Support Tickets",
                description: "Respond to user support requests.",
                icon: <LifeBuoy size={24} />,
                link: "/admin/support",
              },
              {
                title: "System Settings",
                description: "Modify global platform settings.",
                icon: <Settings size={24} />,
                link: "/admin/settings",
              },
            ].map((card, index) => (
              <a
                key={index}
                href={card.link}
                className="p-6 border border-primary-a10/40 rounded-lg shadow-md backdrop-blur-md flex flex-col gap-3 hover:bg-primary-a10/10 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary-a30">{card.icon}</span>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <p className="text-sm opacity-80">{card.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Recent Admin Activity</h3>
          <ul className="space-y-4">
            {[
              { action: "Banned user @example", time: "5 minutes ago" },
              { action: "Updated server settings", time: "2 hours ago" },
              { action: "Resolved ticket #245", time: "Yesterday" },
            ].map((item, index) => (
              <li
                key={index}
                className="p-4 border border-primary-a10/40 rounded-lg flex justify-between items-center shadow-sm backdrop-blur-md"
              >
                <p className="font-medium">{item.action}</p>
                <p className="text-sm opacity-70">{item.time}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

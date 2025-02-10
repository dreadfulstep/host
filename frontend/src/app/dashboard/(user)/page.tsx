"use client";

import Sidebar from "./components/Sidebar";
import { ExternalLink, HelpCircle, LifeBuoy, Server } from "lucide-react"; // Icons

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-surface-a0 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-0">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Welcome Back! 👋</h2>
          <p className="opacity-80 mt-2 text-lg">
            Manage your hosting services easily.
          </p>
        </section>

        {/* Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Join the Discord",
              description: "Chat with our community & get support.",
              icon: <ExternalLink size={24} />,
              link: "https://discord.com/invite/example",
            },
            {
              title: "View Documentation",
              description: "Learn how to set up and manage your services.",
              icon: <HelpCircle size={24} />,
              link: "/docs",
            },
            {
              title: "Open a Support Ticket",
              description: "Need help? Contact our support team.",
              icon: <LifeBuoy size={24} />,
              link: "/support",
            },
            {
              title: "Manage Your Servers",
              description: "View and control your hosted services.",
              icon: <Server size={24} />,
              link: "/servers",
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
        </section>

        {/* Recent Activity */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            {[
              { action: "Logged in", time: "2 minutes ago" },
              { action: "Updated profile", time: "1 hour ago" },
              { action: "Completed task", time: "Yesterday" },
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

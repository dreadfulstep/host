"use client";

import Sidebar from "./components/Sidebar";

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
            Here&apos;s a summary of your activity.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Users", value: "1,254" },
            { title: "Active Sessions", value: "32" },
            { title: "Pending Tasks", value: "7" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 border border-primary-a10/40 rounded-lg shadow-lg backdrop-blur-md"
            >
              <h3 className="text-lg font-medium text-neutral-300">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-primary-a30 mt-2">
                {stat.value}
              </p>
            </div>
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

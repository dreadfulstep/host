"use client";

import { useParams } from "next/navigation";
import { AlertTriangle, CheckCircle, Clipboard, ClipboardCheck, RefreshCcw, Terminal, X, XCircle } from "lucide-react";
import ServerSidebar from "./components/ServerSidebar";
import { toast } from "sonner";

const logs = [
  { message: "Server started", type: "success", time: "2 mins ago" },
  { message: "SMTP connection established", type: "info", time: "5 mins ago" },
  { message: "Backup completed", type: "success", time: "10 mins ago" }
];

const logIcons = {
  success: <CheckCircle className="text-green-400" size={18} />,
  info: <Terminal className="text-blue-400" size={18} />,
  warning: <AlertTriangle className="text-yellow-400" size={18} />,
  error: <XCircle className="text-red-400" size={18} />,
};

export default function ServerPage() {
  const { serverId } = useParams() ?? { serverId: "" };
  const user = { username: "admin" };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
        icon: <ClipboardCheck className="text-primary-a30" />,
        duration: 2000,
        className:
          "bg-surface-a0 border border-primary-a20 text-white rounded-lg shadow-lg px-4 py-3 flex items-center",
      });
  };

  return (
    <div className="flex min-h-screen bg-surface-a0 text-white">
      <ServerSidebar />
      <main className="flex-1 p-6 mt-16 md:mt-0 overflow-y-scroll">
        <h1 className="text-3xl font-semibold">Server: {serverId}</h1>
        <p className="text-tonal-a40 mt-2">Server Overview & Status</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { title: "CPU Usage", value: "32%", color: "primary-a10" },
            { title: "Memory Usage", value: "4.2GB / 8GB", color: "primary-a20" },
            { title: "Disk Usage", value: "120GB / 256GB", color: "primary-a30" },
            { title: "Uptime", value: "12d 4h 23m", color: "primary-a40" },
          ].map((stat) => (
            <div
              key={stat.title}
              className={`p-4 bg-primary-a10/5 border border-primary-a10/40 rounded-lg shadow-md`}
            >
              <p className="text-lg font-semibold">{stat.title}</p>
              <p className="text-2xl mt-1 text-neutral-200">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-primary-a10/5 border border-primary-a10/60 rounded-lg">
            <h2 className="text-2xl font-semibold">SMTP Configuration</h2>
            <p className="text-tonal-a40 mt-2">Mail server details for outgoing emails.</p>
            
            <div className="flex items-center justify-between mt-4 p-3 bg-primary-a20/10 border border-primary-a20/60 rounded-lg">
              <span className="font-semibold">smtp.example.com:587</span>
              <button
                onClick={() => handleCopy("smtp.example.com:587")}
                className="text-primary-a30 hover:text-primary-a20 transition"
              >
                <Clipboard size={18} />
              </button>
            </div>

            <p className="mt-2 text-sm text-tonal-a40">
              Username: <span className="font-semibold">{user.username}</span>
            </p>
            <p className="text-sm text-tonal-a40">
              Password: <span className="font-semibold">Same as your account password</span>
            </p>
          </div>

          <div className="p-6 bg-primary-a10/5 border border-primary-a10/60 rounded-lg">
            <h2 className="text-2xl font-semibold">Server IP & Access</h2>
            <p className="text-tonal-a40 mt-2">Use these details to connect to your server.</p>

            <div className="flex items-center justify-between mt-4 p-3 bg-primary-a20/10 border border-primary-a20/60 rounded-lg">
              <span className="font-semibold">192.168.1.100</span>
              <button
                onClick={() => handleCopy("192.168.1.100")}
                className="text-primary-a30 hover:text-primary-a20 transition"
              >
                <Clipboard size={18} />
              </button>
            </div>

            <p className="mt-2 text-sm text-tonal-a40">SSH Port: <span className="font-semibold">22</span></p>
            <p className="text-sm text-tonal-a40">SFTP Port: <span className="font-semibold">22</span></p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-primary-a10/5 border border-primary-a10 rounded-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Recent Logs</h2>
                <button className="text-primary-a30 hover:text-primary-a20 transition">
                <RefreshCcw size={20} />
                </button>
            </div>
            <p className="text-tonal-a40 mt-2">Latest server events and actions.</p>

            <div className="mt-4 space-y-3">
                {logs.slice(0, 3).map((log, idx) => (
                <div
                    key={idx}
                    className="flex items-center gap-3 p-3 border border-primary-a30/60 bg-primary-a10/10 rounded-lg"
                >
                    {logIcons[log.type as keyof typeof logIcons]}
                    <div className="flex-1">
                    <p className="text-white text-sm">{log.message}</p>
                    <p className="text-xs text-tonal-a40">{log.time}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}

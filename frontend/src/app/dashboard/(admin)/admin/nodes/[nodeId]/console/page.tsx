"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { Send, Terminal, Cpu, MemoryStick, HardDrive, Upload, Download } from "lucide-react";
import Ansi from "ansi-to-react";
import NodeSidebar from "../components/Sidebar";

export default function NodeConsolePage() {
  const [logs, setLogs] = useState<string[]>([
    "Node initialized...",
    "\u001b[32mSuccess: Node is running smoothly\u001b[0m",
    "\u001b[31mError: Disk space low on node\u001b[0m",
    "\u001b[33mWarning: High CPU usage detected\u001b[0m",
  ]);
  const [input, setInput] = useState("");
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const sendCommand = () => {
    if (!input.trim()) return;
    setLogs((prev) => [...prev, `> ${input}`, `\u001b[34mExecuting: ${input}...\u001b[0m`]);
    setInput("");
  };

  return (
    <div className="h-screen flex text-white">
      <NodeSidebar />

      <div className="flex-1 flex flex-col p-4 gap-4 mt-16 md:mt-0">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 flex flex-col bg-primary-a0/10 rounded-lg border border-primary-a10/40 shadow-lg">
            <div className="p-4 border-b border-primary-a10/40 flex items-center gap-3">
              <Terminal size={24} />
              <h1 className="text-md font-semibold">Node Console</h1>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-2 h-[50vh]">
              {logs.map((log, idx) => (
                <div key={idx} className="text-sm font-mono">
                  <Ansi>{log}</Ansi>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            <div className="p-3 border-t border-primary-a10/40 flex items-center gap-2 bg-primary-a10/10">
              <div className="relative w-full flex border border-primary-a20/60 rounded-lg bg-primary-a20/10">
                <input
                  type="text"
                  className="flex-1 p-2 pr-10 w-full text-white rounded-lg outline-none bg-transparent focus:ring-2 focus:ring-primary-a30/60"
                  placeholder="Type a command..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendCommand()}
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-a50 transition hover:text-primary-a40"
                  onClick={sendCommand}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <StatCard title="CPU Usage" value="75%" icon={<Cpu size={24} className="text-primary-a50" />} />
            <StatCard title="Memory" value="12GB / 16GB" icon={<MemoryStick size={24} className="text-primary-a50" />} />
            <StatCard title="Disk" value="300GB / 500GB" icon={<HardDrive size={24} className="text-primary-a50" />} />
            <StatCard title="Outgoing" value="15.2 MB/s" icon={<Upload size={24} className="text-primary-a50" />} />
            <StatCard title="Incoming" value="10.3 MB/s" icon={<Download size={24} className="text-primary-a50" />} />
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: ReactNode }) => (
  <div className="bg-primary-a0/10 p-4 rounded-lg flex items-center gap-4 border border-primary-a10/40">
    {icon}
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

"use client";

import { useState } from "react";
import NodeSidebar from "../components/Sidebar";

export default function NodeSettingsPage() {
  const [nodeSettings, setNodeSettings] = useState({
    nodeTitle: "Node Alpha",
    url: "http://node-alpha.local",
    protocol: "http", // Either 'http' or 'https'
    maxRam: "128", // in GB
    allocatedRam: "32", // in GB
    maxStorage: "500", // in GB
    allocatedStorage: "200", // in GB
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNodeSettings((prevSettings) => ({
        ...prevSettings,
        [name]: value,
      }));
    };

  const handleAllocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value, 10);

    if (name === "allocatedRam" && parsedValue > parseInt(nodeSettings.maxRam, 10)) {
      alert(`Max RAM is ${nodeSettings.maxRam}GB.`);
      return;
    }

    if (name === "allocatedStorage" && parsedValue > parseInt(nodeSettings.maxStorage, 10)) {
      alert(`Max storage is ${nodeSettings.maxStorage}GB.`);
      return;
    }

    setNodeSettings((prevSettings) => ({
      ...prevSettings,
      [name]: String(value),
    }));
  };

  const handleProtocolChange = (protocol: "http" | "https") => {
    setNodeSettings((prevSettings) => ({
      ...prevSettings,
      protocol,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Node settings saved successfully!");
  };

  return (
    <div className="h-screen flex text-white">
      <NodeSidebar />

      <div className="flex-1 p-6 mt-16 md:mt-0">
        <section>
          <h2 className="text-4xl font-bold tracking-tight">Node Settings</h2>
          <p className="opacity-80 mt-2 text-lg">Configure your node's settings below.</p>
        </section>

        <form onSubmit={handleSubmit} className="mt-8 bg-primary-a0/10 p-6 rounded-lg border border-primary-a10/40 shadow-lg">
          {/* Node Name */}
          <div className="mb-6">
            <label htmlFor="nodename" className="block text-lg font-medium mb-2">
              Node Name
            </label>
            <input
              type="text"
              id="nodename"
              name="nodeTitle"
              value={nodeSettings.nodeTitle}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-transparent border border-primary-a20/40 text-white"
            />
          </div>

          {/* URL and Protocol */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1">
              <label htmlFor="url" className="block text-lg font-medium mb-2">
                Node URL
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={nodeSettings.url}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-transparent border border-primary-a20/40 text-white"
              />
            </div>

            <div className="flex-1">
              <label className="block text-lg font-medium mb-2">
                Protocol
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleProtocolChange("http")}
                  className={`p-3 w-full rounded-md text-white border border-primary-a20/60 ${nodeSettings.protocol === "http" ? "bg-primary-a30/40" : "bg-primary-a40/20"}`}
                >
                  HTTP
                </button>
                <button
                  type="button"
                  onClick={() => handleProtocolChange("https")}
                  className={`p-3 w-full rounded-md text-white border border-primary-a20/60 ${nodeSettings.protocol === "https" ? "bg-primary-a30/40" : "bg-primary-a40/20"}`}
                >
                  HTTPS
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Resource Allocations</h3>

            <div className="flex gap-8">
              <div className="flex-1">
                <label htmlFor="allocatedRam" className="block text-lg font-medium mb-2">
                  Allocated RAM (GB)
                </label>
                <input
                  type="number"
                  id="allocatedRam"
                  name="allocatedRam"
                  value={nodeSettings.allocatedRam}
                  onChange={handleAllocationChange}
                  min={1}
                  max={nodeSettings.maxRam}
                  className="w-full p-3 rounded-md bg-transparent border border-primary-a20/40 text-white"
                />
                <small className="text-gray-400">Max: {nodeSettings.maxRam}GB</small>
              </div>

              <div className="flex-1">
                <label htmlFor="allocatedStorage" className="block text-lg font-medium mb-2">
                  Allocated Storage (GB)
                </label>
                <input
                  type="number"
                  id="allocatedStorage"
                  name="allocatedStorage"
                  value={nodeSettings.allocatedStorage}
                  onChange={handleAllocationChange}
                  min={1}
                  max={nodeSettings.maxStorage}
                  className="w-full p-3 rounded-md bg-transparent border border-primary-a20/40 text-white"
                />
                <small className="text-gray-400">Max: {nodeSettings.maxStorage}GB</small>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

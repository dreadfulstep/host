"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Database, Home, Menu, Server, Settings, Terminal, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

export default function NodeSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { nodeId } = useParams();
    console.log(nodeId)
  const isActive = (path: string) => path === pathname;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full bg-surface-a0/60 backdrop-blur-md z-50 shadow-lg">
            <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-white">X-Host</h1>
            <button
                className="p-2 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu size={24} className="text-white" />
            </button>
            </div>
      </div>

      <div
            className={`fixed top-0 left-0 h-full w-full bg-surface-a0 border-r border-primary-a10/40 z-40 transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex md:w-64 md:flex-col md:min-h-screen`}
      >
        <div className="flex justify-between items-center p-4 border-b border-surface-a30">
          <h1 className="text-xl font-semibold">X-Host</h1>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4">
        {[
            { name: "Overview", href: `/dashboard/admin/nodes/${nodeId}`, icon: Home },
            { name: "Console", href: `/dashboard/admin/nodes/${nodeId}/console`, icon: Terminal },
            { name: "Servers", href: `/dashboard/admin/nodes/${nodeId}/servers`, icon: Server },
            { name: "Databases", href: `/dashboard/admin/nodes/${nodeId}/databases`, icon: Database },
            { name: "Settings", href: `/dashboard/admin/nodes/${nodeId}/settings`, icon: Settings },
            { name: "Metrics", href: `/dashboard/admin/nodes/${nodeId}/metrics`, icon: Menu },
            { name: "Alerts", href: `/dashboard/admin/nodes/${nodeId}/alerts`, icon: X },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-4 border-l-4 transition cursor-pointer flex items-center ${
            isActive(item.href)
              ? "bg-gradient-to-r from-primary-a10/20 to-transparent border-primary-a10 text-white"
              : "text-neutral-400 hover:text-neutral-200 border-transparent hover:bg-gradient-to-r hover:from-primary-a10/20 hover:to-transparent hover:border-primary-a10 active:bg-gradient-to-r active:from-primary-a20/20 active:to-transparent active:border-primary-a20"
              }`}
            >
            {item.icon && <item.icon className="mr-2"/>}
            {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {isOpen && (
            <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
            />
      )}
    </>
  );
}

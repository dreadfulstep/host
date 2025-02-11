"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { File, Home, Menu, Play, Power, RotateCcw, Settings, Terminal, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

export default function ServerSidebar() {
    const { serverId } = useParams() ?? { serverId: '' };
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === `/dashboard/servers/${serverId}`) {
            return pathname === `/dashboard/servers/${serverId}`;
          }
          if (href === `/dashboard/servers/${serverId}/files`) {
            return pathname.startsWith(`/dashboard/servers/${serverId}/files`);
          }
      
          return pathname.startsWith(href);
        };
      
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
            <h1 className="text-xl font-semibold text-white">Server {serverId}</h1>
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
            <h1 className="text-xl font-semibold">Server {serverId}</h1>
            </div>

            <div className="m-4 p-4 rounded-lg border border-primary-a10/60">
            <h2 className="text-lg font-semibold text-primary-a50 mb-2">
                Server Stats
            </h2>
            <p className="text-sm text-neutral-400">CPU: 32%</p>
            <p className="text-sm text-neutral-400">Memory: 4.2GB / 8GB</p>
            <p className="text-sm text-neutral-400">Disk: 120GB / 256GB</p>
            </div>

            <div className="m-4 flex flex-row gap-x-[2px]">
            <button className="py-2 px-4 w-1/3 bg-primary-a30/40 hover:bg-green-600/30 transition rounded-l-lg flex justify-center">
                <Play />
            </button>
            <button className="py-2 px-4 w-1/3 bg-primary-a30/40 hover:bg-yellow-600/30 transition flex justify-center">
                <RotateCcw />
            </button>
            <button className="py-2 px-4 w-1/3 bg-primary-a30/40 hover:bg-red-600/30 transition rounded-r-lg flex justify-center">
                <Power />
            </button>
            </div>

            <nav className="mt-4 overflow-y-scroll">
            {[
                { name: "Overview", href: `/dashboard/servers/${serverId}`, icon: Home },
                { name: "Files", href: `/dashboard/servers/${serverId}/files`, icon: File },
                { name: "Console", href: `/dashboard/servers/${serverId}/console`, icon: Terminal },
                { name: "Settings", href: `/dashboard/servers/${serverId}/settings`, icon: Settings },
            ].map((item) => (
                <Link
                key={item.href}
                href={item.href}
                className={`p-4 border-l-4 transition cursor-pointer flex items-center gap-x-3 ${
                    isActive(item.href)
                    ? "bg-gradient-to-r from-primary-a10/20 to-transparent border-primary-a10 text-white"
                    : "text-neutral-400 hover:text-neutral-200 border-transparent hover:bg-gradient-to-r hover:from-primary-a10/20 hover:to-transparent hover:border-primary-a10 active:bg-gradient-to-r active:from-primary-a20/20 active:to-transparent active:border-primary-a20"
                }`}
                >
                <item.icon />
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

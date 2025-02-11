"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Play, Power, RotateCcw, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

export default function ServerSidebar() {
    const { serverId } = useParams() ?? { serverId: '' };
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => path === pathname;

    return (
        <>
        {/* Mobile Menu Button */}
        <button
            className="md:hidden fixed top-4 left-4 z-50 bg-primary-a30 p-2 rounded-lg"
            onClick={() => setIsOpen(true)}
        >
            <Menu size={24} />
        </button>

        <div
            className={`h-screen w-64 bg-surface-a10 md:bg-surface-a10/10 border-primary-a0/35 md:border-r text-white shadow-lg transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 md:relative md:flex md:flex-col`}
        >
            <div className="flex justify-between items-center p-4 border-b border-surface-a30">
            <h1 className="text-xl font-semibold">Server {serverId}</h1>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
                <X size={24} />
            </button>
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

            <nav className="mt-4">
            {[
                { name: "Overview", href: `/dashboard/servers/${serverId}` },
                { name: "Members", href: `/dashboard/servers/${serverId}/members` },
                { name: "Settings", href: `/dashboard/servers/${serverId}/settings` },
            ].map((item) => (
                <Link
                key={item.href}
                href={item.href}
                className={`block p-4 border-l-4 transition cursor-pointer ${
                    isActive(item.href)
                    ? "bg-gradient-to-r from-primary-a10/20 to-transparent border-primary-a10 text-white"
                    : "text-neutral-400 hover:text-neutral-200 border-transparent hover:bg-gradient-to-r hover:from-primary-a10/20 hover:to-transparent hover:border-primary-a10 active:bg-gradient-to-r active:from-primary-a20/20 active:to-transparent active:border-primary-a20"
                }`}
                >
                {item.name}
                </Link>
            ))}
            </nav>
        </div>

        {isOpen && (
            <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            />
        )}
        </>
    );
}

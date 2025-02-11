"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ServerSidebar from "../components/ServerSidebar";
import { Upload, Folder, FileText } from "lucide-react";

export type FileType = {
  name: string;
  type: "directory" | "file";
  modified: string;
  size?: string;
};

export default function FilesPage() {
  const [files, setFiles] = useState<FileType[]>([
    { name: "logs", type: "directory", modified: "2023-10-01" },
    { name: "config.json", type: "file", modified: "2023-10-02" },
    { name: "server.jar", type: "file", modified: "2023-10-03" },
  ]);

  const router = useRouter();

  const handleClick = (name: string) => {
    router.push(`/dashboard/servers/[serverId]/files/${name}`);
  };

  return (
    <div className="h-screen flex text-white">
      <ServerSidebar />

      <div className="flex-1 flex flex-col p-4 gap-4 mt-16 md:mt-0">
        <div className="flex justify-between items-center p-4 border border-primary-a20/40 bg-primary-a0/10 rounded-lg">
          <h1 className="text-lg font-semibold">File Manager</h1>
          <button className="flex items-center gap-2 bg-primary-a0/20 border border-primary-a20/60 hover:bg-primary-a10/40 px-4 py-2 rounded-lg transition">
            <Upload size={20} /> Upload
          </button>
        </div>

        <div className="flex-1 bg-primary-a0/10 border border-primary-a20/40 rounded-lg p-4 overflow-auto flex flex-col gap-4">
          {files.length > 0 ? (
            files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-3 p-3 bg-primary-a10/10 rounded-lg border border-gray-800 cursor-pointer hover:bg-gray-800 transition"
                onClick={() => handleClick(file.name)}
              >
                {file.type === "directory" ? (
                  <Folder size={24} className="text-neutral-400" />
                ) : (
                  <FileText size={24} className="text-neutral-400" />
                )}
                <div>
                  <p className="text-white font-semibold">{file.name}</p>
                  {file.size && <p className="text-sm text-gray-400">{file.size}</p>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No files found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
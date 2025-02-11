"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ServerSidebar from "../components/ServerSidebar";
import { Upload, Folder, FileText, Trash2, Edit } from "lucide-react";

export type FileType = {
  name: string;
  type: "directory" | "file";
  modified: string;
  size?: string;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return date.toLocaleString('en-US', options).replace(',', '');
};

export default function FilesPage() {
  const [files, setFiles] = useState<FileType[]>([
    { name: "logs", type: "directory", modified: "2023-10-01T08:00:00Z" },
    { name: "config.json", type: "file", modified: "2023-10-02T14:30:00Z" },
    { name: "server.jar", type: "file", modified: "2023-10-03T18:45:00Z" },
  ]);

  const { serverId } = useParams();

  const router = useRouter();

  const handleClick = (name: string) => {
    router.push(`/dashboard/servers/${serverId}/files/${name}`);
  };

  const handleDelete = (name: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const handleEdit = (name: string) => {
    console.log(`Editing ${name}`);
  };

  const handleNew = () => {
    setFiles([
      ...files,
      { name: "Test", type: "file", modified: new Date().toISOString() },
    ]);
    console.log("Creating new file/folder");
  };

  return (
    <div className="flex min-h-screen bg-surface-a0 text-white">
      <ServerSidebar />

      <div className="flex-1 p-4 gap-4 mt-16 md:mt-0">
        <div className="flex justify-between items-center p-4 border border-primary-a20/40 bg-primary-a0/10 rounded-lg">
          <h1 className="text-lg font-semibold">File Manager</h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-primary-a0/20 border border-primary-a20/60 hover:bg-primary-a10/40 px-4 py-2 rounded-lg transition">
              <Upload size={20} /> Upload
            </button>
            <button
              className="flex items-center gap-2 bg-primary-a0/20 border border-primary-a20/60 hover:bg-primary-a10/40 px-4 py-2 rounded-lg transition"
              onClick={handleNew}
            >
              New
            </button>
          </div>
        </div>

        <div className="p-4 bg-primary-a0/10 border border-primary-a20/40 rounded-lg max-h-[80vh] mt-4">
          <div className="overflow-y-scroll space-y-2 max-h-[calc(80vh-10vh)]">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-between py-2 bg-primary-a10/10 rounded-lg border border-primary-a20/40 cursor-pointer hover:bg-primary-a20/20 transition"
                  onClick={() => handleClick(file.name)}
                >
                  <div className="flex items-center gap-2 w-1/3 justify-left px-4">
                    {file.type === "directory" ? (
                      <Folder size={24} className="text-neutral-400" />
                    ) : (
                      <FileText size={24} className="text-neutral-400" />
                    )}
                    <p className="text-white font-semibold">{file.name}</p>
                  </div>

                  <p className="text-sm text-gray-400 w-1/3 text-center">
                    {formatDate(file.modified)}
                  </p>

                  <div className="flex items-center justify-end px-4 w-1/3 space-x-2">
                    <button
                      className="text-neutral-400 hover:text-red-500 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.name);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="text-neutral-400 hover:text-blue-500 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(file.name);
                      }}
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No files found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

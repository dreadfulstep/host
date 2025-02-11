"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Folder, FileText, Edit, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import ServerSidebar from "../../components/ServerSidebar";
import { FileType } from "../page";
import hljs from "highlight.js";
import "highlight.js/styles/dark.css"; // Use a theme of your choice (dark.css for a dark theme)

interface FileSystem {
  [key: string]: any;
}

const fileSystem: FileSystem = {
  logs: [
    { name: "log1.txt", type: "file", modified: "2023-10-01T08:00:00Z" },
    { name: "log2.txt", type: "file", modified: "2023-10-02T14:30:00Z" },
  ],
  config: [
    { name: "config.json", type: "file", modified: "2023-10-01T08:00:00Z" },
  ],
  "config.json": `{
  "setting": true,
  "value": "Test"
}`,
  "log1.txt": "This is a log file. It contains logs from the system.\nMore logs here...",
};

export default function FilePage() {
  const { file, serverId } = useParams();
  const router = useRouter();

  // Handle case where "file" might be an array or a single string
  const pathParts = Array.isArray(file) ? file.join("/") : file || "";
  const pathSegments = pathParts.split("/");

  const fileName = pathSegments[pathSegments.length - 1];
  
  const isDirectory = fileSystem[fileName] && Array.isArray(fileSystem[fileName]);

  const [fileContent, setFileContent] = useState<string | null>(null);
  const [highlightedContent, setHighlightedContent] = useState<string | null>(null);

  useEffect(() => {
    if (fileName && !isDirectory) {
      const content = fileSystem[fileName];
      setFileContent(content);

      const language = fileName.split('.').pop();
      if (language) {
        try {
          const highlighted = hljs.highlight(language, content).value;
          setHighlightedContent(highlighted);
        } catch (err) {
          console.error("Error highlighting content:", err);
        }
      }
    }
  }, [fileName, isDirectory]);

  const handleClick = (name: string) => {
    router.push(`/dashboard/servers/${serverId}/files/${file}/${name}`);
  };

  const handleDelete = (name: string) => {
    console.log(`Deleted ${name}`);
  };

  const handleEdit = (name: string) => {
    console.log(`Editing ${name}`);
  };

  return (
    <div className="flex min-h-screen bg-surface-a0 text-white">
      <ServerSidebar />

      <div className="flex-1 p-4 gap-4 mt-16 md:mt-0">
        <div className="p-4 bg-primary-a0/10 border border-primary-a20/40 rounded-lg">
          {isDirectory ? (
            <>
              <h1 className="text-lg font-semibold">Directory: {fileName}</h1>
              <div className="space-y-2 mt-4">
                {fileSystem[fileName]?.map((file: FileType) => (
                  <div
                    key={file.name}
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
                      {file.modified}
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
                ))}
              </div>
            </>
          ) : (
            <>
              {fileContent && !isDirectory ? (
                <pre className="bg-primary-a0/20 p-4 rounded-lg">
                  <code dangerouslySetInnerHTML={{ __html: highlightedContent || "" }} />
                </pre>
              ) : (
                <p className="text-gray-400 text-center">Loading file content...</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

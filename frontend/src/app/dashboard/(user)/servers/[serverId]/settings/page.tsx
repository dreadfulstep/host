"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ServerSidebar from "../components/ServerSidebar";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

const parseEnvVariables = (envString: string) => {
  const envVars: EnvVar[] = [];
  const regex = /([^=]+)=(.*)/g;
  const lines = envString.split("\n").map(line => line.trim()).filter(Boolean); // Split by lines
  lines.forEach(line => {
    const match = regex.exec(line);
    if (match) {
      envVars.push({ key: match[1], value: match[2], isVisible: false });
    }
  });
  return envVars;
};

interface EnvVar {
  key: string;
  value: string;
  isVisible: boolean;
}

const defaultConfig = {
  dockerImage: "node:16", // Node.js image as an example
  startupScript: "npm run start",
  githubRepo: "",
  envVars: [
    { key: "NODE_ENV", value: "production", isVisible: false },
    { key: "APP_PORT", value: "3000", isVisible: false },
  ],
  dockerImages: ["node:16", "node:14", "node:18", "node:latest"],
};

export default function SettingsPage() {
  const { serverId } = useParams();
  const router = useRouter();

  const [serverName, setServerName] = useState<string>("");
  const [dockerImage, setDockerImage] = useState<string>(defaultConfig.dockerImage);
  const [startupScript, setStartupScript] = useState<string>(defaultConfig.startupScript);
  const [githubRepo, setGithubRepo] = useState<string>(defaultConfig.githubRepo);
  const [envVars, setEnvVars] = useState<EnvVar[]>(defaultConfig.envVars);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setServerName(`Server ${serverId}`);
    setDockerImage(defaultConfig.dockerImage);
    setStartupScript(defaultConfig.startupScript);
    setGithubRepo(defaultConfig.githubRepo);
    setEnvVars(defaultConfig.envVars);
  }, [serverId]);

  const handleSave = () => {
    setIsSaving(true);
    toast("Saving changes");
    setTimeout(() => {
      toast("Saved successfully");
      setIsSaving(false);
    }, 1000);
  };

  const handleEnvVarChange = (index: number, field: "key" | "value", value: string) => {
    const updatedEnvVars = [...envVars];
    updatedEnvVars[index][field] = value;
    setEnvVars(updatedEnvVars);
  };

  const toggleEnvVarVisibility = (index: number) => {
    const updatedEnvVars = [...envVars];
    updatedEnvVars[index].isVisible = !updatedEnvVars[index].isVisible;
    setEnvVars(updatedEnvVars);
  };

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "", isVisible: false }]);
  };

  const removeEnvVar = (index: number) => {
    const updatedEnvVars = envVars.filter((_, i) => i !== index);
    setEnvVars(updatedEnvVars);
  };

  const handleGithubLink = () => {
    alert("Mock GitHub Link button clicked");
  };

  return (
    <div className="flex min-h-screen bg-surface-a0 text-white">
      <ServerSidebar />

      <div className="flex-1 p-4 gap-4 mt-16 md:mt-0">
        <div className="p-4 bg-primary-a0/10 border border-primary-a20/40 rounded-lg">
          <h1 className="text-lg font-semibold mb-4">Settings - Server {serverId}</h1>

          <div className="mb-6">
            <label htmlFor="serverName" className="text-sm font-semibold text-neutral-300">
              Server Name
            </label>
            <input
              id="serverName"
              type="text"
              className="mt-2 w-full px-4 py-2 bg-primary-a0/10 border border-primary-a20/40 rounded-lg"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
          </div>

          <div className="mb-6 flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="dockerImage" className="text-sm font-semibold text-neutral-300">
                Docker Image Version
              </label>
              <div className="mt-2">
                <Select value={dockerImage} onValueChange={(value) => setDockerImage(value)}>
                  <SelectTrigger className="w-[180px] bg-primary-a0/10 border border-primary-a20/40">
                    <SelectValue placeholder="Select Docker Image" />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-a0 text-white border border-primary-a20/40">
                    {defaultConfig.dockerImages.map((image) => (
                      <SelectItem key={image} value={image} className="focus:bg-primary-a10/20 focus:text-white">
                        {image}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-neutral-400">
                  Selected Docker image: <strong>{dockerImage}</strong>
                </p>
              </div>
            </div>

            <div className="w-1/2">
              <label htmlFor="startupScript" className="text-sm font-semibold text-neutral-300">
                Startup Script
              </label>
              <input
                id="startupScript"
                type="text"
                className="mt-2 w-full px-4 py-2 bg-primary-a0/10 border border-primary-a20/40 rounded-lg"
                value={startupScript}
                onChange={(e) => setStartupScript(e.target.value)}
                placeholder="npm run start"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-col">
            <label className="text-sm font-semibold text-neutral-300">GitHub Repository</label>
            <button
              onClick={handleGithubLink}
              className="mt-2 px-4 py-2 w-48 bg-primary-a0/10 border border-primary-a20/40 hover:bg-primary-a10/20 text-white rounded-lg transition"
            >
              Login with GitHub
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-neutral-300">Environment Variables</label>
            <div className="mt-2">
              {envVars.map((envVar, index) => (
                <div key={index} className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    className="w-1/3 px-4 py-2 bg-primary-a0/10 border border-primary-a20/40 rounded-lg"
                    value={envVar.key}
                    onChange={(e) => handleEnvVarChange(index, "key", e.target.value)}
                    placeholder="KEY"
                  />
                  <input
                    type={envVar.isVisible ? "text" : "password"}
                    className="w-1/3 px-4 py-2 bg-primary-a0/10 border border-primary-a20/40 rounded-lg"
                    value={envVar.value}
                    onChange={(e) => handleEnvVarChange(index, "value", e.target.value)}
                    placeholder="VALUE"
                  />
                  <button
                    className="ml-2 text-yellow-500"
                    onClick={() => toggleEnvVarVisibility(index)}
                  >
                    {envVar.isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeEnvVar(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="text-blue-500"
                onClick={addEnvVar}
              >
                Add Environment Variable
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="text-white px-4 py-2 rounded-lg bg-primary-a0/10 border border-primary-a20/40 hover:bg-primary-a10/20 transition"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

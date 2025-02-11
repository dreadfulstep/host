"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ServerSidebar from "../components/ServerSidebar";
import { Eye, EyeOff, Trash, Plus, FileText, Upload } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";

const parseEnvVariables = (envString: string) => {
  const envVars: EnvVar[] = [];
  
  const matches = envString.match(/^([^=]+)=(.*)$/gm);
  
  if (matches) {
    matches.forEach((line) => {
      const [key, value] = line.split("=");
      envVars.push({ key: key.trim(), value: value.trim(), isVisible: false });
    });
  }

  return envVars;
};

interface EnvVar {
  key: string;
  value: string;
  isVisible: boolean;
}

const defaultConfig = {
  dockerImage: "node:16",
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
  const [rawEnvInput, setRawEnvInput] = useState<string>("");

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

  const handleRawEnvSubmit = () => {
    const parsedEnvVars = parseEnvVariables(rawEnvInput);
    console.log(rawEnvInput)
    console.log(parsedEnvVars)
    setEnvVars([...envVars, ...parsedEnvVars]);
    setRawEnvInput("");
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

          <div className="flex space-x-4 mb-2">
            <div className="w-1/2">
              <label htmlFor="dockerImage" className="text-sm font-semibold text-neutral-300">
                Docker Image Version
              </label>
              <div className="mt-2">
                <Select value={dockerImage} onValueChange={(value) => setDockerImage(value)}>
                  <SelectTrigger className="py-5 bg-primary-a0/10 border border-primary-a20/40">
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
              </div>
            </div>

            <div className="w-1/2 mb-2">
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
            <div className="mt-2">
              <label className="text-sm font-semibold text-neutral-300">Environment Variables</label>
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
                    className="ml-2 text-neutral-200"
                    onClick={() => toggleEnvVarVisibility(index)}
                  >
                    {envVar.isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeEnvVar(index)}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              ))}
              <div className="space-x-2">
                <button
                    className="px-4 py-2 bg-primary-a0/10 border border-primary-a20/40 rounded-lg"
                    onClick={addEnvVar}
                >
                  <Plus size={24} />
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                          <button
                              className="px-4 py-2 bg-primary-a0/10 border border-primary-a20/40 rounded-lg"
                          >
                              <Upload size={24} />
                          </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-surface-a0 border-primary-a10/40 text-white">
                    <DialogHeader>
                      <DialogTitle>Add Raw Environment Variables</DialogTitle>
                      <DialogDescription>
                        Paste your raw environment variables below. They will be parsed and added.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 gap-4">
                        <Label htmlFor="rawEnvInput" className="text-right">
                          Environment Variables
                        </Label>
                        <textarea
                          id="rawEnvInput"
                          className="w-full px-4 py-2 bg-primary-a0/10 border border-primary-a20/40 rounded-lg resize-none mb-4"
                          rows={6}
                          value={rawEnvInput}
                          onChange={(e) => setRawEnvInput(e.target.value)}
                          placeholder="Paste raw env variables here (e.g., KEY=VALUE)"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <button onClick={handleRawEnvSubmit} className="px-4 py-2 bg-primary-a0/10 border border-primary-a20/40 rounded-lg hover:bg-primary-a20/15 transition">Submit</button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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

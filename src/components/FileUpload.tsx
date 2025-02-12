"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onUpload: (file: string | null) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("📂 Selected File:", file.name, "Type:", file.type);
    setFileName(`${file.name} (${file.type.split("/")[1]})`);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) {
        console.error("🚨 FileReader failed");
        return;
      }
      onUpload(e.target.result as string);
    };

    if (file.type === "image/svg+xml") {
      console.log("✅ Detected SVG. Reading as text...");
      reader.readAsText(file);
    } else {
      console.log("📸 Detected PNG/JPG. Converting to Base64...");
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-900 dark:text-gray-100">
        Upload Logo
      </label>
      <label
        htmlFor="file-upload"
        className="btn btn-outline flex items-center gap-2 cursor-pointer
          border dark:border-gray-600 text-gray-700 dark:text-gray-300
          hover:border-gray-700 hover:text-gray-800 dark:hover:border-white dark:hover:text-white"
      >
        <Upload size={18} /> Upload (SVG)
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".svg,.png,.jpg,.jpeg"
        className="hidden"
        onChange={handleFileUpload}
      />
      {fileName && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ✔ {fileName}
        </p>
      )}
    </div>
  );
}

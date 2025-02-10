"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onUpload: (fileData: { svg?: string; image?: string }) => void;
}

export default function FileUpload({ onUpload }: { onUpload: (fileData: { svg?: string; image?: string }) => void }) {
    const [fileName, setFileName] = useState<string | null>(null);
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      console.log("📂 Selected File:", file.name, "Type:", file.type);
      setFileName(file.name);
  
      const reader = new FileReader();
  
      if (file.type === "image/svg+xml") {
        console.log("✅ Detected SVG. Reading as text...");
        reader.onload = (e) => {
          if (!e.target?.result) {
            console.error("🚨 SVG FileReader failed");
            return;
          }
          onUpload({ svg: e.target.result as string });
        };
        reader.readAsText(file);
      } else if (file.type.startsWith("image/")) {
        console.log("📸 Detected PNG/JPG. Converting to Base64...");
        reader.onload = (e) => {
          if (!e.target?.result) {
            console.error("🚨 Image FileReader failed");
            return;
          }
          onUpload({ image: e.target.result as string });
        };
        reader.readAsDataURL(file);
      } else {
        console.error("🚨 Unsupported file format:", file.type);
      }
    };
  
    return (
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-900 dark:text-gray-100">Upload Logo</label>
        <input id="file-upload" type="file" accept=".svg,.png,.jpg,.jpeg" className="hidden" onChange={handleFileUpload} />
        {fileName && <p className="text-sm text-gray-600 dark:text-gray-400">✔ {fileName}</p>}
      </div>
    );
  }
  
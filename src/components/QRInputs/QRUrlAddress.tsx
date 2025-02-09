import { useState } from "react";
import Button from "@/components/Button";

interface QRUrlProps {
  onGenerate: (text: string) => void;
}

export default function QRUrl({ onGenerate }: QRUrlProps) {
  const [url, setUrl] = useState("");

  const handleGenerate = () => {
    let formattedUrl = url.trim();
    
    // Ensure the URL starts with http:// or https://
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    onGenerate(formattedUrl);
  };

  return (
    <div className="flex flex-col">
      <input
        type="url"
        placeholder="Enter URL (https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      />

      <Button onClick={handleGenerate} variant="primary">
        Generate QR Code
      </Button>
    </div>
  );
}

import { useState } from "react"; 
import Button from "@/components/Button";

interface QRAppStoreProps {
  onGenerate: (text: string) => void;
}

export default function QRAppStore({ onGenerate }: QRAppStoreProps) {
  const [appStoreLink, setAppStoreLink] = useState("");

  const handleGenerate = () => {
    if (!appStoreLink) return;
    onGenerate(appStoreLink);
  };

  return (
    <div className="flex flex-col">
      <input
        type="url"
        placeholder="App Store or Play Store Link"
        value={appStoreLink}
        onChange={(e) => setAppStoreLink(e.target.value)}
        className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      />
      <Button onClick={handleGenerate} variant="primary">Generate QR Code</Button>
    </div>
  );
}

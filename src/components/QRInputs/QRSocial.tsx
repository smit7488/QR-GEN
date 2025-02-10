import { useState } from "react"; 
import Button from "@/components/Button";

interface QRSocialProps {
  onGenerate: (text: string) => void;
}

export default function QRSocial({ onGenerate }: QRSocialProps) {
  const [socialPlatform, setSocialPlatform] = useState("youtube");
  const [profileLink, setProfileLink] = useState("");

  const handleGenerate = () => {
    if (!profileLink) return;
    onGenerate(profileLink);
  };

  return (
    <div className="flex flex-col">
      <select
        value={socialPlatform}
        onChange={(e) => setSocialPlatform(e.target.value)}
        className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      >
        <option value="youtube">YouTube</option>
        <option value="instagram">Instagram</option>
        <option value="linkedin">LinkedIn</option>
        <option value="twitter">Twitter/X</option>
        <option value="facebook">Facebook</option>
      </select>

      <input
        type="url"
        placeholder="Profile URL"
        value={profileLink}
        onChange={(e) => setProfileLink(e.target.value)}
        className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      />

      <Button onClick={handleGenerate} variant="primary">Generate QR Code</Button>
    </div>
  );
}

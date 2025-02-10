import { useState } from "react"; 
import Button from "@/components/Button";

interface QRMusicProps {
  onGenerate: (text: string) => void;
}

export default function QRMusic({ onGenerate }: QRMusicProps) {
  const [musicLink, setMusicLink] = useState("");

  const handleGenerate = () => {
    if (!musicLink.includes("spotify.com") && !musicLink.includes("apple.com")) {
      alert("Please enter a valid Spotify or Apple Music link.");
      return;
    }
    onGenerate(musicLink);
  };

  return (
    <div className="flex flex-col">
      <input
        type="url"
        placeholder="Paste Spotify/Apple Music Link"
        value={musicLink}
        onChange={(e) => setMusicLink(e.target.value)}
        className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      />
      <Button onClick={handleGenerate} variant="primary">Generate QR Code</Button>
    </div>
  );
}

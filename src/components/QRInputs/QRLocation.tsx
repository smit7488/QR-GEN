import { useState } from "react"; 
import Button from "@/components/Button";

interface QRLocationProps {
  onGenerate: (text: string) => void;
}

export default function QRLocation({ onGenerate }: QRLocationProps) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleGenerate = () => {
    if (!latitude || !longitude) return;
    const locationData = `geo:${latitude},${longitude}`;
    onGenerate(locationData);
  };

  return (
    <div className="flex flex-col">
      <input type="text" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <input type="text" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <Button onClick={handleGenerate} variant="primary">Generate QR Code</Button>
    </div>
  );
}

import { useState } from "react"; 
import Button from "@/components/Button";

interface QRWhatsAppProps {
  onGenerate: (text: string) => void;
}

export default function QRWhatsApp({ onGenerate }: QRWhatsAppProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerate = () => {
    if (!phoneNumber) return;
    const encodedMessage = encodeURIComponent(message);
    const whatsappData = `https://wa.me/${phoneNumber}${message ? `?text=${encodedMessage}` : ""}`;
    onGenerate(whatsappData);
  };

  return (
    <div className="flex flex-col">
      <input type="text" placeholder="WhatsApp Number (Include Country Code)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <input type="text" placeholder="Optional Message" value={message} onChange={(e) => setMessage(e.target.value)} className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <Button onClick={handleGenerate} variant="primary">Generate QR Code</Button>
    </div>
  );
}

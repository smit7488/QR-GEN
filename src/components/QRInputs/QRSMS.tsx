import { useState } from "react";
import Button from "@/components/Button";
import TelephoneCodeSelect from "@/components/TelephoneCodeSelect";

interface QRSMSProps {
  onGenerate: (text: string) => void;
}

export default function QRSMS({ onGenerate }: QRSMSProps) {
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-2 flex-wrap">
        {/* Country Code Selector */}
        <TelephoneCodeSelect setCountryCode={setCountryCode} countryCode={countryCode} />

        {/* Phone Number Input */}
        <input
          type="text"
          placeholder="Enter phone number..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded flex-grow bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
        />
      </div>

      {/* Message Input */}
      <textarea
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded w-full h-24 mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      />

      <Button
        onClick={() => onGenerate(`SMSTO:${countryCode}${phone}:${message}`)}
        variant="primary"
      >
        Generate QR Code
      </Button>
    </div>
  );
}

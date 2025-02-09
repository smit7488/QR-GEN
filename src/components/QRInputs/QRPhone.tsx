import { useState } from "react";
import Button from "@/components/Button";
import TelephoneCodeSelect from "@/components/TelephoneCodeSelect";

interface QRPhoneProps {
  onGenerate: (text: string) => void;
}

export default function QRPhone({ onGenerate }: QRPhoneProps) {
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-4 flex-wrap">
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

      <Button onClick={() => onGenerate(`tel:${countryCode}${phone}`)} variant="primary">
        Generate QR Code
      </Button>
    </div>
  );
}

import { useState } from "react";
import Button from "@/components/Button";

interface QRPhoneProps {
  onGenerate: (text: string) => void;
}

export default function QRPhone({ onGenerate }: QRPhoneProps) {
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");

  return (
    <>
      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="+1">🇺🇸 +1 (US)</option>
          <option value="+44">🇬🇧 +44 (UK)</option>
          <option value="+91">🇮🇳 +91 (India)</option>
        </select>
        <input
          type="text"
          placeholder="Enter phone number..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-60"
        />
      </div>
      <Button onClick={() => onGenerate(`tel:${countryCode}${phone}`)} variant="primary">
        Generate QR Code
      </Button>
    </>
  );
}

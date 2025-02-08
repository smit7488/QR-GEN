import { useState } from "react";
import Button from "@/components/Button";

interface QRSMSProps {
  onGenerate: (text: string) => void;
}

export default function QRSMS({ onGenerate }: QRSMSProps) {
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="flex gap-2 mb-2">
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

      <textarea
        placeholder="Enter message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded w-80 h-24 mb-4"
      />

      <Button
        onClick={() => onGenerate(`SMSTO:${countryCode}${phone}:${message}`)}
        variant="primary"
      >
        Generate QR Code
      </Button>
    </>
  );
}

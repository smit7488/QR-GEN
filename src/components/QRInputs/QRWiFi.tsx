import { useState } from "react";
import Button from "@/components/Button";

interface QRWiFiProps {
  onGenerate: (text: string) => void;
}

export default function QRWiFi({ onGenerate }: QRWiFiProps) {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");

  return (
    <div className="flex flex-col">
      {/* SSID Input */}
      <input
        type="text"
        placeholder="SSID"
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
        className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      />

      <div className="flex gap-2 flex-wrap">
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
        />

        {/* Encryption Type Selector */}
        <select
          value={encryption}
          onChange={(e) => setEncryption(e.target.value)}
          className="border p-2 rounded mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Encryption</option>
        </select>
      </div>

      <Button
        onClick={() => onGenerate(`WIFI:S:${ssid};T:${encryption};P:${password};;`)}
        variant="primary"
      >
        Generate QR Code
      </Button>
    </div>
  );
}

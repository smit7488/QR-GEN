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
    <>
      <input
        type="text"
        placeholder="SSID"
        value={ssid}
        onChange={(e) => setSsid(e.target.value)}
        className="border p-2 rounded w-80 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-80 mb-2"
      />
      <select
        value={encryption}
        onChange={(e) => setEncryption(e.target.value)}
        className="border p-2 rounded w-80 mb-4"
      >
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">No Encryption</option>
      </select>
      <Button
        onClick={() => onGenerate(`WIFI:S:${ssid};T:${encryption};P:${password};;`)}
        variant="primary"
      >
        Generate QR Code
      </Button>
    </>
  );
}

import { useState } from "react"; 
import Button from "@/components/Button";

interface QRCryptoProps {
  onGenerate: (text: string) => void;
}

export default function QRCrypto({ onGenerate }: QRCryptoProps) {
  const [cryptoType, setCryptoType] = useState("bitcoin");
  const [walletAddress, setWalletAddress] = useState("");

  const handleGenerate = () => {
    if (!walletAddress) return;
    const cryptoData = `${cryptoType}:${walletAddress}`;
    onGenerate(cryptoData);
  };

  return (
    <div className="flex flex-col">
      <select value={cryptoType} onChange={(e) => setCryptoType(e.target.value)} className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="litecoin">Litecoin</option>
      </select>
      <input type="text" placeholder="Wallet Address" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <Button onClick={handleGenerate} variant="primary">Generate QR Code</Button>
    </div>
  );
}

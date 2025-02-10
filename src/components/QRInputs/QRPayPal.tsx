import { useState } from "react"; 
import Button from "@/components/Button";

interface QRPayPalProps {
  onGenerate: (text: string) => void;
}

export default function QRPayPal({ onGenerate }: QRPayPalProps) {
  const [paypalEmail, setPaypalEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleGenerate = () => {
    if (!paypalEmail) return;
    const paymentUrl = `https://www.paypal.com/paypalme/${paypalEmail}${amount ? `/${amount}` : ""}`;
    onGenerate(paymentUrl);
  };

  return (
    <div className="flex flex-col">
      <input
        type="email"
        placeholder="PayPal Email or Username"
        value={paypalEmail}
        onChange={(e) => setPaypalEmail(e.target.value)}
        className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      />
      <input
        type="number"
        placeholder="Amount (Optional)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
      />
      <Button onClick={handleGenerate} variant="primary">Generate QR Code</Button>
    </div>
  );
}

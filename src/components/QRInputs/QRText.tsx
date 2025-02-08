import { useState } from "react";
import Button from "@/components/Button";

interface QRTextProps {
  onGenerate: (text: string) => void;
}

export default function QRText({ onGenerate }: QRTextProps) {
  const [text, setText] = useState("");

  return (
    <>
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <Button onClick={() => onGenerate(text)} variant="primary">Generate QR Code</Button>
      </div>
    </>
  );
}

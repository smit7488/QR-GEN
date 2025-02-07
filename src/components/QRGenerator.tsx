"use client";

import { useState } from "react";

interface QRGeneratorProps {
  onGenerate: (text: string) => void;
  onUpload: (file: string | null) => void;
  qrType: "svg" | "canvas";
  setQrType: (type: "svg" | "canvas") => void;
}

export default function QRGenerator({
  onGenerate,
  onUpload,
  qrType,
  setQrType,
}: QRGeneratorProps) {
  const [text, setText] = useState("");

  const handleGenerate = () => {
    onGenerate(text);
  };

  const handleSVGUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-80 mb-4"
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate QR Code
      </button>

      <input
        type="file"
        accept="image/svg+xml"
        onChange={handleSVGUpload}
        className="mb-4"
      />

      <div className="mb-4">
        <label className="mr-4">QR Code Type:</label>
        <select
          value={qrType}
          onChange={(e) => setQrType(e.target.value as "svg" | "canvas")}
          className="border p-2 rounded"
        >
          <option value="svg">SVG</option>
          <option value="canvas">Canvas</option>
        </select>
      </div>
    </div>
  );
}

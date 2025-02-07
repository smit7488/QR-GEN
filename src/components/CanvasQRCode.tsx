"use client";

import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface CanvasQRCodeProps {
  text: string;
  uploadedSVG: string | null;
}

export default function CanvasQRCode({ text, uploadedSVG }: CanvasQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !uploadedSVG) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = uploadedSVG;
    img.onload = () => {
      ctx.drawImage(img, 75, 75, 50, 50); // Adjust position and size
    };
  }, [uploadedSVG]);

  const downloadQR = () => {
    if (!canvasRef.current) return;

    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "branded_qrcode.png";
    a.click();
  };

  return (
    <div className="relative mb-4">
      <QRCodeCanvas ref={canvasRef} value={text} size={200} className="relative" />
      <button onClick={downloadQR} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Download PNG
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import QRGenerator from "@/components/QRGenerator";
import SVGQRCode from "@/components/SVGQRCode";
import CanvasQRCode from "@/components/CanvasQRCode";

export default function Home() {
  const [qrData, setQrData] = useState("");
  const [uploadedSVG, setUploadedSVG] = useState<string | null>(null);
  const [qrType, setQrType] = useState<"svg" | "canvas">("svg");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>

      <QRGenerator onGenerate={setQrData} onUpload={setUploadedSVG} qrType={qrType} setQrType={setQrType} />

      {qrData &&
        (qrType === "svg" ? (
          <SVGQRCode text={qrData} uploadedSVG={uploadedSVG} />
        ) : (
          <CanvasQRCode text={qrData} uploadedSVG={uploadedSVG} />
        ))}
    </div>
  );
}

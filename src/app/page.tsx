"use client";

import { useEffect, useState } from "react";
import QRGenerator from "@/components/QRGenerator";
import SVGQRCode from "@/components/SVGQRCode";
import CanvasQRCode from "@/components/CanvasQRCode";
import QRHolder from "@/components/QRHolder";

export default function Home() {
  const [qrData, setQrData] = useState("");
  const [uploadedSVG, setUploadedSVG] = useState<string | null>(null);
  const [qrType, setQrType] = useState<"svg" | "canvas">("svg");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container grid grid-cols-1 md:grid-cols-[2fr_1fr] white-card">
         {/* Right Side (QR Generator Form) */}
         <div className="p-6">
        <QRGenerator
          onGenerate={setQrData}
          onUpload={setUploadedSVG}
          qrType={qrType}
          setQrType={setQrType}
        />
      </div>
      {/* Left Side (QR Code Display) */}
      <div className="flex justify-center items-center p-6 gray-bg">
        {isMounted && qrData ? (
          qrType === "svg" ? (
            <SVGQRCode text={qrData} uploadedSVG={uploadedSVG} />
          ) : (
            <CanvasQRCode text={qrData} uploadedSVG={uploadedSVG} />
          )
        ) : (
          <QRHolder />
        )}
      </div>

   
    </div>
  );
}

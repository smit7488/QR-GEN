"use client";

import { useEffect, useState } from "react";
import QRGenerator from "@/components/QRGenerator";
import SVGQRCode from "@/components/SVGQRCode";
import QRHolder from "@/components/QRHolder";
import Button from "@/components/Button";

export default function Page() {
  const [qrData, setQrData] = useState("");
  const [uploadedSVG, setUploadedSVG] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadSVG = () => {
    const svgElement = document.getElementById("qr-code");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = async () => {
    if (!qrData) return;

    const svgElement = document.getElementById("qr-code");
    if (!svgElement) return;

    // Convert SVG to a string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const encodedData = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

    // Create an image from the SVG
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = encodedData;

    img.onload = () => {
      setTimeout(() => {
        const canvas = document.createElement("canvas");
        const size = 900; // 3x size
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "white"; // Set background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);

        // Convert canvas to PNG
        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "qrcode-900x900.png";
        a.click();
      }, 200); // Allow image to load before drawing
    };

    img.onerror = (err) => {
      console.error("Error loading SVG for PNG conversion", err);
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="container grid grid-cols-1 md:grid-cols-[2fr_1fr] white-card">
        {/* Right Side (QR Generator Form) */}
        <div className="p-6 gray-bg border rounded">
          <QRGenerator onGenerate={setQrData} onUpload={setUploadedSVG} />
        </div>

        {/* Left Side (QR Code Display) */}
        <div className="flex flex-col items-center p-6">
          <QRHolder>
            {isMounted && qrData ? <SVGQRCode text={qrData} uploadedSVG={uploadedSVG} /> : null}
          </QRHolder>

          {/* Download Buttons Below QRHolder */}
          {isMounted && qrData && (
            <div className="mt-4 flex gap-4">
              <Button onClick={downloadSVG} variant="secondary">
                Download SVG
              </Button>
              <Button onClick={downloadPNG} variant="secondary">
                Download PNG
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

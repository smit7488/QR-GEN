"use client";

import { useEffect, useState } from "react";
import QRGenerator from "@/components/QRGenerator";
import SVGQRCode from "@/components/SVGQRCode";
import QRHolder from "@/components/QRHolder";
import Button from "@/components/Button";

import { Download } from "lucide-react";

export default function Page() {
  const [qrData, setQrData] = useState("");
  const [uploadedSVG, setUploadedSVG] = useState<string | null>(null);
  const [qrColor, setQrColor] = useState("#000000"); // Default QR color
  const [borderRadius, setBorderRadius] = useState(10); // Default border radius
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to update QR color
  const handleColorChange = (color: string) => {
    setQrColor(color);
  };

  // Function to update Border Radius
  const handleBorderRadiusChange = (radius: number) => {
    setBorderRadius(radius);
  };

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
  
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const encodedData = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
  
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = encodedData;
  
    img.onload = () => {
      setTimeout(() => {
        const canvas = document.createElement("canvas");
        const size = 900;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
  
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
  
        if (uploadedSVG) {
          const logo = new Image();
          logo.src = uploadedSVG;
          logo.crossOrigin = "anonymous";
  
          logo.onload = () => {
            const logoSize = size * 0.2; // 25% of QR code size
            const paddingSize = logoSize * 1.3; // 30% larger for padding
            const logoX = (size - logoSize) / 2;
            const logoY = (size - logoSize) / 2;
  
            // 🔹 Scale border radius to match 3x export size
            const scaledBorderRadius = borderRadius * 3;
  
            // Draw background padding with scaled border radius
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.roundRect(
              logoX - (paddingSize - logoSize) / 2,
              logoY - (paddingSize - logoSize) / 2,
              paddingSize,
              paddingSize,
              scaledBorderRadius
            );
            ctx.fill();
  
            // Draw logo
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
  
            // Convert canvas to PNG
            const pngUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = pngUrl;
            a.download = "qrcode-900x900.png";
            a.click();
          };
        } else {
          // Convert canvas to PNG if no logo
          const pngUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = pngUrl;
          a.download = "qrcode-900x900.png";
          a.click();
        }
      }, 200);
    };
  
    img.onerror = (err) => {
      console.error("Error loading SVG for PNG conversion", err);
    };
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center p-4 mt-16">
      <div className="container grid grid-cols-1 md:grid-cols-[2fr_1fr] white-card mt-16">
        {/* Right Side (QR Generator Form) */}
        <div className="p-6 gray-bg border rounded">
          <QRGenerator
            onGenerate={setQrData}
            onUpload={setUploadedSVG}
            onColorChange={handleColorChange}
            onBorderRadiusChange={handleBorderRadiusChange}
          />
        </div>

        {/* Left Side (QR Code Display) */}
        <div className="flex flex-col items-center p-6">
          <QRHolder>
            {isMounted && qrData ? (
              <SVGQRCode text={qrData} uploadedSVG={uploadedSVG} qrColor={qrColor} borderRadius={borderRadius} />
            ) : null}
          </QRHolder>

          {/* Download Buttons Below QRHolder */}
          {isMounted && qrData && (
            <div className="mt-4 flex gap-4">
              <Button onClick={downloadSVG} variant="secondary">
                <div className="flex gap-2">
                  <Download size={18} /> <span className="text-sm">SVG</span>
                </div>
              </Button>
              <Button onClick={downloadPNG} variant="secondary">
                <div className="flex gap-2">
                  <Download size={18} /> <span className="text-sm">PNG</span>
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

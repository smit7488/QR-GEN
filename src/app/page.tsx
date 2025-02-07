"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function Home() {
  const [text, setText] = useState("");
  const [qrData, setQrData] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [uploadedSVG, setUploadedSVG] = useState<string | null>(null);

  // Ensures hydration happens only after the component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generateQR = () => {
    setQrData(text);
  };

  const handleSVGUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedSVG(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const downloadQR = () => {
    if (!isMounted) return;

    const svgElement = document.getElementById("qr-code");
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "branded_qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator (With Branding)</h1>
      
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-80 mb-4"
      />

      <button
        onClick={generateQR}
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

      {/* Prevent Hydration Issues by Only Rendering QR Code After Mount */}
      {isMounted && qrData && (
        <div className="relative mb-4" style={{ width: 200, height: 200 }}>
          {/* QR Code SVG */}
          <QRCodeSVG id="qr-code" value={qrData} size={200} className="relative" />

          {/* Logo Overlay with Padding */}
          {uploadedSVG && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                width: 200,
                height: 200,
              }}
            >
              <div
                className="flex items-center justify-center bg-white shadow-lg"
                style={{
                  width: 50,
                  height: 50,
                  padding: 5, // Adds padding around the logo
                }}
              >
                <img
                  src={uploadedSVG}
                  alt="Uploaded Logo"
                  className="w-10 h-10" // Logo itself (inside padded container)
                />
              </div>
            </div>
          )}
        </div>
      )}

      {qrData && (
        <button
          onClick={downloadQR}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Download SVG
        </button>
      )}
    </div>
  );
}

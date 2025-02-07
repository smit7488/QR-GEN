"use client";

import { QRCodeSVG } from "qrcode.react";

interface SVGQRCodeProps {
  text: string;
  uploadedSVG: string | null;
}

export default function SVGQRCode({ text, uploadedSVG }: SVGQRCodeProps) {
  const downloadQR = () => {
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
    <div className="relative mb-4">
      <QRCodeSVG id="qr-code" value={text} size={200} className="relative" />
      {uploadedSVG && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ width: 200, height: 200 }}
        >
          <div
            className="bg-white rounded-full shadow-lg flex items-center justify-center"
            style={{ width: 50, height: 50, padding: 5 }}
          >
            <img src={uploadedSVG} alt="Logo" className="w-10 h-10" />
          </div>
        </div>
      )}
      <button onClick={downloadQR} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Download SVG
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import Card from "@/components/Card";
import QRText from "@/components/QRInputs/QRText";
import QRUrl from "@/components/QRInputs/QRUrl";
import QRPhone from "@/components/QRInputs/QRPhone";
import QREmail from "@/components/QRInputs/QREmail";
import QRSMS from "@/components/QRInputs/QRSMS";
import QRWiFi from "@/components/QRInputs/QRWiFi";
import QRVCard from "@/components/QRInputs/QRVCard";

interface QRGeneratorProps {
  onGenerate: (text: string) => void;
}

export default function QRGenerator({ onGenerate }: QRGeneratorProps) {
  const [qrType, setQrType] = useState("text");

  const qrTypes = [
    { type: "url", label: "URL" },
    { type: "text", label: "Text" },
    { type: "phone", label: "Phone" },
    { type: "email", label: "Email" },
    { type: "sms", label: "SMS" },
    { type: "wifi", label: "Wi-Fi" },
    { type: "vcard", label: "vCard" },
  ];

  return (
    <Card title="QR Code Generator">
      {/* QR Type Selection (Button Grid) */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {qrTypes.map(({ type, label }) => (
          <button
            key={type}
            className={`btn ${qrType === type ? "btn-primary" : "btn-outline"}`}
            onClick={() => setQrType(type)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Render the correct input component */}
      {qrType === "text" && <QRText onGenerate={onGenerate} />}
      {qrType === "url" && <QRUrl onGenerate={onGenerate} />}
      {qrType === "phone" && <QRPhone onGenerate={onGenerate} />}
      {qrType === "email" && <QREmail onGenerate={onGenerate} />}
      {qrType === "sms" && <QRSMS onGenerate={onGenerate} />}
      {qrType === "wifi" && <QRWiFi onGenerate={onGenerate} />}
      {qrType === "vcard" && <QRVCard onGenerate={onGenerate} />}
    </Card>
  );
}

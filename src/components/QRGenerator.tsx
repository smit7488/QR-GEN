"use client";

import { useState } from "react";
import Card from "@/components/Card";
import QRText from "@/components/QRInputs/QRText";
import QRUrl from "@/components/QRInputs/QRUrlAddress";
import QRPhone from "@/components/QRInputs/QRPhone";
import QREmail from "@/components/QRInputs/QREmail";
import QRSMS from "@/components/QRInputs/QRSMS";
import QRWiFi from "@/components/QRInputs/QRWiFi";
import QRVCard from "@/components/QRInputs/QRVCard";

// ✅ Import Lucide Icons
import { Globe, FileText, Phone, Mail, MessageSquare, Wifi, Contact } from "lucide-react";

interface QRGeneratorProps {
  onGenerate: (text: string) => void;
  onUpload: (file: string | null) => void;
}

export default function QRGenerator({ onGenerate }: QRGeneratorProps) {
  const [qrType, setQrType] = useState("url");

  // ✅ QR Types with Corresponding Icons
  const qrTypes = [
    { type: "url", label: "URL", icon: <Globe size={18} /> },
    { type: "text", label: "Text", icon: <FileText size={18} /> },
    { type: "phone", label: "Phone", icon: <Phone size={18} /> },
    { type: "email", label: "Email", icon: <Mail size={18} /> },
    { type: "sms", label: "SMS", icon: <MessageSquare size={18} /> },
    { type: "wifi", label: "Wi-Fi", icon: <Wifi size={18} /> },
    { type: "vcard", label: "vCard", icon: <Contact size={18} /> },
  ];

  return (
    <>
      {/* QR Type Selection (Button Grid) */}
      <Card>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          {qrTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              className={`btn flex items-center gap-2 justify-center ${
                qrType === type ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setQrType(type)}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </Card>

      {/* QR Input Fields Based on Selected Type */}
      <Card>
        {qrType === "text" && <QRText onGenerate={onGenerate} />}
        {qrType === "url" && <QRUrl onGenerate={onGenerate} />}
        {qrType === "phone" && <QRPhone onGenerate={onGenerate} />}
        {qrType === "email" && <QREmail onGenerate={onGenerate} />}
        {qrType === "sms" && <QRSMS onGenerate={onGenerate} />}
        {qrType === "wifi" && <QRWiFi onGenerate={onGenerate} />}
        {qrType === "vcard" && <QRVCard onGenerate={onGenerate} />}
      </Card>
    </>
  );
}

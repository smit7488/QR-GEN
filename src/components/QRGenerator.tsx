"use client";

import { useState } from "react";
import Card from "@/components/Card";
import BrandingSettings from "@/components/BrandingSettings";
import QRText from "@/components/QRInputs/QRText";
import QRUrl from "@/components/QRInputs/QRUrlAddress";
import QRPhone from "@/components/QRInputs/QRPhone";
import QREmail from "@/components/QRInputs/QREmail";
import QRSMS from "@/components/QRInputs/QRSMS";
import QRWiFi from "@/components/QRInputs/QRWiFi";
import QRVCard from "@/components/QRInputs/QRVCard";
import QREvent from "@/components/QRInputs/QREvent";
import QRLocation from "@/components/QRInputs/QRLocation";
import QRCrypto from "@/components/QRInputs/QRCrypto";


// Import Lucide Icons
import {
  Globe,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Wifi,
  Contact,
  Music,
  Apple,
  Users,
  CreditCard,
  Calendar,
  MapPin,
  Bitcoin,
  MessageCircle,
} from "lucide-react";

interface QRGeneratorProps {
  onGenerate: (text: string) => void;
  onUpload: (file: string | null) => void;
  onBorderRadiusChange: (radius: number) => void;
  onColorChange: (color: string) => void;
}

export default function QRGenerator({
  onGenerate,
  onUpload,
  onBorderRadiusChange,
  onColorChange,
}: QRGeneratorProps) {
  const [qrType, setQrType] = useState("url");

  // QR Types with Corresponding Icons
  const qrTypes = [
    { type: "url", label: "URL", icon: <Globe size={18} /> },
    { type: "text", label: "Text", icon: <FileText size={18} /> },
    { type: "phone", label: "Phone", icon: <Phone size={18} /> },
    { type: "email", label: "Email", icon: <Mail size={18} /> },
    { type: "sms", label: "SMS", icon: <MessageSquare size={18} /> },
    { type: "wifi", label: "Wi-Fi", icon: <Wifi size={18} /> },
    { type: "vcard", label: "vCard", icon: <Contact size={18} /> },
    { type: "event", label: "Event", icon: <Calendar size={18} /> },
    { type: "location", label: "Location", icon: <MapPin size={18} /> },
    { type: "crypto", label: "Crypto", icon: <Bitcoin size={18} /> },

  ];

  return (
    <>
      {/* QR Type Selection (Button Grid) */}
      <Card>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          {qrTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              className={`btn flex items-center gap-x-1 flex-wrap justify-center
                ${
                  qrType === type
                    ? "btn-outline btn-outline-selected dark:btn-outline-selected"
                    : "btn-outline dark:border-gray-500 dark:text-gray-300 dark:hover:border-gray-400"
                }`}
              onClick={() => setQrType(type)}
            >
              {icon} <span className="text-sm">{label}</span>
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

        {qrType === "event" && <QREvent onGenerate={onGenerate} />}
        {qrType === "location" && <QRLocation onGenerate={onGenerate} />}
        {qrType === "crypto" && <QRCrypto onGenerate={onGenerate} />}

      </Card>

      {/* Branding & Settings Accordion */}
      <div className="border-t mt-6 border-t-gray-300 dark:border-t-gray-600">
        <BrandingSettings
          onUpload={onUpload}
          onBorderRadiusChange={onBorderRadiusChange}
          onColorChange={onColorChange}
        />
      </div>
    </>
  );
}

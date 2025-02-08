import { useState } from "react";
import Button from "@/components/Button";

interface QREmailProps {
  onGenerate: (text: string) => void;
}

export default function QREmail({ onGenerate }: QREmailProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <>
    <div className="flex flex-col w-full">
      <input
        type="email"
        placeholder="Enter recipient email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <input
        type="text"
        placeholder="Enter subject..."
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <textarea
        placeholder="Enter email body..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 rounded w-full h-24 mb-4"
      />

      <Button
        onClick={() => onGenerate(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)}
        variant="primary"
      >
        Generate QR Code
      </Button>
      </div>
    </>
  );
}

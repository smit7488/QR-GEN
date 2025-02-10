import { useState } from "react"; 
import Button from "@/components/Button";

interface QREventProps {
  onGenerate: (text: string) => void;
}

export default function QREvent({ onGenerate }: QREventProps) {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerate = () => {
    const eventData = `BEGIN:VEVENT
SUMMARY:${eventName}
LOCATION:${location}
DTSTART:${startDate.replace(/[-:]/g, "")}
DTEND:${endDate.replace(/[-:]/g, "")}
END:VEVENT`;

    onGenerate(eventData);
  };

  return (
    <div className="flex flex-col">
      <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <input type="datetime-local" placeholder="Start Date & Time" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full mb-2 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <input type="datetime-local" placeholder="End Date & Time" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded w-full mb-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"/>
      <Button onClick={handleGenerate} variant="primary">Generate QR Code</Button>
    </div>
  );
}

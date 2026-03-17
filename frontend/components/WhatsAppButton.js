"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";

const WhatsAppButton = () => {
  const [number, setNumber] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/settings");
        setNumber(data.whatsapp || "");
      } catch (err) {
        console.error("Failed to fetch WhatsApp number:", err);
      }
    };
    fetchSettings();
  }, []);

  if (!number) return null; // Hide if number is not available

  return (
    <a
      href={`https://wa.me/${number.replace(/[^0-9]/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-gold hover:bg-gold-light p-4 rounded-full shadow-lg flex items-center justify-center transition-all animate-pulse"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={28} className="text-black" />
    </a>
  );
};

export default WhatsAppButton;
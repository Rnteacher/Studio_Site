"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";

interface StickyContactBarProps {
  email?: string;
  phone?: string;
}

export function StickyContactBar({ email, phone }: StickyContactBarProps) {
  if (!email && !phone) return null;

  const whatsappUrl = phone
    ? `https://wa.me/${phone.replace(/[^0-9+]/g, "").replace(/^\+/, "")}`
    : null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t shadow-lg z-50 animate-in slide-in-from-bottom-4">
      <div className="flex justify-around py-3 px-4">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center gap-1 text-gray-700 hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span className="text-[10px]">טלפון</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex flex-col items-center gap-1 text-gray-700 hover:text-primary transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="text-[10px]">אימייל</span>
          </a>
        )}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gray-700 hover:text-green-600 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-[10px]">WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
}

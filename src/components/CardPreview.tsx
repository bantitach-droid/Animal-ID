"use client";

import { QRCodeSVG } from "qrcode.react";
import { TEMPLATES } from "@/lib/templates";
import { useRef, useCallback } from "react";
import type { PetFormData } from "@/components/PetForm";

interface CardPreviewProps {
  data: PetFormData;
  petId?: string;
}

export default function CardPreview({ data, petId }: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const template = TEMPLATES.find((t) => t.id === data.templateId) || TEMPLATES[0];

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const profileUrl = petId ? `${baseUrl}/pet/${petId}` : `${baseUrl}/pet/preview`;

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = `${data.name || "pet"}-id-card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [data.name]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={cardRef}
        className={`w-[360px] rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${template.bgColor} border border-gray-200`}
      >
        {/* Card Header */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ backgroundColor: template.accentColor }}
        >
          <div className="flex items-center gap-2">
            <span className="text-white text-lg">🐾</span>
            <span className="text-white font-bold text-sm tracking-wider uppercase">
              Animal ID Card
            </span>
          </div>
          <span className="text-white/80 text-xs">
            {data.species === "dog" ? "🐕" : "🐈"}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex gap-4">
            {/* Pet Photo */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-white shadow-md">
              {data.imageUrl ? (
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-gray-100 to-gray-200">
                  {data.species === "dog" ? "🐕" : "🐈"}
                </div>
              )}
            </div>

            {/* Pet Info */}
            <div className="flex-1 min-w-0">
              <h3
                className="font-bold text-lg truncate"
                style={{ color: template.textColor }}
              >
                {data.name || "Pet Name"}
              </h3>
              <div className="mt-1 space-y-0.5">
                <InfoRow label="Breed" value={data.breed} color={template.textColor} />
                <InfoRow label="Gender" value={data.gender} color={template.textColor} />
                <InfoRow label="Age" value={data.age} color={template.textColor} />
                <InfoRow label="Weight" value={data.weight ? `${data.weight} kg` : undefined} color={template.textColor} />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-3 pt-3 border-t border-gray-200/60 grid grid-cols-2 gap-x-4 gap-y-1">
            <InfoRow label="Birthday" value={data.birthday} color={template.textColor} />
            <InfoRow label="Color" value={data.color} color={template.textColor} />
            {data.features && (
              <div className="col-span-2">
                <InfoRow label="Features" value={data.features} color={template.textColor} />
              </div>
            )}
          </div>

          {/* Owner & QR */}
          <div className="mt-3 pt-3 border-t border-gray-200/60 flex items-end justify-between">
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                Owner
              </p>
              <p
                className="text-sm font-medium truncate"
                style={{ color: template.textColor }}
              >
                {data.ownerName || "—"}
              </p>
              {data.ownerPhone && (
                <p className="text-xs text-gray-500">{data.ownerPhone}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <QRCodeSVG value={profileUrl} size={64} level="M" />
            </div>
          </div>
        </div>
      </div>

      {petId && (
        <button
          onClick={handleDownload}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm flex items-center gap-2"
        >
          📥 Download Card (PNG)
        </button>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  color,
}: {
  label: string;
  value?: string;
  color: string;
}) {
  if (!value) return null;
  return (
    <p className="text-xs">
      <span className="text-gray-400">{label}: </span>
      <span className="font-medium" style={{ color }}>
        {value}
      </span>
    </p>
  );
}

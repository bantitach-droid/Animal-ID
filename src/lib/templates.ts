export const TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design",
    bgColor: "from-white to-gray-50",
    accentColor: "#6366f1",
    textColor: "#1f2937",
  },
  {
    id: "cartoon",
    name: "Cartoon",
    description: "Fun and colorful cartoon style",
    bgColor: "from-yellow-50 to-orange-50",
    accentColor: "#f97316",
    textColor: "#92400e",
  },
  {
    id: "official",
    name: "Official ID",
    description: "Looks like a real ID card",
    bgColor: "from-blue-50 to-indigo-50",
    accentColor: "#3b82f6",
    textColor: "#1e3a5f",
  },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]["id"];

"use client";

import { useState, ChangeEvent } from "react";
import { TEMPLATES } from "@/lib/templates";

export interface PetFormData {
  name: string;
  species: string;
  breed: string;
  gender: string;
  age: string;
  weight: string;
  birthday: string;
  color: string;
  features: string;
  healthInfo: string;
  imageUrl: string;
  ownerName: string;
  ownerPhone: string;
  templateId: string;
}

export const defaultFormData: PetFormData = {
  name: "",
  species: "cat",
  breed: "",
  gender: "",
  age: "",
  weight: "",
  birthday: "",
  color: "",
  features: "",
  healthInfo: "",
  imageUrl: "",
  ownerName: "",
  ownerPhone: "",
  templateId: "minimal",
};

interface PetFormProps {
  data: PetFormData;
  onChange: (data: PetFormData) => void;
  onSubmit: (data: PetFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function PetForm({
  data,
  onChange,
  onSubmit,
  isLoading = false,
  submitLabel = "Save Pet Card",
}: PetFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(data.imageUrl || "");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      onChange({ ...data, imageUrl: result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template Selection */}
      <fieldset>
        <legend className="text-sm font-semibold text-gray-700 mb-2">
          🎨 Card Template
        </legend>
        <div className="grid grid-cols-3 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ ...data, templateId: t.id })}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                data.templateId === t.id
                  ? "border-indigo-500 bg-indigo-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className="w-8 h-8 rounded-full mx-auto mb-1"
                style={{ backgroundColor: t.accentColor }}
              />
              <p className="text-xs font-medium text-gray-700">{t.name}</p>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Pet Photo */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          📷 Pet Photo
        </label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex-shrink-0">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Pet"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">
                📷
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
      </div>

      {/* Species */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          🐾 Species
        </label>
        <div className="flex gap-3">
          {[
            { value: "cat", emoji: "🐈", label: "Cat" },
            { value: "dog", emoji: "🐕", label: "Dog" },
          ].map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange({ ...data, species: s.value })}
              className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                data.species === s.value
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pet Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Pet Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="e.g. Milo"
          required
        />
        <InputField
          label="Breed"
          name="breed"
          value={data.breed}
          onChange={handleChange}
          placeholder="e.g. Persian"
        />
        <SelectField
          label="Gender"
          name="gender"
          value={data.gender}
          onChange={handleChange}
          options={["Male", "Female"]}
        />
        <InputField
          label="Age"
          name="age"
          value={data.age}
          onChange={handleChange}
          placeholder="e.g. 2 years"
        />
        <InputField
          label="Weight (kg)"
          name="weight"
          value={data.weight}
          onChange={handleChange}
          placeholder="e.g. 4.5"
        />
        <InputField
          label="Birthday"
          name="birthday"
          value={data.birthday}
          onChange={handleChange}
          placeholder="e.g. 2022-01-15"
          type="date"
        />
        <InputField
          label="Color / Markings"
          name="color"
          value={data.color}
          onChange={handleChange}
          placeholder="e.g. Orange Tabby"
        />
        <InputField
          label="Special Features"
          name="features"
          value={data.features}
          onChange={handleChange}
          placeholder="e.g. Blue eyes"
        />
      </div>

      {/* Health Info */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          🏥 Health Information
        </label>
        <textarea
          name="healthInfo"
          value={data.healthInfo}
          onChange={handleChange}
          rows={3}
          placeholder="Vaccination records, allergies, medical conditions..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm resize-none"
        />
      </div>

      {/* Owner Info */}
      <fieldset className="bg-gray-50 rounded-xl p-4 space-y-4">
        <legend className="text-sm font-semibold text-gray-700">
          👤 Owner Information
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Owner Name"
            name="ownerName"
            value={data.ownerName}
            onChange={handleChange}
            placeholder="Your name"
          />
          <InputField
            label="Phone Number"
            name="ownerPhone"
            value={data.ownerPhone}
            onChange={handleChange}
            placeholder="e.g. 099-999-9999"
          />
        </div>
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !data.name}
        className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium text-gray-500 mb-1 block">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium text-gray-500 mb-1 block">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm bg-white"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

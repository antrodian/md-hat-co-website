"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  hatStyle: string;
  hatColor: string;
  patchShape: string;
  patchDescription: string;
  patchText: string;
  quantity: string;
  notes: string;
};

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  hatStyle: "",
  hatColor: "",
  patchShape: "",
  patchDescription: "",
  patchText: "",
  quantity: "1",
  notes: "",
};

const inputClass =
  "w-full bg-transparent border border-[#C67C3D]/20 text-[#F2E9DD] px-4 py-3 text-sm tracking-wide placeholder-[#8C857C]/50 focus:outline-none focus:border-[#C67C3D] transition-colors duration-200";

const labelClass =
  "block text-[#C67C3D] text-[10px] tracking-[0.35em] uppercase mb-2";

const selectClass =
  "w-full bg-[#2B2520] border border-[#C67C3D]/20 text-[#F2E9DD] px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-[#C67C3D] transition-colors duration-200 appearance-none cursor-pointer";

export default function CustomOrderForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-24 bg-[#2B2520]">
        <div className="text-center max-w-md">
          <div className="w-16 h-px bg-[#C67C3D] mx-auto mb-8" />
          <h2
            className="text-[#F2E9DD] text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Order Received.
          </h2>
          <p
            className="text-[#8C857C] text-sm leading-[1.8] mb-8"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Morgan will review your order and reach out to {form.email} within
            48 hours to confirm details and get your custom patch started.
          </p>
          <button
            onClick={() => { setForm(INITIAL); setSubmitted(false); }}
            className="text-[#C67C3D] text-xs tracking-[0.25em] uppercase border-b border-[#C67C3D]/40 hover:border-[#C67C3D] transition-colors duration-200"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Submit Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-16">

      {/* Section: Your Info */}
      <fieldset className="mb-14">
        <legend
          className="text-[#F2E9DD] text-lg font-bold mb-8 pb-3 border-b border-[#C67C3D]/20 w-full"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Your Info
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={set("name")}
              placeholder="Your name"
              className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }}
            />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={set("email")}
              placeholder="your@email.com"
              className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Phone <span className="text-[#8C857C]/60 normal-case tracking-normal">— optional</span></label>
            <input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="(555) 000-0000"
              className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }}
            />
          </div>
        </div>
      </fieldset>

      {/* Section: Hat Preferences */}
      <fieldset className="mb-14">
        <legend
          className="text-[#F2E9DD] text-lg font-bold mb-8 pb-3 border-b border-[#C67C3D]/20 w-full"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Hat Preferences
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <label className={labelClass}>Hat Style *</label>
            <select
              required
              value={form.hatStyle}
              onChange={set("hatStyle")}
              className={selectClass}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <option value="" disabled>Select a style</option>
              <option value="structured">Structured (baseball)</option>
              <option value="unstructured">Unstructured (dad hat)</option>
              <option value="trucker">Trucker (mesh back)</option>
              <option value="snapback">Snapback</option>
              <option value="unsure">Not sure — let Morgan choose</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-[42px] text-[#C67C3D]">↓</div>
          </div>
          <div>
            <label className={labelClass}>Hat Color *</label>
            <input
              type="text"
              required
              value={form.hatColor}
              onChange={set("hatColor")}
              placeholder="Black, Olive, Tan, Navy..."
              className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }}
            />
          </div>
        </div>
      </fieldset>

      {/* Section: Patch Design */}
      <fieldset className="mb-14">
        <legend
          className="text-[#F2E9DD] text-lg font-bold mb-8 pb-3 border-b border-[#C67C3D]/20 w-full"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Patch Design
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <label className={labelClass}>Patch Shape</label>
            <select
              value={form.patchShape}
              onChange={set("patchShape")}
              className={selectClass}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <option value="">No preference</option>
              <option value="rectangle">Rectangle</option>
              <option value="oval">Oval</option>
              <option value="circle">Circle</option>
              <option value="shield">Shield</option>
              <option value="custom">Custom shape</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-[42px] text-[#C67C3D]">↓</div>
          </div>
          <div>
            <label className={labelClass}>Text / Initials on Patch <span className="text-[#8C857C]/60 normal-case tracking-normal">— optional</span></label>
            <input
              type="text"
              value={form.patchText}
              onChange={set("patchText")}
              placeholder="AB, Montana, etc."
              className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Describe Your Design *</label>
          <textarea
            required
            value={form.patchDescription}
            onChange={set("patchDescription")}
            placeholder="What do you want on the patch? Animals, landscapes, logos, initials, a brand mark — describe it in as much or as little detail as you have."
            rows={5}
            className={`${inputClass} resize-none`}
            style={{ fontFamily: "var(--font-montserrat)" }}
          />
        </div>
      </fieldset>

      {/* Section: Order Details */}
      <fieldset className="mb-14">
        <legend
          className="text-[#F2E9DD] text-lg font-bold mb-8 pb-3 border-b border-[#C67C3D]/20 w-full"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Order Details
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClass}>Quantity *</label>
            <input
              type="number"
              required
              min={1}
              max={50}
              value={form.quantity}
              onChange={set("quantity")}
              className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Anything Else</label>
          <textarea
            value={form.notes}
            onChange={set("notes")}
            placeholder="Timeline, budget, reference images you'd like to share, or anything else Morgan should know."
            rows={4}
            className={`${inputClass} resize-none`}
            style={{ fontFamily: "var(--font-montserrat)" }}
          />
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          type="submit"
          className="inline-flex items-center gap-3 bg-[#8B1D1D] hover:bg-[#C67C3D] text-[#F2E9DD] px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Submit Order Request →
        </button>
        <p
          className="text-[#8C857C] text-xs leading-relaxed"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Morgan reviews every request personally and follows up within 48 hours.
        </p>
      </div>
    </form>
  );
}

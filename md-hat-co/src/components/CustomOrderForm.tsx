"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/Icons";

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
  name: "", email: "", phone: "", hatStyle: "", hatColor: "",
  patchShape: "", patchDescription: "", patchText: "", quantity: "1", notes: "",
};

const inputClass =
  "w-full bg-transparent border border-[#6B4F33]/30 text-[#F2EEE6] px-4 py-3 text-sm tracking-wide placeholder-[#C7B291]/40 focus:outline-none focus:border-[#6A6F43] transition-colors duration-200";

const labelClass =
  "block text-[#C7B291] text-[10px] tracking-[0.32em] uppercase mb-2";

const selectClass =
  "w-full bg-[#211A12] border border-[#6B4F33]/30 text-[#F2EEE6] px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-[#6A6F43] transition-colors duration-200 appearance-none cursor-pointer";

const legendClass =
  "text-[#F2EEE6] text-lg font-extrabold uppercase tracking-wide mb-8 pb-3 border-b border-[#6B4F33]/25 w-full";

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
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-24 bg-[#211A12]">
        <div className="text-center max-w-md">
          <div className="w-16 h-px bg-[#6A6F43] mx-auto mb-8" />
          <h2
            className="text-[#F2EEE6] text-3xl font-black uppercase tracking-tight mb-4"
            style={{ fontFamily: "var(--font-roboto-slab)" }}
          >
            Order Received.
          </h2>
          <p
            className="text-[#F2EEE6]/60 text-sm leading-[1.8] mb-8"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            We&apos;ll review your order and reach out to {form.email} within 48
            hours to confirm the details and get your custom patch started.
          </p>
          <button
            onClick={() => { setForm(INITIAL); setSubmitted(false); }}
            className="text-[#C7B291] text-xs tracking-[0.24em] uppercase border-b border-[#6B4F33] hover:border-[#6A6F43] hover:text-[#F2EEE6] transition-colors duration-200 cursor-pointer"
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
      {/* Your Info */}
      <fieldset className="mb-14">
        <legend className={legendClass} style={{ fontFamily: "var(--font-roboto-slab)" }}>
          Your Info
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass} htmlFor="name">Full Name *</label>
            <input id="name" type="text" required value={form.name} onChange={set("name")}
              placeholder="Your name" autoComplete="name" className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }} />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">Email *</label>
            <input id="email" type="email" required value={form.email} onChange={set("email")}
              placeholder="your@email.com" autoComplete="email" className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="phone">
              Phone <span className="text-[#C7B291]/50 normal-case tracking-normal">— optional</span>
            </label>
            <input id="phone" type="tel" value={form.phone} onChange={set("phone")}
              placeholder="(555) 000-0000" autoComplete="tel" className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }} />
          </div>
        </div>
      </fieldset>

      {/* Hat Preferences */}
      <fieldset className="mb-14">
        <legend className={legendClass} style={{ fontFamily: "var(--font-roboto-slab)" }}>
          Hat Preferences
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <label className={labelClass} htmlFor="hatStyle">Hat Style *</label>
            <select id="hatStyle" required value={form.hatStyle} onChange={set("hatStyle")}
              className={selectClass} style={{ fontFamily: "var(--font-montserrat)" }}>
              <option value="" disabled>Select a style</option>
              <option value="trucker">Trucker (mesh back)</option>
              <option value="structured">Structured (baseball)</option>
              <option value="unstructured">Unstructured (dad hat)</option>
              <option value="snapback">Snapback</option>
              <option value="unsure">Not sure — recommend one</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-[42px] text-[#6A6F43]">↓</div>
          </div>
          <div>
            <label className={labelClass} htmlFor="hatColor">Hat Color / Camo *</label>
            <input id="hatColor" type="text" required value={form.hatColor} onChange={set("hatColor")}
              placeholder="Blaze camo, bottomland, olive, black..." className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }} />
          </div>
        </div>
      </fieldset>

      {/* Patch Design */}
      <fieldset className="mb-14">
        <legend className={legendClass} style={{ fontFamily: "var(--font-roboto-slab)" }}>
          Patch Design
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <label className={labelClass} htmlFor="patchShape">Patch Shape</label>
            <select id="patchShape" value={form.patchShape} onChange={set("patchShape")}
              className={selectClass} style={{ fontFamily: "var(--font-montserrat)" }}>
              <option value="">No preference</option>
              <option value="circle">Circle</option>
              <option value="rectangle">Rectangle</option>
              <option value="oval">Oval</option>
              <option value="shield">Shield</option>
              <option value="custom">Custom shape</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-[42px] text-[#6A6F43]">↓</div>
          </div>
          <div>
            <label className={labelClass} htmlFor="patchText">
              Text / Initials <span className="text-[#C7B291]/50 normal-case tracking-normal">— optional</span>
            </label>
            <input id="patchText" type="text" value={form.patchText} onChange={set("patchText")}
              placeholder="Initials, ranch name, a date..." className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }} />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="patchDescription">Describe Your Design *</label>
          <textarea id="patchDescription" required value={form.patchDescription} onChange={set("patchDescription")}
            placeholder="Antlers, a duck, a landscape, a brand mark, initials — describe it in as much or as little detail as you have."
            rows={5} className={`${inputClass} resize-none`} style={{ fontFamily: "var(--font-montserrat)" }} />
        </div>
      </fieldset>

      {/* Order Details */}
      <fieldset className="mb-14">
        <legend className={legendClass} style={{ fontFamily: "var(--font-roboto-slab)" }}>
          Order Details
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClass} htmlFor="quantity">Quantity *</label>
            <input id="quantity" type="number" required min={1} max={50}
              value={form.quantity} onChange={set("quantity")} className={inputClass}
              style={{ fontFamily: "var(--font-montserrat)" }} />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="notes">Anything Else</label>
          <textarea id="notes" value={form.notes} onChange={set("notes")}
            placeholder="Timeline, budget, reference images you'd like to share, or anything else we should know."
            rows={4} className={`${inputClass} resize-none`} style={{ fontFamily: "var(--font-montserrat)" }} />
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 bg-[#3E4B34] hover:bg-[#6A6F43] text-[#F2EEE6] px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7B291] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211A12]"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Submit Order Request
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <p
          className="text-[#F2EEE6]/45 text-xs leading-relaxed"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          We review every request personally and follow up within 48 hours.
        </p>
      </div>
    </form>
  );
}

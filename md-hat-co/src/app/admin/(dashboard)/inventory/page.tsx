import { createClient } from "@/lib/supabase/server";
import { addHat } from "./actions";
import HatRow from "@/components/admin/HatRow";
import type { Hat } from "@/lib/types";

const fieldClass =
  "w-full border border-[#6B4F33]/30 bg-[#F2EEE6]/40 px-3 py-2.5 text-sm text-[#2E251B] transition-colors duration-200 focus:outline-none focus:border-[#6A6F43] focus-visible:ring-2 focus-visible:ring-[#6A6F43]";
const labelClass = "block text-[#2E251B]/50 text-[10px] tracking-[0.22em] uppercase mb-1.5";

export default async function InventoryPage() {
  const supabase = await createClient();
  const { data: hats } = await supabase
    .from("hats")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div style={{ fontFamily: "var(--font-montserrat)" }}>
      <p className="text-[#6B4F33] text-[10px] tracking-[0.32em] uppercase mb-2">What's On Hand</p>
      <h1
        className="text-[#2E251B] text-2xl font-black uppercase tracking-tight mb-8"
        style={{ fontFamily: "var(--font-roboto-slab)" }}
      >
        Inventory
      </h1>

      <form
        action={addHat}
        encType="multipart/form-data"
        className="bg-white border border-[#6B4F33]/15 p-6 mb-10 shadow-[0_16px_40px_-28px_rgba(46,37,27,0.5)] grid grid-cols-2 sm:grid-cols-3 gap-5"
      >
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass} htmlFor="name">Hat Name</label>
          <input id="name" name="name" required placeholder="The Blaze 112" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="patch">Patch</label>
          <select id="patch" name="patch" required className={`${fieldClass} cursor-pointer`}>
            <option value="Antler">Antler</option>
            <option value="Duck">Duck</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="style">Style</label>
          <select id="style" name="style" required className={`${fieldClass} cursor-pointer`}>
            <option value="Trucker">Trucker</option>
            <option value="Structured">Structured</option>
            <option value="Snapback">Snapback</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="price">Price ($)</label>
          <input id="price" name="price" type="number" step="0.01" min="0" required placeholder="42.00" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="qty">Qty On Hand</label>
          <input id="qty" name="qty" type="number" min="0" required placeholder="3" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="tag">Tag</label>
          <select id="tag" name="tag" className={`${fieldClass} cursor-pointer`}>
            <option value="">No tag</option>
            <option value="Bestseller">Bestseller</option>
            <option value="New">New</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass} htmlFor="photo">Photo</label>
          <input id="photo" name="photo" type="file" accept="image/*" required className={`${fieldClass} cursor-pointer file:cursor-pointer file:mr-3 file:border-0 file:bg-[#2E251B] file:text-[#F2EEE6] file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-wide`} />
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full bg-[#3E4B34] hover:bg-[#6A6F43] active:bg-[#3E4B34] text-[#F2EEE6] px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A6F43] focus-visible:ring-offset-2"
          >
            Add Hat
          </button>
        </div>
      </form>

      <div className="bg-white border border-[#6B4F33]/15 divide-y divide-[#6B4F33]/10 shadow-[0_16px_40px_-28px_rgba(46,37,27,0.5)]">
        {(hats as Hat[] | null)?.map((hat) => <HatRow key={hat.id} hat={hat} />)}
        {!hats?.length && (
          <p className="text-[#2E251B]/50 text-sm p-6">No hats yet — add your first one above.</p>
        )}
      </div>
    </div>
  );
}

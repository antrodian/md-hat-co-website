"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addHat(formData: FormData) {
  const supabase = await createClient();

  const photo = formData.get("photo") as File;
  const name = formData.get("name") as string;
  const patch = formData.get("patch") as string;
  const style = formData.get("style") as string;
  const price = Number(formData.get("price"));
  const qty = Number(formData.get("qty"));
  const tag = (formData.get("tag") as string) || null;

  if (!photo || photo.size === 0) throw new Error("Photo is required");

  const fileName = `${Date.now()}-${photo.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const { error: uploadError } = await supabase.storage
    .from("hat-photos")
    .upload(fileName, photo);

  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("hat-photos").getPublicUrl(fileName);

  const { error } = await supabase.from("hats").insert({
    name,
    patch,
    style,
    price,
    qty_on_hand: qty,
    image_url: publicUrl,
    tag,
    active: true,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/inventory");
  revalidatePath("/shop");
}

export async function updateQty(hatId: string, qty: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("hats")
    .update({ qty_on_hand: Math.max(0, qty) })
    .eq("id", hatId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/inventory");
  revalidatePath("/shop");
}

export async function toggleActive(hatId: string, active: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("hats").update({ active }).eq("id", hatId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/inventory");
  revalidatePath("/shop");
}

export async function deleteHat(hatId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("hats").delete().eq("id", hatId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/inventory");
  revalidatePath("/shop");
}

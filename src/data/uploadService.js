// data/uploadService.js

import { isFuture, isPast, isToday } from "date-fns";

import supabase from "../services/supabase";
import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// =========================
// DELETE
// =========================
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.error("❌ deleteGuests:", error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.error("❌ deleteCabins:", error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.error("❌ deleteBookings:", error.message);
}

// =========================
// CREATE
// =========================
async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.error("❌ createGuests:", error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.error("❌ createCabins:", error.message);
}

async function createBookings() {
  // get real IDs
  const { data: guestsIds, error: gError } = await supabase
    .from("guests")
    .select("id")
    .order("id");

  const { data: cabinsIds, error: cError } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  if (gError || cError) {
    console.error("❌ fetching IDs:", gError?.message || cError?.message);
    return;
  }

  const allGuestIds = guestsIds.map((g) => g.id);
  const allCabinIds = cabinsIds.map((c) => c.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);

    const numNights = subtractDates(booking.endDate, booking.startDate);

    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

    const extraPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;

    const totalPrice = cabinPrice + extraPrice;

    let status;

    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";

    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";

    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extraPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);

  if (error) console.error("❌ createBookings:", error.message);
}

// =========================
// GLOBAL CONTROL (DEBUG 🔥)
// =========================
async function shouldRunUpload() {
  const { data, error } = await supabase
    .from("app_meta")
    .select("value")
    .eq("key", "last_upload")
    .single();

  if (error || !data) {
    console.log("🟡 No previous upload found → WILL RUN");
    return true;
  }

  const lastRun = Number(data.value);
  const diff = Date.now() - lastRun;

  if (diff > 24 * 60 * 60 * 1000) {
    return true;
  }

  return false;
}

async function updateLastRun() {
  const { error } = await supabase.from("app_meta").upsert({
    key: "last_upload",
    value: Date.now().toString(),
  });

  if (error) console.error("❌ updateLastRun:", error.message);
  else console.log("💾 last_upload updated");
}

// =========================
// MAIN FUNCTION
// =========================
export async function uploadAllData() {
  console.log("🚀 Checking upload...");

  const shouldRun = await shouldRunUpload();

  if (!shouldRun) {
    return;
  }

  await deleteBookings();

  await deleteGuests();

  await deleteCabins();

  await createGuests();

  await createCabins();

  await createBookings();

  await updateLastRun();
}

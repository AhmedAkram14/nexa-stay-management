import { isFuture, isPast, isToday } from "date-fns";

import supabase from "../services/supabase";
import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

async function deleteGuests() {
  await supabase.from("guests").delete().gt("id", 0);
}

async function deleteCabins() {
  await supabase.from("cabins").delete().gt("id", 0);
}

async function deleteBookings() {
  await supabase.from("bookings").delete().gt("id", 0);
}

async function createGuests() {
  await supabase.from("guests").insert(guests);
}

async function createCabins() {
  await supabase.from("cabins").insert(cabins);
}

async function createBookings() {
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

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

  await supabase.from("bookings").insert(finalBookings);
}

export async function uploadAllData() {
  await deleteBookings();
  await deleteGuests();
  await deleteCabins();

  await createGuests();
  await createCabins();
  await createBookings();
}

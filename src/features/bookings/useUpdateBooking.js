import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditBooking } from "../../services/apiBookings";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { mutate: editBooking, isPending: isEditing } = useMutation({
    mutationFn: ({ newBookingData, id }) =>
      createEditBooking(newBookingData, id),
    onSuccess: (data, variables) => {
      toast.success("Booking edited successfully!");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking", String(variables.id)],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editBooking, isEditing };
}

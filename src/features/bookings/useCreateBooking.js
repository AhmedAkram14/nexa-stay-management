import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditBooking } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isPending } = useMutation({
    mutationFn: createEditBooking,
    onSuccess: () => {
      toast.success("Booking created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createBooking, isPending };
}

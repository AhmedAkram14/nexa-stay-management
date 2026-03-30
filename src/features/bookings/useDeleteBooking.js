import toast from 'react-hot-toast';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeleteing } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking Deleted Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error("Booking can not be deleted"),
  });

  return { deleteBooking, isDeleteing };
}

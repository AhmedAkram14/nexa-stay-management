import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateBooking } from '../../services/apiBookings';

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isChecking } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checkd in `);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error(`There was an error while checking in`);
    },
  });
  return { checkin, isChecking };
}

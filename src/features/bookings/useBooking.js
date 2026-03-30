import { useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';

import { getBooking } from '../../services/apiBookings';

export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { booking, error, isLoading };
}

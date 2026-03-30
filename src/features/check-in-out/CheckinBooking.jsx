import {
  useEffect,
  useState,
} from 'react';

import styled from 'styled-components';

import BookingDataBox from '../../features/bookings/BookingDataBox';
import { useMoveBack } from '../../hooks/useMoveBack';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import Checkbox from '../../ui/Checkbox';
import {
  DetailBackLink,
  DetailPageHeader,
  DetailTitleGroup,
} from '../../ui/DetailPageHeader';
import Heading from '../../ui/Heading';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import { useBooking } from '../bookings/useBooking';
import { useSettings } from '../settings/useSettings';
import { useChecking } from './useChecking';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 1.6rem 1.6rem;
  }
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);
  const moveBack = useMoveBack();
  const { checkin, isChecking } = useChecking();
  if (isLoading || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <DetailPageHeader>
        <DetailBackLink type="button" onClick={moveBack} aria-label="Go back">
          &larr; Back
        </DetailBackLink>
        <DetailTitleGroup>
          <Heading as="h1">Check in booking #{bookingId}</Heading>
        </DetailTitleGroup>
      </DetailPageHeader>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            checked={addBreakfast}
            id="breakfast"
          >
            {`Want to add breakfast? ${formatCurrency(optionalBreakfast)}`}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isChecking}
          checked={confirmPaid}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingId}{" "}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

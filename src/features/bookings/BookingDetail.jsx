import { useNavigate } from 'react-router';

import { useMoveBack } from '../../hooks/useMoveBack';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ConfirmDelete from '../../ui/ConfirmDelete';
import {
  DetailBackLink,
  DetailPageHeader,
  DetailTitleGroup,
} from '../../ui/DetailPageHeader';
import Empty from '../../ui/Empty';
import Heading from '../../ui/Heading';
import Modal from '../../ui/Modal';
import Spinner from '../../ui/Spinner';
import Tag from '../../ui/Tag';
import { useCheckOut } from '../check-in-out/useCheckOut';
import BookingDataBox from './BookingDataBox';
import CreateBookingForm from './CreateBookingForm';
import { useBooking } from './useBooking';
import { useDeleteBooking } from './useDeleteBooking';

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeleteing } = useDeleteBooking();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource={"booking"} />;
  const { status, id: bookingId } = booking;

  return (
    <>
      <DetailPageHeader>
        <DetailBackLink type="button" onClick={moveBack} aria-label="Go back">
          &larr; Back
        </DetailBackLink>
        <DetailTitleGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </DetailTitleGroup>
      </DetailPageHeader>

      <BookingDataBox booking={booking} isLoading={isLoading} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkOut(bookingId);
            }}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="edit-booking">
            <Button variation="secondary">Edit booking</Button>
          </Modal.Open>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="edit-booking">
            <CreateBookingForm bookingToEdit={booking} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              disabled={isDeleteing}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => {
                    navigate(-1);
                  },
                })
              }
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

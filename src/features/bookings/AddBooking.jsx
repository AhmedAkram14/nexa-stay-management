import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateBookingForm from './CreateBookingForm';

function AddBooking() {
  return (
    <Modal>
      <Modal.Open opens="booking-form">
        <div>
          <Button>Add new booking</Button>
        </div>
      </Modal.Open>

      <Modal.Window name="booking-form">
        {/* <FormLayoutProvider isModal> */}
        <CreateBookingForm />
        {/* </FormLayoutProvider> */}
      </Modal.Window>
    </Modal>
  );
}

export default AddBooking;

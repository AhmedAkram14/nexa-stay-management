import React from 'react';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <div>
          <Button>Add new cabin</Button>
        </div>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        {/* <FormLayoutProvider isModal> */}
        <CreateCabinForm />
        {/* </FormLayoutProvider> */}
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;

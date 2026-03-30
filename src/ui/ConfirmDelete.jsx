import styled from 'styled-components';

import Button from './Button';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
  width: 100%;
  max-width: 40rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-sizing: border-box;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
    word-break: break-word;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1.2rem;

    @media (max-width: 480px) {
      justify-content: stretch;

      & > * {
        flex: 1 1 12rem;
      }
    }
  }
`;

function ConfirmDelete({
  resource,
  onConfirm,
  disabled,
  closeModal,
  onCloseModal,
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resource}</Heading>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button variation="secondary" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

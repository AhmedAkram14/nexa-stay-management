import React, {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

import { useCloseModal } from '../hooks/useCloseModal';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: min(100vw - 2.4rem, 80rem); */
  max-width: calc(100vw - 2.4rem);
  max-height: min(90dvh, 96rem);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  padding-top: max(3.2rem, env(safe-area-inset-top, 0px));
  padding-bottom: max(3.2rem, env(safe-area-inset-bottom, 0px));
  transition: all 0.5s;

  @media (max-width: 640px) {
    width: calc(100vw - 1.6rem);
    max-width: calc(100vw - 1.6rem);
    padding: 2.8rem 1.6rem 2.4rem;
    padding-top: max(2.8rem, env(safe-area-inset-top, 0px));
    padding-bottom: max(2.4rem, env(safe-area-inset-bottom, 0px));
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  min-height: 100dvh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

export const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: openWindowName }) => {
  const { open } = useContext(ModalContext);

  if (!isValidElement(children)) {
    return children;
  }
  const existing = children.props?.onClick;
  return cloneElement(children, {
    onClick: (e) => {
      existing?.(e);
      open(openWindowName);
    },
  });
};

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const { ref } = useCloseModal(close);
  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button type="button" onClick={close} aria-label="Close dialog">
          <HiXMark />
        </Button>
        <div style={{ minWidth: 0 }}>
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.2rem;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-width: 0;

  @media (max-width: 640px) {
    justify-content: stretch;

    & > * {
      flex: 1 1 auto;
      min-width: min(100%, 14rem);
    }
  }
`;

export default ButtonGroup;

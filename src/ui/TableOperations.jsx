import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem 1.6rem;
  /* Natural width so the page title keeps space; full width only when stacked */
  flex: 0 0 auto;
  min-width: 0;
  max-width: 100%;
  justify-content: flex-end;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
`;

export default TableOperations;

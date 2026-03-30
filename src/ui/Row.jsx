import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      gap: 1.2rem 2.4rem;

      & > *:first-child {
        flex: 0 1 auto;
        min-width: min-content;
      }

      & > *:last-child {
        flex: 0 0 auto;
        margin-left: auto;
      }

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        flex-wrap: nowrap;

        & > *:last-child {
          margin-left: 0;
        }
      }
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;

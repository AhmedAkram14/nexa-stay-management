import styled, { css } from "styled-components";

const Form = styled.form`
  box-sizing: border-box;
  min-width: 0;

  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      @media (max-width: 640px) {
        padding: 2rem 1.6rem;
      }

      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
      max-width: 100%;
      min-width: 0;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;

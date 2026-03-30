import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: clamp(2.4rem, 5vw, 3rem);
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: clamp(1.8rem, 4vw, 2rem);
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: clamp(1.6rem, 3.5vw, 2rem);
      font-weight: 500;
    `}

  line-height: 1.4;
  min-width: 0;
`;

export default Heading;

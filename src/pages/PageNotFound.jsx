import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

const StyledPageNotFound = styled.main`
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem 1.6rem;
  box-sizing: border-box;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: clamp(2.4rem, 5vw, 4.8rem);
  flex: 0 1 96rem;
  width: 100%;
  max-width: 96rem;
  text-align: center;
  box-sizing: border-box;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button size="large" onClick={moveBack}>
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;

import React from "react";

import styled from "styled-components";

import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeadrMenu";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  min-width: 0;

  @media (max-width: 1024px) {
    padding: 1.2rem 2.4rem;
  }

  @media (max-width: 640px) {
    padding: 1rem 1.6rem;
    gap: 1.2rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;

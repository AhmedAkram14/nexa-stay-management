import React from 'react';

import { HiOutlineBars3 } from 'react-icons/hi2';
import styled from 'styled-components';

import Logo from '../ui/Logo';
import MainNav from '../ui/MainNav';

const ToggleRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
`;

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  padding: 0;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-600);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: var(--color-grey-50);
    border-color: var(--color-brand-200);
    color: var(--color-brand-600);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  flex: 1;
  min-height: 0;
  overflow: auto;
  overflow-x: hidden;
`;

const StyledSideBar = styled.aside`
  grid-area: sidebar;
  background-color: var(--color-grey-0);
  padding: ${({ $collapsed }) =>
    $collapsed ? "2.4rem 0.8rem" : "3.2rem 2.4rem"};
  border-right: 1px solid var(--color-grey-100);
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ $collapsed }) => ($collapsed ? "1.6rem" : "3.2rem")};
  transition:
    padding 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    gap 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
`;

const SideBar = ({ collapsed = false, onToggle = () => {} }) => {
  return (
    <StyledSideBar $collapsed={collapsed}>
      <ToggleRow>
        <ToggleButton
          type="button"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggle}
        >
          <HiOutlineBars3 />
        </ToggleButton>
      </ToggleRow>
      <Body>
        <Logo collapsed={collapsed} />
        <MainNav collapsed={collapsed} />
      </Body>
    </StyledSideBar>
  );
};

export default SideBar;

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const LABEL_MAX = "20rem";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ $collapsed }) => ($collapsed ? "0.4rem" : "0.8rem")};
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    transition:
      background-color 0.3s,
      color 0.3s,
      box-shadow 0.3s,
      gap 0.38s cubic-bezier(0.4, 0, 0.2, 1),
      padding 0.38s cubic-bezier(0.4, 0, 0.2, 1);

    ${({ $collapsed }) =>
      $collapsed
        ? css`
            position: relative;
            justify-content: center;
            padding: 1.2rem 1rem;
            gap: 0;
          `
        : css`
            justify-content: flex-start;
            gap: 1.2rem;
            padding: 1.2rem 2.4rem;
          `}
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  &.active:link,
  &.active:visited {
    ${({ $collapsed }) =>
      $collapsed &&
      css`
        box-shadow: inset 3px 0 0 var(--nav-collapsed-active-border);
      `}
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    flex-shrink: 0;
    transition: color 0.3s;
  }

  & span {
    display: inline-block;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;

    ${({ $collapsed }) =>
      $collapsed
        ? css`
            opacity: 0;
            max-width: 0;
            margin-inline-end: 0;
            visibility: hidden;
            transition:
              opacity 0.26s cubic-bezier(0.4, 0, 0.2, 1),
              max-width 0.42s cubic-bezier(0.4, 0, 0.2, 1),
              margin 0.38s cubic-bezier(0.4, 0, 0.2, 1),
              visibility 0s linear 0.35s;
          `
        : css`
            opacity: 1;
            max-width: ${LABEL_MAX};
            margin-inline-end: 0;
            visibility: visible;
            transition:
              opacity 0.32s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
              max-width 0.45s cubic-bezier(0.4, 0, 0.2, 1),
              margin 0.38s cubic-bezier(0.4, 0, 0.2, 1),
              visibility 0s linear 0s;
          `}
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ collapsed = false }) {
  return (
    <nav>
      <NavList $collapsed={collapsed}>
        <li>
          <StyledNavLink
            $collapsed={collapsed}
            to="/dashboard"
            title={collapsed ? "Home" : undefined}
            aria-label={collapsed ? "Home" : undefined}
            end
          >
            <HiOutlineHome />
            <span aria-hidden={collapsed}>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            $collapsed={collapsed}
            to="/bookings"
            title={collapsed ? "Bookings" : undefined}
            aria-label={collapsed ? "Bookings" : undefined}
          >
            <HiOutlineCalendarDays />
            <span aria-hidden={collapsed}>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            $collapsed={collapsed}
            to="/cabins"
            title={collapsed ? "Cabins" : undefined}
            aria-label={collapsed ? "Cabins" : undefined}
          >
            <HiOutlineHomeModern />
            <span aria-hidden={collapsed}>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            $collapsed={collapsed}
            to="/users"
            title={collapsed ? "Users" : undefined}
            aria-label={collapsed ? "Users" : undefined}
          >
            <HiOutlineUsers />
            <span aria-hidden={collapsed}>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            $collapsed={collapsed}
            to="/settings"
            title={collapsed ? "Settings" : undefined}
            aria-label={collapsed ? "Settings" : undefined}
          >
            <HiOutlineCog6Tooth />
            <span aria-hidden={collapsed}>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;

import React, { useEffect } from "react";

import { Outlet } from "react-router";
import styled from "styled-components";

import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Header from "../ui/Header";
import SideBar from "./SideBar";

const Main = styled.main`
  grid-area: main;
  min-width: 0;
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    padding: 3.2rem 2.4rem 5.6rem;
  }

  @media (max-width: 640px) {
    padding: 2.4rem 1.6rem 4.8rem;
  }
`;

const HeaderArea = styled.div`
  grid-area: header;
  min-width: 0;
`;

const SIDEBAR_EXPANDED = "26rem";
const SIDEBAR_COLLAPSED = "6.4rem";

const StyledAppLayout = styled.div`
  display: grid;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100dvh;
  grid-template-columns: ${({ $sidebarCollapsed }) =>
      $sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED}
    minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  transition: grid-template-columns 0.28s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  min-width: 0;

  @media (max-width: 640px) {
    gap: 2.4rem;
  }
`;

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorageState(
    false,
    "sidebarCollapsed",
  );
  const isNarrowViewport = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    if (isNarrowViewport) setSidebarCollapsed(true);
  }, [isNarrowViewport, setSidebarCollapsed]);

  return (
    <StyledAppLayout $sidebarCollapsed={sidebarCollapsed}>
      <SideBar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />
      <HeaderArea>
        <Header />
      </HeaderArea>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;

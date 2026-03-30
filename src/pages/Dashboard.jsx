import styled from "styled-components";

import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 1.6rem 2.4rem;
  width: 100%;
  min-width: 0;

  & h1 {
    font-size: clamp(2.4rem, 4.5vw, 3rem);
    line-height: 1.2;
  }

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
    gap: 1.2rem;

    & > *:last-child {
      margin-left: 0;
    }
  }
`;

function Dashboard() {
  return (
    <>
      <DashboardHeader>
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </DashboardHeader>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;

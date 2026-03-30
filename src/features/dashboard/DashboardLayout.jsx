import React from 'react';

import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import { useCabins } from '../cabins/useCabins';
import TodayActivity from '../check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  width: 100%;
  min-width: 0;
  gap: 2.4rem;
  align-content: start;
  /* Prevent grid items stretching to match a taller sibling in the same row */
  align-items: start;

  /* Explicit row heights only on wide layout (stats row / charts row / sales row).
     Below 1201px, a single column stack must NOT inherit a 28rem min on "row 2"
     — that was forcing the 2nd stat (Sales) to ~28rem tall on mobile. */
  @media (min-width: 1201px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: auto minmax(28rem, auto) auto;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
    grid-auto-rows: auto;
  }

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.6rem;
  }
`;

const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  if (isLoadingBookings || isLoading2 || isLoadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;

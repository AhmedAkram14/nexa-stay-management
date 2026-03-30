import React from 'react';

import {
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from 'react-icons/hi';
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
} from 'react-icons/hi2';

import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

const Stats = ({ bookings = [], confirmedStays, numDays, cabinCount }) => {
  const numBookings = bookings?.length;
  const sales = bookings.reduce((acc, cur) => {
    return acc + cur.totalPrice;
  }, 0);

  const checkins = confirmedStays.length;

  const totalNights = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0);
  const denom = numDays * (cabinCount || 0);
  const occupation = denom > 0 ? totalNights / denom : 0;
  return (
    <>
      <Stat
        title={"Bookings"}
        icon={<HiOutlineBriefcase />}
        color={"blue"}
        value={numBookings}
      />
      <Stat
        title={"Sales"}
        icon={<HiOutlineBanknotes />}
        color={"green"}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check ins"}
        icon={<HiOutlineCalendarDays />}
        color={"indigo"}
        value={checkins}
      />
      <Stat
        title={"Occupancy rate"}
        icon={<HiOutlineChartBar />}
        color={"yellow"}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};

export default Stats;

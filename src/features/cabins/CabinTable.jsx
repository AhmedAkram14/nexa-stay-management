import React from 'react';

import { useSearchParams } from 'react-router';

import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow ';
import { useCabins } from './useCabins';

const CabinTable = () => {
  const { cabins, isLoading, isError } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins
    ?.filter(Boolean)
    .slice()
    .sort((a, b) => {
      const av = a?.[field];
      const bv = b?.[field];
      const aNum = typeof av === "number" ? av : Number(av);
      const bNum = typeof bv === "number" ? bv : Number(bv);
      if (Number.isFinite(aNum) && Number.isFinite(bNum)) {
        return (aNum - bNum) * modifier;
      }
      return String(av ?? "").localeCompare(String(bv ?? "")) * modifier;
    });

  if (isLoading) return <Spinner />;
  if (isError) {
    return (
      <p style={{ color: "var(--color-red-700)" }}>
        Cabins could not be loaded. Please refresh the page or try again later.
      </p>
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;

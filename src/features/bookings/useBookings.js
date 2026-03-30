import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

function parsePage(raw) {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get("status");
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = useMemo(
    () => ({
      field,
      direction,
    }),
    [field, direction],
  );
  const filter = useMemo(
    () =>
      !filterValue || filterValue === "all"
        ? null
        : {
            field: "status",
            value: filterValue,
          },
    [filterValue],
  );
  const page = parsePage(searchParams.get("page"));
  const {
    data: { data: bookings, count } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  useEffect(() => {
    if (count == null || !Number.isFinite(count)) return;
    const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE));
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["bookings", filter, sortBy, page - 1],
        queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      });
    }
  }, [queryClient, filter, sortBy, page, count]);

  return { bookings, isLoading, isError, count };
}

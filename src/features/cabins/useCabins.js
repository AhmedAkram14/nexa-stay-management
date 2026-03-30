import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCapin";

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, isError };
}

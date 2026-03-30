import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditCabin } from "../../services/apiCapin";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin Created Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createCabin, isPending };
}

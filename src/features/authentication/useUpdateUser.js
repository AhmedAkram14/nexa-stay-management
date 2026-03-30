import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser } from "../../services/ApiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (result) => {
      const nextUser = result?.user ?? result;
      toast.success("User account successfully updated!");
      if (nextUser) queryClient.setQueryData(["user"], nextUser);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
}

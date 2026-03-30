import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/ApiAuth";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,

    onSuccess: (user) => {
      console.log(user);

      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
      );
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { signup, isPending };
}

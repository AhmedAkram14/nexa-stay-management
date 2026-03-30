import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { login as loginApi } from '../../services/ApiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provied email or password are incorrect");
    },
  });
  return { login, isPending };
}

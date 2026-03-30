import { useNavigate } from 'react-router';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { logout as logoutApi } from '../../services/ApiAuth';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isPending };
}

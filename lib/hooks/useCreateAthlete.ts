import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAthlete } from '@/lib/api/athletes';

export const useCreateAthlete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAthlete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['athletes'] });
    },
  });
};

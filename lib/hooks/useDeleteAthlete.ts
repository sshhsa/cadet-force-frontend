import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAthlete } from '@/lib/api/athletes';

export const useDeleteAthlete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAthlete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['athletes'] });
    },
  });
};

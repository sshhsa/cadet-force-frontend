import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAthlete } from '@/lib/api/athletes';
import type { UpdateAthletePayload } from '@/types/athlete';

interface UpdateAthleteArgs {
  id: string;
  payload: UpdateAthletePayload;
}

export const useUpdateAthlete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateAthleteArgs) => updateAthlete(id, payload),
    onSuccess: (updatedAthlete) => {
      queryClient.invalidateQueries({ queryKey: ['athletes'] });
      queryClient.invalidateQueries({ queryKey: ['athlete', updatedAthlete._id] });
    },
  });
};

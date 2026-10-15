import { useQuery } from '@tanstack/react-query';

import { getAthleteById } from '@/lib/api/athletes';

export const useAthlete = (id: string) => {
  return useQuery({
    queryKey: ['athlete', id],
    queryFn: () => getAthleteById(id),
    enabled: Boolean(id),
  });
};

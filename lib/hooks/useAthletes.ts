import { useQuery } from '@tanstack/react-query';

import { getAthletes } from '@/lib/api/athletes';

export const useAthletes = () => {
  return useQuery({
    queryKey: ['athletes'],
    queryFn: getAthletes,
  });
};

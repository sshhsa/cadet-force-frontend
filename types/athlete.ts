export type Sport =
  | 'sambo'
  | 'thai-boxing'
  | 'athletics'
  | 'football'
  | 'kickboxing'
  | 'judo'
  | 'fpv-drones'
  | 'basketball'
  | 'boxing'
  | 'volleyball'
  | 'kettlebell'
  | 'table-tennis'
  | 'swimming'
  | 'hand-to-hand'
  | 'thai-boxing-kickboxing'
  | 'chess';

export interface Athlete {
  _id: string;
  name: string;
  department: string;
  course: number;
  sport: Sport;
  rank: string;
  birthDate: string | null;
  weightCategory: string | null;
  achievements: string;
  avatarURL: string | null;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAthletePayload {
  name: string;
  department: string;
  course: number;
  sport: Sport;
  rank: string;
  birthDate?: string;
  weightCategory?: string;
  achievements?: string;
}

export type UpdateAthletePayload = Partial<CreateAthletePayload>;

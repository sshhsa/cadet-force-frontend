export type Sport =
  | "sambo"
  | "thai-boxing"
  | "athletics"
  | "football"
  | "kickboxing"
  | "judo";

export interface Athlete {
  _id: string;
  name: string;
  department: string;
  course: number;
  sport: Sport;
  rank: string;
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
  achievements?: string;
}

export type UpdateAthletePayload = Partial<CreateAthletePayload>;

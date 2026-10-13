import { api } from './client';
import type { Athlete, CreateAthletePayload, UpdateAthletePayload } from '@/types/athlete';

export const getAthletes = async (): Promise<Athlete[]> => {
  const { data } = await api.get<Athlete[]>('/athletes');
  return data;
};

export const getAthleteById = async (id: string): Promise<Athlete> => {
  const { data } = await api.get<Athlete>(`/athletes/${id}`);
  return data;
};

export const createAthlete = async (payload: CreateAthletePayload): Promise<Athlete> => {
  const { data } = await api.post<Athlete>('/athletes', payload);
  return data;
};

export const updateAthlete = async (
  id: string,
  payload: UpdateAthletePayload
): Promise<Athlete> => {
  const { data } = await api.patch<Athlete>(`/athletes/${id}`, payload);
  return data;
};

export const deleteAthlete = async (id: string): Promise<Athlete> => {
  const { data } = await api.delete<Athlete>(`/athletes/${id}`);
  return data;
};

export const updateAthleteAvatar = async (id: string, avatar: File): Promise<Athlete> => {
  const formData = new FormData();
  formData.append('avatar', avatar);
  const { data } = await api.patch<Athlete>(`/athletes/${id}/avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

import { api } from "./client";
import type { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types/auth";

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
};

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/current");
  return data;
};

export const verifyEmail = async (verificationToken: string): Promise<void> => {
  await api.get(`/auth/verify/${verificationToken}`);
};

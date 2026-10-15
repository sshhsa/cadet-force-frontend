import AuthGuard from '@/components/AuthGuard/AuthGuard';

export default function NewAthleteLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

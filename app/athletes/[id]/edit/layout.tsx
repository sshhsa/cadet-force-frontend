import AuthGuard from '@/components/AuthGuard/AuthGuard';

export default function EditAthleteLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

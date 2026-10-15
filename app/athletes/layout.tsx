import AuthGuard from '@/components/AuthGuard/AuthGuard';

export default function AthletesLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

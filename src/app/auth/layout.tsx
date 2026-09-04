import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Cybersecurity Platform',
  description: 'Sign in to your security account',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

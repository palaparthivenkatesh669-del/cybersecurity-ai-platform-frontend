import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import '@/styles/globals.css';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'Cybersecurity AI Platform',
  description: 'Advanced AI-powered cybersecurity threat detection and response platform',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

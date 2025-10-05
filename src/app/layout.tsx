'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  // Read the client ID from the environment variable
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable is not set');
  }

  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={googleClientId}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
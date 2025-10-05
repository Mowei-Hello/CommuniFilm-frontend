'use client';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useState } from 'react';

export default function Home() {
  const [userInfo, setUserInfo] = useState<{ token: string } | null>(null);
  const [backendResponse, setBackendResponse] = useState('');

  // Function to handle successful Google login
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    // The credentialResponse object contains the JWT ID token
    const idToken = credentialResponse.credential;
    if (!idToken) {
      setBackendResponse('No credential received from Google.');
      return;
    }
    setUserInfo({ token: idToken });

    // Send the token to your Spring Boot backend
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.text();
        setBackendResponse(responseData);
      } else {
        const errorText = await response.text();
        setBackendResponse(`Error from backend: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
      setBackendResponse('Failed to connect to the backend.');
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Communifilm Frontend</h1>
      <p>Click the button below to sign in with Google and test the backend.</p>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />

      {userInfo && (
        <div style={{ marginTop: '2rem', wordBreak: 'break-all' }}>
          <h2>Authentication Successful 🎊</h2>
        </div>
      )}

      {backendResponse && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Backend Response</h2>
          <pre style={{ background: '#f0f0f0', padding: '1rem' }}>{backendResponse}</pre>
        </div>
      )}
    </main>
  );
}
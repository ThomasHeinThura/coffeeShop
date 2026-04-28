import React, { useState } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://api.bimats.com/coffee/1';
const APIM_SUBSCRIPTION_KEY = process.env.REACT_APP_APIM_SUBSCRIPTION_KEY || '';

export default function App() {
  const { state, signIn, signOut, getHttpClient, getAccessToken } = useAuthContext();
  const [data, setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // 1) While the SDK hydrates any existing session…
  if (state.isLoading) {
    return <p style={{ padding: 20 }}>Checking session…</p>;
  }

  // 2) If not signed in, show login…
  if (!state.isAuthenticated) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
        <h1>☕ Coffee Shop</h1>
        <button onClick={() => signIn()}>Login</button>
      </div>
    );
  }

  // 3) Once signed in, show logout + API buttons…
  async function callApi(path) {
    setLoading(true);
    setError('');
    setData(null);

    try {
      // Try the built-in HTTP client first; it can attach the token automatically.
      const client = getHttpClient();
      const resp   = await client.get(`${API_BASE}/${path}`, {
        headers: APIM_SUBSCRIPTION_KEY
          ? { 'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY }
          : {}
      });
      return setData(resp.data);

    } catch {
      // Fallback: fetch manually with a token from the auth SDK.
      try {
        const token = await getAccessToken();
        const resp  = await fetch(`${API_BASE}/${path}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(APIM_SUBSCRIPTION_KEY
              ? { 'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY }
              : {})
          }
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        setData(await resp.json());
      } catch (e) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Welcome! ☕</h1>
      <button onClick={() => signOut()}>Logout</button>
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => callApi('hot')}  disabled={loading}>Hot ☕</button>{' '}
        <button onClick={() => callApi('iced')} disabled={loading}>Iced ❄️</button>
      </div>
      {loading && <p>Loading…</p>}
      {error   && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data    && (
        <pre style={{
          background: '#f0f0f0',
          padding: 10,
          borderRadius: 4,
          maxHeight: '60vh',
          overflow: 'auto'
        }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
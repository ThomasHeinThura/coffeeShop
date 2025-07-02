// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from '@asgardeo/auth-react';

const authConfig = {
  signInRedirectURL:  window.location.origin,
  signOutRedirectURL: window.location.origin,
  clientID:           'PPDtMb34gueFOXU5h9YAFanD98Ma',
  baseUrl:            'https://iam.bimats.com',
  scope:              [''],

  // Make sure calls to your API host get the token attached:
  resourceServerURLs: ['https://gw.bimats.com']   //  [oai_citation:0‡npm](https://www.npmjs.com/package/%40asgardeo/auth-react)
};

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <AuthProvider config={authConfig}>
    <App />
  </AuthProvider>
);
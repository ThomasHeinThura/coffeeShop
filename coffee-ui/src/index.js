// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from '@asgardeo/auth-react';

const siteUrl = process.env.REACT_APP_SITE_URL || window.location.origin;

const authConfig = {
  signInRedirectURL:  process.env.REACT_APP_SIGN_IN_REDIRECT_URL || `${siteUrl}/`,
  signOutRedirectURL: process.env.REACT_APP_SIGN_OUT_REDIRECT_URL || `${siteUrl}/`,
  clientID:           process.env.REACT_APP_ASGARDEO_CLIENT_ID || 'REPLACE_WITH_ASGARDEO_CLIENT_ID',
  baseUrl:            process.env.REACT_APP_ASGARDEO_BASE_URL || 'https://iam.bimats.com',
  scope:              [''],

  // Make sure calls to your API host get the token attached:
  resourceServerURLs: [process.env.REACT_APP_RESOURCE_SERVER_URL || 'https://api.bimats.com']
};

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <AuthProvider config={authConfig}>
    <App />
  </AuthProvider>
);
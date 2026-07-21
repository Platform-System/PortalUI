import { getApiClient, getPublicApiClient, getKeycloak, getValidToken as getValidTokenShared, configureApiClient } from '@system/api-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.nyxoris.com';
const KEYCLOAK_URL = process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'https://auth.nyxoris.com';
const KEYCLOAK_REALM = process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'platform';
const KEYCLOAK_CLIENT_ID = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'portal-web';

configureApiClient({
  baseURL: API_URL,
  keycloak: {
    url: KEYCLOAK_URL,
    realm: KEYCLOAK_REALM,
    clientId: KEYCLOAK_CLIENT_ID,
    redirectUri: typeof window !== 'undefined' ? window.location.origin : undefined,
  },
  onUnauthorized: () => {
    console.warn('Session expired or unauthorized');
  },
});

export const apiClient = getApiClient();
export const publicApiClient = getPublicApiClient();
export const keycloak = getKeycloak();
export const getValidToken = getValidTokenShared;

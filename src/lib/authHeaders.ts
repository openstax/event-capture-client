export interface AuthGlobals {
  _OX_AUTH_TOKEN?: string | undefined;
  _OX_LAUNCH_TOKEN?: string | undefined;
}

/**
 * Builds request headers from the auth globals a host page sets before
 * loading the standalone script:
 * - `_OX_AUTH_TOKEN`: Accounts SSO token, sent as a Bearer token
 * - `_OX_LAUNCH_TOKEN`: OpenStax launch token, sent as `x-launch-token`
 */
export const getAuthHeaders = (globals: AuthGlobals): Record<string, string> => {
  const headers: Record<string, string> = {};

  if (globals._OX_AUTH_TOKEN) {
    headers.Authorization = `Bearer ${globals._OX_AUTH_TOKEN}`;
  }
  if (globals._OX_LAUNCH_TOKEN) {
    headers['x-launch-token'] = globals._OX_LAUNCH_TOKEN;
  }

  return headers;
};

import cookiesEnabled from '@f/cookies-enabled';

const SESSION_KEY = '_session';

function forceToken() {
  try {
    return process.env.FORCE_TOKEN;
  } catch {
    return null;
  }
}

export function preferredSessionType() {
  return typeof navigator !== 'undefined' && cookiesEnabled() && !forceToken()
    ? 'cookie'
    : 'token';
}

export function set(key: string) {
  try {
    localStorage.setItem(SESSION_KEY, key);
  } catch (e) {
    // cookies disabled
  }
}

export function unset() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    // cookies disabled
  }
}

export function get() {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch (e) {
    // cookies disabled
  }
  return null;
}

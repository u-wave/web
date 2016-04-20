const SESSION_KEY = '_session';

export function set(jwt) {
  try {
    localStorage.setItem(SESSION_KEY, jwt);
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

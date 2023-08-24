const KNEEBOARD_CACHE = 'DWE-kneeboard-'

export function load(id: string) {
  return localStorage.getItem(KNEEBOARD_CACHE + id);
}
export function save(id: string, value: string) {
  if (value === false) localStorage.removeItem(KNEEBOARD_CACHE + id)
  else localStorage.setItem(KNEEBOARD_CACHE + id, value);
  return value;
}
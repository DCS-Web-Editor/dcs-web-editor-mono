const KNEEBOARD_CACHE = 'DWE-kneeboard-'

export function load(id: string) {
  return localStorage.getItem(KNEEBOARD_CACHE + id);
}
export function save(id: string, value: string) {
  localStorage.setItem(KNEEBOARD_CACHE + id, value);
  return value;
}
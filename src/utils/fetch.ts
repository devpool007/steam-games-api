export async function fetchSteamAPI<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Steam API Error: ${res.statusText}`);
  return res.json() as Promise<T>;
}

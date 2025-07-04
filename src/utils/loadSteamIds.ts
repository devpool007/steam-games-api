// src/utils/loadSteamIDs.ts
import fs from 'fs/promises';

export async function loadCachedAppList(): Promise<{ [key: string]: string }> {
  const data = await fs.readFile('../data/steam_app_list.json', 'utf-8');
  return JSON.parse(data);
}

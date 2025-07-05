import { loadCachedAppList } from "../utils/loadSteamIds";

export async function getSteamGameNamefromID(
  appid: string
): Promise<string | undefined> {
  const appMap = await loadCachedAppList();

  // Since the data is an object (a map of ID -> Name), we iterate through its entries.
  for (const [appId, name] of Object.entries(appMap)) {
    if (appId === appid) {
      return name;
    }
  }

  // If the loop completes without finding a match, the game is not in our list.
  return undefined;
}

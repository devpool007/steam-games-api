import { loadCachedAppList } from "../utils/loadSteamIds";

export async function getSteamIDforGame(
  gameName: string
): Promise<number | undefined> {
  const appMap = await loadCachedAppList();

  // Since the data is an object (a map of ID -> Name), we iterate through its entries.
  for (const [appId, name] of Object.entries(appMap)) {
    // We compare the game name from the file with the one provided.
    if (name.toLowerCase().includes(gameName.toLowerCase())) {
      // The key (appId) is a string, so we parse it into a number before returning.
      return parseInt(appId, 10);
    }
  }

  // If the loop completes without finding a match, the game is not in our list.
  return undefined;
}


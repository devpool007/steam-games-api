// import { loadCachedAppList } from "../utils/loadSteamIds";
import { getSteamIDList } from "./getSteamIDList";
export async function getSteamIDsForGame(
  gameName: string
): Promise<number [] | undefined> {
  const appList = await getSteamIDList();
  const appMap = appList.applist.apps.app;

    // Find *all* games whose name contains the search string (case-insensitive)
  const matches = appMap.filter((app: { appid: number; name: string }) =>
    app.name.toLowerCase().includes(gameName.toLowerCase())
  );

  // Return only the IDs
  return matches.map((app: { appid: number }) => app.appid);
}


// --- Quick test runner ---
(async () => {
  const id = await getSteamIDsForGame("Skyrim");
  if (id) {
    console.log("Found appid:", id);
  } else {
    console.log("Game not found.");
  }

  const id2 = await getSteamIDsForGame("Nonexistent Game");
  console.log("Nonexistent Game →", id2);
})();

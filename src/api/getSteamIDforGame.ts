// import { loadCachedAppList } from "../utils/loadSteamIds";
import { getSteamIDList } from "./getSteamIDList";
import Fuse from "fuse.js";
export async function getSteamIDforGame(
  gameName: string, threshold: number
): Promise<number | undefined> {
  const appList = await getSteamIDList();
  const appMap = appList.applist.apps.app;

    // Configure Fuse
  const fuse = new Fuse(appMap, {
    keys: ["name"],
    threshold: threshold, // lower = stricter matching
    ignoreLocation: false,
  });

    // Search
  const results = fuse.search(gameName);

  // Find the first game whose name contains the search string (case-insensitive)
  // const match = appMap.find((app: { appid: number; name: string }) =>
  //   app.name.toLowerCase().includes(gameName.toLowerCase())
  // );

  return results.length > 0 ? results[0].item.appid : undefined;
}

// --- Quick test runner ---
// (async () => {
//   const id = await getSteamIDforGame("Witcher 3");
//   if (id) {
//     console.log("Found appid:", id);
//   } else {
//     console.log("Game not found.");
//   }

//   const id2 = await getSteamIDforGame("Nonexistent Game");
//   console.log("Nonexistent Game →", id2);
// })();

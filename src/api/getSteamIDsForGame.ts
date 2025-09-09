// import { loadCachedAppList } from "../utils/loadSteamIds";
import { getSteamIDList } from "./getSteamIDList";
import Fuse from "fuse.js";

export async function getSteamIDsforGame(
  gameName: string
): Promise<number[] | undefined> {
  const appList = await getSteamIDList();
  const appMap = appList.applist.apps.app;

  // Configure Fuse
  const fuse = new Fuse(appMap, {
    keys: ["name"],
    threshold: 0.2, // lower = stricter matching
    ignoreLocation: false,
  });

  // Search
  const results = fuse.search(gameName);

  // Return IDs only
  return results.map((r) => r.item.appid);
}

// --- Quick test runner ---
// (async () => {
//   const id = await getSteamIDsforGame("Batman Arkham");
//   if (id) {
//     console.log("Found appid:", id);
//   } else {
//     console.log("Game not found.");
//   }

//   const id2 = await getSteamIDsforGame("Nonexistent Game");
//   console.log("Nonexistent Game →", id2);
// })();

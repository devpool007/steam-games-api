// import { loadCachedAppList } from "../utils/loadSteamIds";
import { getSteamIDList } from "./getSteamIDList";
export async function getSteamIDforGame(
  gameName: string
): Promise<number | undefined> {
  const appList = await getSteamIDList();
  const appMap = appList.applist.apps.app;

  // Find the first game whose name contains the search string (case-insensitive)
  const match = appMap.find((app: { appid: number; name: string }) =>
    app.name.toLowerCase().includes(gameName.toLowerCase())
  );

  return match?.appid;
}

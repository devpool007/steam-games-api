import { getSteamIDList } from "./getSteamIDList";

export async function getSteamGameNamefromID(
  appid: number
): Promise<string | undefined> {
  const appList = await getSteamIDList();
  const appMap = appList.applist.apps.app;

  // Find the first game whose name contains the search string (case-insensitive)
  const match = appMap.find(
    (app: { appid: number; name: string }) => app.appid === appid
  );

    return match?.name;
}
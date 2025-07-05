import { ListAPIResponse } from "../types/steam";
export async function getSteamIDList(): Promise<ListAPIResponse> {
  const response = await fetch(
    "http://api.steampowered.com/ISteamApps/GetAppList/v0001/"
  );

  const data = await response.json();

  return data;
}

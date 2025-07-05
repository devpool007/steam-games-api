import { APIResponse } from "../types/steam";
export async function getSteamGameDetails(
  appid: number,
  country?: string
): Promise<APIResponse> {
  const response = await fetch(
    `http://store.steampowered.com/api/appdetails?appids=${appid}&cc=${country}`
  );

  const data = await response.json();

  // The API returns an object with the appid as the key
  const gameData = data[appid];
  return gameData;

}
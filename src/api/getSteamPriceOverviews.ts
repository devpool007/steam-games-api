import { PriceAPIResponse } from "../types/steam";

export async function getSteamPriceOverview(
  appids: number[],
  country?: string
): Promise<PriceAPIResponse> {
  const appidsParam = appids.join(",");
  const response = await fetch(
    `http://store.steampowered.com/api/appdetails?filters=price_overview&appids=${appidsParam}&cc=${country}`
  );

  const data = await response.json();

  return data;
}


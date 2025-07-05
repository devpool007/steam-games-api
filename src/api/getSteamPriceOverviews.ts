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

// Example usage
async function testGetSteamGameDetails() {
  const appids = [3240220, 292030];
  const country = "de"; // Example country code

  try {
    const result = await getSteamPriceOverview(appids, country);

    for (const appid of appids) {
      const price = result[appid]?.data?.price_overview?.final_formatted;
      console.log(`Price of game with appid ${appid}:`, price);
    }
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
}

// Call the test
// testGetSteamGameDetails();

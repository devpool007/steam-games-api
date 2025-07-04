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
  //   return "No data for this appid!";
}



// Example usage function
async function testGetSteamGameDetails() {
  const appid = 292030; // The Witcher 3: Wild Hunt
  const country = "de";   // Example country code

  try {
    const result = await getSteamGameDetails(appid, country);
    console.log("Game name:", result.data.name);
    console.log("Game price details:", result.data.price_overview);
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
}

// Call the test
testGetSteamGameDetails();
import { loadCachedAppList } from "../utils/loadSteamIds";

export async function getSteamIDforGame(
  gameName: string
): Promise<number | undefined> {
  const appMap = await loadCachedAppList();

  // Since the data is an object (a map of ID -> Name), we iterate through its entries.
  for (const [appId, name] of Object.entries(appMap)) {
    // We compare the game name from the file with the one provided.
    if (name.toLowerCase().includes(gameName.toLowerCase())) {
      // The key (appId) is a string, so we parse it into a number before returning.
      return parseInt(appId, 10);
    }
  }

  // If the loop completes without finding a match, the game is not in our list.
  return undefined;
}

// Example of how to run the function and see the output
async function findGame() {
  // This requires your actual `loadCachedAppList` function and JSON file to work.
  try {
    const gameId = await getSteamIDforGame("Ricochet");
    if (gameId) {
      console.log(`Found game ID for "Ricochet": ${gameId}`);
    } else {
      console.log('Could not find an ID for "Ricochet"');
    }

    const csId = await getSteamIDforGame("Counter-Strike");
    if (csId) {
      console.log(`Found game ID for "Counter-Strike": ${csId}`);
    } else {
      console.log('Could not find an ID for "Counter-Strike"');
    }

    const notFoundId = await getSteamIDforGame("Metal Gear Solid V");
    if (notFoundId) {
      console.log(`Found game ID for MGS V: ${notFoundId}`);
    } else {
      console.log('Correctly could not find an ID for "Metal Gear Solid V"');
    }
  } catch (error) {
    console.error("Failed to run findGame example:", error);
  }
}

findGame();

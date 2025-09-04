# 📦 steamgames Documentation

This package provides convenient functions to fetch game data from the Steam API. Below are the available functions, their descriptions, and usage examples.

---


## Functions

### 0. getSteamIDList
Fetches the full list of Steam apps (games and software) from the Steam API.

**Signature:**
```typescript
getSteamIDList(): Promise<ListAPIResponse>
```

**Returns:**
A promise that resolves to the full app list object as returned by the Steam API.

**Example:**
```typescript
import { getSteamIDList } from 'steamgames';

async function showAppList() {
  const appList = await getSteamIDList();
  console.log(appList.applist.apps.app); // Array of { appid, name }
}

showAppList();
```

### 1. getSteamGameDetails
Fetches detailed information about a Steam game by its appid.

**Signature:**
```typescript
getSteamGameDetails(appid: number, country?: string): Promise<APIResponse>
```

**Example:**
```typescript
import { getSteamGameDetails } from 'steamgames';

const appid = 292030; // The Witcher 3: Wild Hunt
const country = 'de'; // Optional country code

getSteamGameDetails(appid, country).then(result => {
  if (result.success) {
    console.log('Game name:', result.data.name);
    console.log('Game price details:', result.data.price_overview);
  } else {
    console.log('No data exists for this game.');
  }
});
```

---

### 2. getSteamGameNamefromID
Finds the game name for a given Steam appid.

**Signature:**
```typescript
getSteamGameNamefromID(appid: string): Promise<string | undefined>
```

**Example:**
```typescript
import { getSteamGameNamefromID } from 'steamgames';

getSteamGameNamefromID('292030').then(name => {
  if (name) {
    console.log('Game name:', name);
  } else {
    console.log('Game not found.');
  }
});
```

---

### 3. getSteamIDforGame
Finds the Steam appid for a given game name (case-insensitive, substring match).

**Signature:**
```typescript
getSteamIDforGame(gameName: string): Promise<number | undefined>
```

**Example:**
```typescript
import { getSteamIDforGame } from 'steamgames';

getSteamIDforGame('Witcher 3').then(appid => {
  if (appid) {
    console.log('Found appid:', appid);
  } else {
    console.log('Game not found.');
  }
});
```

---


### 4. getSteamPriceOverview
Fetches price overview for one or more Steam appids.

**Signature:**
```typescript
getSteamPriceOverview(appids: number[], country?: string): Promise<PriceAPIResponse>
```

**Example:**
```typescript
import { getSteamPriceOverview } from 'steamgames';

const appids = [3240220, 292030];
const country = 'de';

getSteamPriceOverview(appids, country).then(result => {
  for (const appid of appids) {
    const price = result[appid]?.data?.price_overview?.final_formatted;
    console.log(`Price of game with appid ${appid}:`, price);
  }
});
```

---

### 5. Combined Example: Get Game Name and Price
Fetches the price and name for multiple appids using both `getSteamPriceOverview` and `getSteamGameNamefromID`.

**Example:**
```typescript
import { getSteamPriceOverview } from 'steamgames';
import { getSteamGameNamefromID } from 'steamgames';

async function testGetSteamGameAPIs() {
  const appids = [3240220, 292030, 377160];
  const country = 'de'; // Example country code

  try {
    const result = await getSteamPriceOverview(appids, country);

    for (const appid of appids) {
      const price = result[appid]?.data?.price_overview?.final_formatted;
      const appiStr = String(appid);
      const name = await getSteamGameNamefromID(appiStr);
      console.log(`Current Price of  ${name}:`, price);
    }
  } catch (error) {
    console.error('Error fetching game details:', error);
  }
}

// Call the test
testGetSteamGameAPIs();
```

---

## Notes
- All functions are asynchronous and return Promises.
- Make sure to handle errors using try/catch or .catch().
- You can import these functions directly from the package after building and publishing.

---

For more details, see the source code or open an issue on the repository.

import { getSteamIDforGame } from "../src/api/getSteamIDforGame";

// Mock the loadCachedAppList function
jest.mock("../src/utils/loadSteamIds", () => ({
  loadCachedAppList: jest.fn(),
}));

import { loadCachedAppList } from "../src/utils/loadSteamIds";

describe("getSteamIDforGame", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct appid for an exact match", async () => {
    // Arrange
    (loadCachedAppList as jest.Mock).mockResolvedValue({
      "10": "Counter-Strike",
      "20": "Team Fortress Classic",
      "30": "Day of Defeat",
    });
    // Act
    const result = await getSteamIDforGame("Counter-Strike");
    // Assert
    expect(result).toBe(10);
  });

  it("should return the correct appid for a substring match", async () => {
    // Arrange
    (loadCachedAppList as jest.Mock).mockResolvedValue({
      "10": "Counter-Strike",
      "20": "Team Fortress Classic",
      "30": "Day of Defeat",
    });
    // Act
    const result = await getSteamIDforGame("Strike");
    // Assert
    expect(result).toBe(10);
  });

  it("should return undefined if no match is found", async () => {
    // Arrange
    (loadCachedAppList as jest.Mock).mockResolvedValue({
      "10": "Counter-Strike",
      "20": "Team Fortress Classic",
    });
    // Act
    const result = await getSteamIDforGame("Half-Life");
    // Assert
    expect(result).toBeUndefined();
  });
});


import { getSteamIDforGame } from "../src/api/getSteamIDforGame";
import { getSteamIDList } from "../src/api/getSteamIDList";

jest.mock("../src/api/getSteamIDList");

describe("getSteamIDforGame", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct appid for an exact match", async () => {
    // Arrange
    (getSteamIDList as jest.Mock).mockResolvedValue({
      applist: {
        apps: {
          app: [
            { appid: 10, name: "Counter-Strike" },
            { appid: 20, name: "Team Fortress Classic" },
            { appid: 30, name: "Day of Defeat" },
          ],
        },
      },
    });
    // Act
    const result = await getSteamIDforGame("Counter-Strike");
    // Assert
    expect(result).toBe(10);
  });

  it("should return the correct appid for a substring match", async () => {
    // Arrange
    (getSteamIDList as jest.Mock).mockResolvedValue({
      applist: {
        apps: {
          app: [
            { appid: 10, name: "Counter-Strike" },
            { appid: 20, name: "Team Fortress Classic" },
            { appid: 30, name: "Day of Defeat" },
          ],
        },
      },
    });
    // Act
    const result = await getSteamIDforGame("Strike");
    // Assert
    expect(result).toBe(10);
  });

  it("should return undefined if no match is found", async () => {
    // Arrange
    (getSteamIDList as jest.Mock).mockResolvedValue({
      applist: {
        apps: {
          app: [
            { appid: 10, name: "Counter-Strike" },
            { appid: 20, name: "Team Fortress Classic" },
          ],
        },
      },
    });
    // Act
    const result = await getSteamIDforGame("Half-Life");
    // Assert
    expect(result).toBeUndefined();
  });
});

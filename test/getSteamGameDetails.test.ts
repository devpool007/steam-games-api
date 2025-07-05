import { getSteamGameDetails } from "../src/api/getSteamGameDetails";

// Mock fetch globally
(global as any).fetch = jest.fn();

describe("getSteamGameDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return game data for a valid appid", async () => {
    // Arrange
    const mockApiResponse = {
      292030: {
        success: true,
        data: {
          name: "The Witcher 3: Wild Hunt",
          price_overview: { final_formatted: "19,99€" },
        },
      },
    };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });
    // Act
    const result = await getSteamGameDetails(292030, "de");
    // Assert
    expect(result).toEqual(mockApiResponse[292030]);
  });

  it("should return undefined if the appid is not found in the response", async () => {
    // Arrange
    const mockApiResponse = {
      123456: { success: true, data: { name: "Some Game" } },
    };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });
    // Act
    const result = await getSteamGameDetails(292030, "de");
    // Assert
    expect(result).toBeUndefined();
  });

  it("should throw if fetch fails", async () => {
    // Arrange
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    // Act & Assert
    await expect(getSteamGameDetails(292030, "de")).rejects.toThrow("Network error");
  });
});

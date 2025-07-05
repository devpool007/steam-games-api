import { getSteamPriceOverview } from "../src/api/getSteamPriceOverviews";

// Mock fetch globally
(global as any).fetch = jest.fn();

describe("getSteamPriceOverview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return price data for valid appids", async () => {
    // Arrange
    const mockApiResponse = {
      292030: {
        success: true,
        data: {
          price_overview: { final_formatted: "19,99€" },
        },
      },
      3240220: {
        success: true,
        data: {
          price_overview: { final_formatted: "29,99€" },
        },
      },
    };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });
    // Act
    const result = await getSteamPriceOverview([292030, 3240220], "de");
    // Assert
    expect(result).toEqual(mockApiResponse);
  });

  it("should return an empty object if no appids are found", async () => {
    // Arrange
    const mockApiResponse = {};
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });
    // Act
    const result = await getSteamPriceOverview([111111, 222222], "de");
    // Assert
    expect(result).toEqual({});
  });

  it("should throw if fetch fails", async () => {
    // Arrange
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    // Act & Assert
    await expect(getSteamPriceOverview([292030], "de")).rejects.toThrow("Network error");
  });
});

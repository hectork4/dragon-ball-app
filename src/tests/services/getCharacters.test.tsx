import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getCharacters } from "../../services/getCharacters";
import { Character, Result } from "../../interfaces/Character";

const mockCharacter: Character = {
  id: 1,
  name: "Goku",
  description: "Saiyan warrior",
  image: "https://example.com/goku.jpg",
};

const mockResult: Result = {
  items: [mockCharacter],
  meta: {
    totalItems: 1,
    itemCount: 1,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  },
  links: {
    first: "https://example.com/api/characters?page=1",
    last: "https://example.com/api/characters?page=1",
    previous: "https://example.com/api/characters?page=1",
    next: "https://example.com/api/characters?page=1",
  },
};

describe("getCharacters", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch characters successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResult),
    });

    const data = await getCharacters();
    expect(global.fetch).toHaveBeenCalled();
    expect(data).toEqual(mockResult.items);
  });

  it("should fetch a single character by ID", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockCharacter),
    });

    const data = await getCharacters({ characterId: "1" });
    expect(global.fetch).toHaveBeenCalled();
    expect(data).toEqual(mockCharacter);
  });

  it("should throw an error if fetch fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Fetch error"));

    await expect(getCharacters()).rejects.toThrow("Fetch error");
    expect(global.fetch).toHaveBeenCalled();
  });

  it("should include query parameters in the URL", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResult),
    });

    await getCharacters({ limit: 10, name: "Vegeta" });

    const calledUrl = new URL((global.fetch as jest.Mock).mock.calls[0][0]);
    expect(calledUrl.searchParams.get("limit")).toBe("10");
    expect(calledUrl.searchParams.get("name")).toBe("Vegeta");
  });
});

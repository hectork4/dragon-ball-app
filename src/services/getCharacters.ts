import data from "../data";
import { Character, Result } from "../interfaces/Character";

interface GetCharacterProps {
  characterId?: string;
  limit?: number;
  [key: string]: string | number | undefined;
}

export async function getCharacters(params: GetCharacterProps = {}): Promise<Character | Character[]> {

  try {
    const { characterId, limit = 50, ...queryParams } = params;
    const url = new URL(data.API_URL + (characterId ? `/${characterId}` : ""));
    const searchParams = new URLSearchParams();

    Object.entries({ ...queryParams, limit }).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    url.search = searchParams.toString();

    const response = await fetch(url);
    const result: Result | Character = await response.json();

    return 'items' in result ? result.items : result;
  } catch (error) {
    console.error("Error fetching character:", error);
    throw error;
  }
}

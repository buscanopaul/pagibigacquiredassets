import { create } from "zustand";
import { Property } from "../../types/Property";
import searchProperties from "../utils/searchProperties";

interface SearchResult {
  properties: Property[];
  totalCount: number;
}

interface PropertiesState {
  properties: Property[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  searchProperties: (
    keyword: string,
    page: number,
    limit: number
  ) => Promise<void>;
}

const usePropertiesStore = create<PropertiesState>((set) => ({
  properties: [],
  totalCount: 0,
  loading: false,
  error: null,
  searchProperties: async (keyword: string, page: number, limit: number) => {
    set({ loading: true, error: null });
    try {
      const searchResults: SearchResult = await searchProperties(
        page,
        limit,
        keyword
      );
      set({
        properties: searchResults.properties,
        totalCount: searchResults.totalCount,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default usePropertiesStore;

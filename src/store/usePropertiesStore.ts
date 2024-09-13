// store/usePropertiesStore.ts
import { create } from "zustand";
import { Property } from "../../types/Property";
import searchProperties from "../utils/searchProperties";

interface PropertiesState {
  properties: Property[];
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
  loading: false,
  error: null,
  searchProperties: async (keyword: string, page: number, limit: number) => {
    set({ loading: true, error: null });
    try {
      const searchResults = await searchProperties(page, limit, keyword);
      set({ properties: searchResults, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default usePropertiesStore;

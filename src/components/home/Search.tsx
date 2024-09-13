import { Input } from "@/components/ui/input";
import usePropertiesStore from "@/store/usePropertiesStore";
import { useState } from "react";

export default function Search() {
  const { searchProperties } = usePropertiesStore();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchProperties(searchTerm, 1, 9);
    }
  };

  return (
    <form onSubmit={handleSearch} className="absolute top-8 left-24 z-10 w-1/4">
      <Input
        type="text"
        placeholder="Ex. Province, City, Barangay, Village"
        className="rounded-full bg-white shadow-xl border-0 px-4 py-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}

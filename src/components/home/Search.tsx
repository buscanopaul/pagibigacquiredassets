import { Input } from "@/components/ui/input";
import usePropertiesStore from "@/store/usePropertiesStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { searchProperties } = usePropertiesStore();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    if (searchTerm.trim()) {
      searchProperties(searchTerm, 1, 9);
      router.push(`?search=${encodeURIComponent(searchTerm)}`);
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

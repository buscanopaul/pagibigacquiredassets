"use client";

import Map from "@/components/home/Map";
import MapSkeleton from "@/components/home/MapSkeleton";
import usePropertiesStore from "@/store/usePropertiesStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { properties, loading, error, searchProperties, totalCount } =
    usePropertiesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    searchProperties(searchTerm, currentPage, itemsPerPage);
  }, [currentPage]);

  const locations = properties.map((property) => property.location);

  if (loading) return <MapSkeleton />;
  if (error) return <div>Error: {error}</div>;

  const onClickPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const onClickNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const hasNextPage = properties.length === itemsPerPage;

  return (
    <main>
      <Map
        locations={locations}
        properties={properties}
        onClickNext={hasNextPage ? onClickNext : undefined}
        onClickPrev={currentPage > 1 ? onClickPrev : undefined}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
      />
    </main>
  );
}

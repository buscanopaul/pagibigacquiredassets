"use client";

import Map from "@/components/home/Map";
import MapSkeleton from "@/components/home/MapSkeleton";
import { useEffect, useState } from "react";

type Property = {
  pagIbigPropertyNumber: string;
  name: string;
  description: string;
  floorArea: number;
  lotArea: number;
  province: string;
  propertyType: string;
  rentalPrice: number;
  slug: string;
  remarksType: string;
  requiredGrossMonthlyIncome: number;
  tctCctNo: string;
  id: string;
  images: Array<{ fileName: string; url: string }>;
  city: string;
  barangay: string;
  appraisalDate: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

async function getProperties(page = 1, limit = 9): Promise<Property[]> {
  const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not set");
  }

  const skip = (page - 1) * limit;

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: `query Properties($skip: Int!, $limit: Int!) {
        properties(first: $limit, skip: $skip) {
          pagIbigPropertyNumber
          name
          description
          floorArea
          lotArea
          province
          propertyType
          rentalPrice
          slug
          remarksType
          requiredGrossMonthlyIncome
          tctCctNo
          id
          images {
            fileName
            url
          }
          city
          barangay
          appraisalDate
          location {
            latitude
            longitude
          }
        }
      }`,
      variables: {
        skip,
        limit,
      },
    }),
  });

  const json = await response.json();
  return json.data.properties;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchProperties = async (page: number) => {
    setLoading(true);
    const props = await getProperties(page, itemsPerPage);
    setProperties(props);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage]);

  const locations = properties.map((property) => property.location);

  if (loading) return <MapSkeleton />;

  const onClickPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const onClickNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <main>
      <Map
        locations={locations}
        properties={properties}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        currentPage={currentPage}
      />
    </main>
  );
}

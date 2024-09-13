import { useFormatPeso } from "@/lib/hooks/useFormatPeso";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Property } from "../../../types/Property";

type PropertyListProps = {
  properties: Property[];
  onClickPrev?: () => void;
  onClickNext?: () => void;
  currentPage: number;
  hasNextPage: boolean;
};

export default function PropertyList({
  properties,
  onClickPrev,
  onClickNext,
  currentPage,
  hasNextPage,
}: PropertyListProps) {
  return (
    <div className="bg-white rounded-tl-3xl rounded-bl-3xl p-4 grid grid-cols-3 gap-4 overflow-y-auto h-[630px] w-full">
      {properties.length === 0 && (
        <p className="text-center">No properties found</p>
      )}
      {properties.map((property) => (
        <div key={property.id} className="group">
          <Link href="/property">
            <div
              style={{ backgroundImage: `url(${property.images[0]?.url})` }}
              className="bg-cover w-full h-40 rounded-lg bg-[#381d6e] relative group-hover:shadow-xl transition ease-in-out"
            >
              <div className="bg-white top-2 absolute left-2 rounded-full px-2 py-1 text-[10px]">
                1,000 views
              </div>
            </div>
            <div className="h-2" />
            <p className="font-bold text-xs">{property.name}</p>
            <p className="text-xs text-gray-500">
              {property.province}, {property.city}
            </p>
            <div className="h-1" />
            <p className="font-bold text-xs">
              {useFormatPeso(property.requiredGrossMonthlyIncome)}/month
            </p>
          </Link>
        </div>
      ))}
      <div
        className={`${
          properties && properties.length < 9 && "absolute bottom-5"
        } flex-row flex items-center gap-4`}
      >
        <button onClick={onClickPrev} disabled={currentPage === 1}>
          <ChevronLeftIcon
            className={`size-6 text-black ${
              currentPage === 1 ? "text-gray-300" : "text-black"
            } active:opacity-70`}
          />
        </button>
        <div className="bg-[#381d6e] rounded-full h-8 w-8 justify-center items-center flex">
          <span className="text-white">{currentPage}</span>
        </div>
        <button onClick={onClickNext} disabled={!hasNextPage}>
          <ChevronRightIcon
            className={`size-6 text-black ${
              !hasNextPage ? "text-gray-300" : "text-black"
            } active:opacity-70`}
          />
        </button>
      </div>
    </div>
  );
}

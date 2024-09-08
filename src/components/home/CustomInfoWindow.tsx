import { HeartIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Property } from "../../../types/Property";

const CustomInfoWindow = ({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="bg-white rounded-lg shadow-xl w-64 relative animate-f-fade-in -left-[115px]"
      style={{ minWidth: "300px" }}
      ref={wrapperRef}
    >
      <div className="h-40 relative w-full">
        <Image
          src={property.images && property.images[0]?.url}
          layout="fill"
          objectFit="cover"
          alt={property.name}
          className="rounded-t-xl"
        />
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-3">
        <button
          onClick={onClose}
          className="bg-white opacity-80 hover:opacity-100 rounded-full p-1 transition ease-in-out hover:scale-110"
        >
          <HeartIcon className="size-5 text-black hover:opacity-100 opacity-70" />
        </button>

        <button
          onClick={onClose}
          className="bg-white opacity-80 hover:opacity-100 rounded-full p-1 transition ease-in-out hover:scale-110"
        >
          <XMarkIcon className="size-5 text-black hover:opacity-100 opacity-70" />
        </button>
      </div>
      <div className="p-4 rounded-b-xl">
        <h2 className="text-lg font-bold mb-2">{property.name}</h2>
        <p className="text-sm mb-2">{property.description}</p>
        {property.rentalPrice && (
          <p className="text-sm">
            Bid Price: ₱{property.rentalPrice.toLocaleString()}
          </p>
        )}
        {property.requiredGrossMonthlyIncome && (
          <p className="text-sm">
            Monthly Income: ₱
            {property.requiredGrossMonthlyIncome.toLocaleString()}
          </p>
        )}
        {property.lotArea && (
          <p className="text-sm">Lot Area: {property.lotArea} sqm</p>
        )}
        {property.floorArea && (
          <p className="text-sm">Floor Area: {property.floorArea} sqm</p>
        )}
      </div>
    </div>
  );
};

export default CustomInfoWindow;

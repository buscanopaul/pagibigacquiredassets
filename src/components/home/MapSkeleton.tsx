"use client";

import Image from "next/image";
import MapSkeletonItem from "./MapSkeletonItem";

function MapSkeleton() {
  return (
    <div className="h-screen w-full bg-white fixed">
      <Image
        src="/images/placeholder.jpg"
        alt="map"
        layout="fill"
        objectFit="cover"
      />
      <div className="flex items-center justify-end right-0 absolute w-1/2 top-6 h-[630px] bg-white rounded-tl-3xl rounded-bl-3xl">
        <div className="animate-pulse w-full h-full grid grid-cols-3 gap-5 p-4">
          <MapSkeletonItem />
          <MapSkeletonItem />
          <MapSkeletonItem />
          <MapSkeletonItem />
          <MapSkeletonItem />
          <MapSkeletonItem />
          <MapSkeletonItem />
          <MapSkeletonItem />
          <MapSkeletonItem />
        </div>
      </div>
    </div>
  );
}

export default MapSkeleton;

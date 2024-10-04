"use client";

import { useFormatPeso } from "@/lib/hooks/useFormatPeso";
import { useState } from "react";
import InfoMap from "./InfoMap";
import InfoNumbers from "./InfoNumbers";

export default function Info() {
  const [mapCenter] = useState({ lat: 14.5607319, lng: 121.0433916 });

  return (
    <div className="md:w-[40%]">
      <h1 className="text-2xl">Pamahay Subdivision</h1>
      <div className="h-1" />
      <p className="text-xs text-gray-500">
        Lot 6B Blk. 11, Oriental Mindoro, Naujan, Brgy. Barcenaga
      </p>
      <div className="h-5" />
      <div className="flex gap-1">
        <h2 className="font-bold text-xl">{useFormatPeso(3172.82)}</h2>
        <h2 className="text-xl">/ month</h2>
      </div>
      <div className="h-8" />
      <button
        onClick={() => {}}
        className="bg-[#381d6e] px-40 py-3 rounded-full active:opacity-70"
      >
        <p className="text-white">Inquire</p>
      </button>
      <div className="h-10" />
      <InfoNumbers />
      <div className="h-10" />
      <InfoMap center={mapCenter} />
    </div>
  );
}

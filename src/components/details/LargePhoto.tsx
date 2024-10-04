"use client";

import { BookmarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type LargePhotoProps = {
  isFirst?: boolean;
};

export default function LargePhoto({ isFirst }: LargePhotoProps) {
  return (
    <div className="h-[400px] relative">
      <Image
        src="/images/test.webp"
        fill
        style={{
          objectFit: "cover",
        }}
        alt="test"
        className="rounded-3xl"
      />
      {isFirst && (
        <>
          <button
            onClick={() => {}}
            className="absolute top-4 right-5 bg-white p-2 rounded-full active:opacity-70"
          >
            <BookmarkIcon className="w-4 h-4" />
          </button>
          <p className="text-xs absolute top-4 left-5 bg-white py-2 px-5 rounded-full">
            1000 views
          </p>
        </>
      )}
    </div>
  );
}

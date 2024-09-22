import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function PropertyDetails() {
  return (
    <div className="bg-gray-100 h-screen w-full px-6 py-4">
      <div className="relative h-[500px]">
        <Image
          src="/images/test.webp"
          alt="map"
          fill
          style={{
            objectFit: "cover",
          }}
          sizes="100vw"
          priority
          className="rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl" />
        <div className="absolute top-5 left-5 bg-white rounded-full p-2 active:opacity-70 cursor-pointer">
          <HeartIcon className="w-4 h-4" />
        </div>
        <div className="absolute top-5 left-16 bg-white rounded-full p-2 active:opacity-70 cursor-pointer">
          <ShareIcon className="w-4 h-4" />
        </div>
        <h1 className="absolute bottom-5 left-5 text-white text-2xl">
          Pamahay subdivision
        </h1>
      </div>
    </div>
  );
}

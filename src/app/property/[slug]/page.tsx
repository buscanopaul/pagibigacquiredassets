import Info from "@/components/details/Info";
import Photos from "@/components/details/Photos";

export default function PropertyDetails() {
  return (
    <div className="w-full px-6 py-4 md:flex-row gap-10 flex-col-reverse flex">
      <Info />
      <Photos />
    </div>
  );
}

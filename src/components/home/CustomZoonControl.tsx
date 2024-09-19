import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

type CustomZoonControlProps = {
  map: google.maps.Map | null;
};

export default function CustomZoonControl({ map }: CustomZoonControlProps) {
  const handleZoomIn = () => {
    if (map) map.setZoom(map.getZoom()! + 1);
  };

  const handleZoomOut = () => {
    if (map) map.setZoom(map.getZoom()! - 1);
  };

  return (
    <div className="absolute bottom-24 left-4 bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={handleZoomIn}
        className="p-2 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
        aria-label="Zoom in"
      >
        <PlusIcon className="w-6 h-6 text-black" />
      </button>
      <div className="h-px bg-gray-200" />
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
        aria-label="Zoom out"
      >
        <MinusIcon className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}

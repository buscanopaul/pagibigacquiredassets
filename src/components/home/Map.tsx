"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
import PropertyList from "./PropertyList";

type Location = {
  latitude: number;
  longitude: number;
};

type Image = {
  fileName: string;
  url: string;
};

type Property = {
  id: string;
  name: string;
  description: string;
  location: Location;
  rentalPrice?: number;
  lotArea?: number;
  floorArea?: number;
  images?: Image[];
  requiredGrossMonthlyIncome: number;
};

type MapProps = {
  locations: Location[];
  properties: any;
  onClickPrev: () => void;
  onClickNext: () => void;
  currentPage: number;
};

const CustomInfoWindow = ({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) => (
  <div className="bg-white rounded-lg shadow-lg w-64 relative">
    <div className="h-40 relative w-full">
      <Image
        src={property.images && property.images[0]?.url}
        layout="fill"
        objectFit="cover"
        alt={property.name}
        className="rounded-t-xl"
      />
    </div>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 bg-white opacity-60 rounded-full p-1"
    >
      <XMarkIcon className="size-5 text-black active:opacity-70" />
    </button>
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

function Map({
  locations,
  properties,
  onClickPrev,
  onClickNext,
  currentPage,
}: MapProps) {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const image = "/images/logo_flag.png";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCHM_lrHlDBhZ_5TWyYsAcdq6_-Fqrm6hU",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const [center, setCenter] = useState(() => {
    const baseCenter = {
      lat: locations[0]?.latitude || 0,
      lng: locations[0]?.longitude || 0,
    };

    return {
      ...baseCenter,
      lng: baseCenter.lng + 0.05,
    };
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleInfoWindowClose = () => {
    setSelectedProperty(null);
  };

  if (!mapLoaded) return null;

  const mapOptions = isLoaded
    ? {
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
        },
        fullscreenControl: false,
        keyboardShortcuts: false,
        minZoom: 4,
        maxZoom: 12,
        clickableIcons: false,
        mapTypeControl: false,
      }
    : {};

  return (
    <div className="h-screen w-full fixed">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {properties.map((property: Property, _index: string) => (
            <Marker
              key={_index}
              position={{
                lat: property.location.latitude,
                lng: property.location.longitude,
              }}
              icon={{
                url: image,
                anchor: new window.google.maps.Point(5, 50),
              }}
              onClick={() => handleMarkerClick(property)}
            />
          ))}
          {selectedProperty && (
            <OverlayView
              position={{
                lat: selectedProperty.location.latitude,
                lng: selectedProperty.location.longitude,
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <CustomInfoWindow
                property={selectedProperty}
                onClose={handleInfoWindowClose}
              />
            </OverlayView>
          )}
          <div className="flex items-center justify-end right-0 absolute max-w-1/2 top-6">
            <PropertyList
              properties={properties}
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
              currentPage={currentPage}
            />
          </div>
        </GoogleMap>
      ) : null}
    </div>
  );
}

export default memo(Map);

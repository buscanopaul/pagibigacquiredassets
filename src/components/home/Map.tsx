"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";
import PropertyList from "./PropertyList";

type MapProps = {
  locations: any;
  properties: any;
  onClickPrev: () => void;
  onClickNext: () => void;
  currentPage: number;
};

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

  const center = {
    lat: locations[0]?.latitude,
    lng: locations[0]?.longitude,
  };

  const image = "/images/logo_flag.png";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCHM_lrHlDBhZ_5TWyYsAcdq6_-Fqrm6hU",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

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
          {locations.map((location: any, _index: string) => (
            <Marker
              key={_index}
              position={{ lat: location.latitude, lng: location.longitude }}
              icon={{
                url: image,
                anchor: new window.google.maps.Point(5, 50),
              }}
            ></Marker>
          ))}
          <div className="flex items-center justify-end right-0 absolute w-1/2 top-6">
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

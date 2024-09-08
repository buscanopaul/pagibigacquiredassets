"use client";

import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";
import { Location, Property } from "../../../types/Property";
import CustomInfoWindow from "./CustomInfoWindow";
import PropertyList from "./PropertyList";

type MapProps = {
  locations: Location[];
  properties: Property[];
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

  const image = "/images/logo_active.png";

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

  const defaultIcon = {
    url: "/images/logo_active.png",
    anchor: new window.google.maps.Point(5, 50),
    scaledSize: new window.google.maps.Size(30, 33),
  };

  const selectedIcon = {
    url: "/images/logo.png",
    anchor: new window.google.maps.Point(5, 50),
    scaledSize: new window.google.maps.Size(30, 33),
  };

  return (
    <div className="h-screen w-full">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {properties.map((property: Property) => (
            <Marker
              key={property.id}
              position={{
                lat: property.location.latitude,
                lng: property.location.longitude,
              }}
              icon={
                selectedProperty?.id === property.id
                  ? selectedIcon
                  : defaultIcon
              }
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
          <div className="flex items-center justify-end right-0 absolute top-6 w-1/2">
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

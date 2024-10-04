import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type InfoMapProps = {
  center: any;
};

const containerStyle = {
  width: "100%",
  height: "395px",
};

export default function InfoMap({ center }: InfoMapProps) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="rounded-xl shadow-lg overflow-hidden">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

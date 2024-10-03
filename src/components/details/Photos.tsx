import LargePhoto from "./LargePhoto";
import MiniPhoto from "./MiniPhoto";

export default function Photos() {
  return (
    <div className="md:w-[60%]">
      <LargePhoto />
      <div className="h-3" />
      <div className="flex gap-3">
        <MiniPhoto />
        <MiniPhoto />
      </div>
      <div className="h-3" />
      <LargePhoto />
    </div>
  );
}

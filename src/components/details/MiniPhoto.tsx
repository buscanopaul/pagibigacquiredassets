import Image from "next/image";

export default function MiniPhoto() {
  return (
    <div className="h-[200px] relative w-full">
      <Image
        src="/images/test.webp"
        fill
        style={{
          objectFit: "cover",
        }}
        alt="test"
        className="rounded-3xl"
      />
    </div>
  );
}

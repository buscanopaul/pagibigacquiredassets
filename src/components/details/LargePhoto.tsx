import Image from "next/image";

export default function LargePhoto() {
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
    </div>
  );
}

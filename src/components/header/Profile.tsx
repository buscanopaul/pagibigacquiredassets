import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex items-center justify-center gap-3">
      <p>Hi, Paul</p>
      <Image
        src="/images/profile.webp"
        width={30}
        height={30}
        alt="profile-pic"
        className="rounded-full"
      />
    </div>
  );
}

import Image from "next/image";
import Menu from "./Menu";
import Profile from "./Profile";

export default function Header() {
  return (
    <div className="justify-between flex items-center max-w-screen-2xl mx-auto py-3 bg-red-500 px-4">
      <Image src="/images/logo.png" width={50} height={50} alt="pag-ibig" />
      <Menu />
      <Profile />
    </div>
  );
}

import { useFormatPeso } from "@/lib/hooks/useFormatPeso";

type InfoNumbersItemProps = {
  title: string;
};

export default function InfoNumbersItem({ title }: InfoNumbersItemProps) {
  return (
    <div className="border-dashed border-[1px] border-gray-500 hover:border-white h-28 py-5 px-2 justify-between flex flex-col hover:bg-black group transition-all">
      <h1 className="font-bold text-lg group-hover:text-white">
        {useFormatPeso(444000)}
      </h1>
      <p className="text-xs group-hover:text-white">{title}</p>
    </div>
  );
}

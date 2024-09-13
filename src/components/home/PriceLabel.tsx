import { useFormatPeso } from "@/lib/hooks/useFormatPeso";

type PriceLabelProps = {
  monthlyAmortization: number;
  onClick: () => void;
};

const PriceLabel = ({ monthlyAmortization, onClick }: PriceLabelProps) => {
  return (
    <div className="relative w-36 cursor-pointer" onClick={onClick}>
      <div className="bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold shadow-md text-center border-[1px] border-black">
        <span className="text-gray-900">
          {useFormatPeso(monthlyAmortization)}
        </span>
        <span className="text-gray-500 ml-1">/ month</span>
      </div>
      <div
        className="absolute left-1/2 bottom-0 w-0 h-0 
                      border-l-8 border-l-transparent
                      border-r-8 border-r-transparent
                      border-t-8 border-t-black
                      -translate-x-1/2 translate-y-full"
      />
    </div>
  );
};

export default PriceLabel;

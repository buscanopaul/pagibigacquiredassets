import { useMemo } from "react";

export const useFormatPeso = (amount: number): string => {
  return useMemo(() => {
    const formatter = new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(amount);
  }, [amount]);
};

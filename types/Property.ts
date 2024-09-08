export type Property = {
  pagIbigPropertyNumber: string;
  name: string;
  description: string;
  floorArea: number;
  lotArea: number;
  province: string;
  propertyType: string;
  rentalPrice: number;
  slug: string;
  remarksType: string;
  requiredGrossMonthlyIncome: number;
  tctCctNo: string;
  id: string;
  images: Image[];
  city: string;
  barangay: string;
  appraisalDate: string;
  location: Location;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type Image = {
  fileName: string;
  url: string;
};

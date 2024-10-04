import InfoNumbersItem from "./InfoNumbersItem";

export default function InfoNumbers() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <InfoNumbersItem title="Property Number" />
      <InfoNumbersItem title="Minimum Bid Price" />
      <InfoNumbersItem title="Required Monthly Income" />
      <InfoNumbersItem title="Property Type" />
      <InfoNumbersItem title="Lot Area" />
      <InfoNumbersItem title="Floor Area" />
      <InfoNumbersItem title="Appraisal Date" />
      <InfoNumbersItem title="Remarks Type" />
      <InfoNumbersItem title="TCT/CCT #" />
    </div>
  );
}

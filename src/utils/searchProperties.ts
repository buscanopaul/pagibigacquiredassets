import { Property } from "../../types/Property";

async function searchProperties(
  page = 1,
  limit = 9,
  keyword: string
): Promise<Property[]> {
  const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not set");
  }

  const skip = (page - 1) * limit;

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: `query Properties($skip: Int!, $limit: Int!, $keyword: String!) {
          properties(first: $limit, skip: $skip, where: {_search: $keyword}) {
            pagIbigPropertyNumber
            name
            description
            floorArea
            lotArea
            province
            propertyType
            rentalPrice
            slug
            remarksType
            requiredGrossMonthlyIncome
            tctCctNo
            id
            images {
              fileName
              url
            }
            city
            barangay
            appraisalDate
            location {
              latitude
              longitude
            }
          }
        }`,
      variables: {
        skip,
        limit,
        keyword,
      },
    }),
  });

  const json = await response.json();
  return json.data.properties;
}

export default searchProperties;

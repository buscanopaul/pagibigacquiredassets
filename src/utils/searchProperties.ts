import { Property } from "../../types/Property";

interface SearchResult {
  properties: Property[];
  totalCount: number;
}

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
          properties(first: $limit, skip: $skip, where: {_search: $keyword}, orderBy: createdAt_DESC) {
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
            monthlyAmortization
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
          propertiesConnection(where: { _search: $keyword }) {
            aggregate {
              count
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

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  const properties: Property[] = data.data.properties;
  const totalCount: number = data.data.propertiesConnection.aggregate.count;

  return { properties, totalCount };
}

export default searchProperties;

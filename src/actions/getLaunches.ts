"use server";

import { Launch } from "@/models";
import { GraphQLClient, gql } from "graphql-request";

const GRAPHQL_ENDPOINT = "https://spacex-production.up.railway.app/";


export async function getLaunches(page: number = 1, limit: number = 20) {
  const client = new GraphQLClient(GRAPHQL_ENDPOINT);

  const query = gql`
    query getLaunches($limit: Int, $offset: Int) {
      launches(limit: $limit, offset: $offset) {
        id
        name: mission_name
        details
        rocket {
          name: rocket_name
        }
      }
    }
  `;

  try {
    const variables = { limit, offset: (page - 1) * limit };
    const data = await client.request<{ launches: Launch[] }>(query, variables);
    return data.launches;
  } catch (error) {
    console.error("Error fetching launches:", error);
    throw new Error("Failed to fetch launches");
  }
}
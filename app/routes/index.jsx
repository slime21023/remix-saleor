import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { GraphQLClient, gql } from "graphql-request";

const GetProductsQuery = gql`
  {
    products(first: 5, channel: "default-channel") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export async function loader() {
  const client = new GraphQLClient("https://demo.saleor.io/graphql/")
  const { products } = await client.request(GetProductsQuery);

  return json({ products });
}

export default function Index() {
  const data = useLoaderData();
  // console.log(data)
  return (
    <div className="container">
      {JSON.stringify(data)}
    </div>
  );
}

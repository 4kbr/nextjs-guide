import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalePage(props: any) {
  console.log({ props });

  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error, ...res } = useSWR(process.env.NEXT_URL);

  // useEffect(() => {
  //   console.log({ res });
  //   console.log({ data });

  //   if (data) {
  //     const transformSales = [];

  //     for (const key in data) {
  //       transformSales.push({
  //         id: key,
  //         username: data[key].username,
  //         favorit: data[key].favorit,
  //       });
  //     }
  //     setSales(transformSales);
  //   }
  // }, [data]);

  console.log("ini last sales");

  // if (isLoading) return <p>loading...</p>;

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) return <p>No data here</p>;

  return (
    <ul>
      {sales.map((sale: any) => (
        <li key={sale.id}>
          {sale.username} - food: {sale.favorit}
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return fetch(process.env.NEXT_URL!)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
      const transformSales = [];

      for (const key in data) {
        transformSales.push({
          id: key,
          username: data[key].username,
          favorit: data[key].favorit,
        });
      }

      return { props: { sales: transformSales }, revalidate: 10 };
    });
};

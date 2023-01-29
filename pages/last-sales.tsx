import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalePage() {
  const [sales, setSales] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(process.env.NEXT_URL);

  useEffect(() => {
    if (data) {
      const transformSales = [];

      for (const key in data) {
        transformSales.push({
          id: key,
          username: data[key].username,
          favorit: data[key].favorit,
        });
      }
      setSales(transformSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   console.log("test ini");
  //   fetch(`{process.env.NEXT_URL}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log({ data });
  //       const transformSales = [];
  //       for (const key in data) {
  //         transformSales.push({
  //           id: key,
  //           username: data[key].username,
  //           favorit: data[key].favorit,
  //         });
  //         // setSales((prev) => [
  //         //   ...prev,
  //         //   {
  //         //     id: key,
  //         //     username: data[key].username,
  //         //     favorit: data[key].favorit,
  //         //   },
  //         // ]);
  //       }
  //       setSales(transformSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  console.log("ini last sales");

  // if (isLoading) return <p>loading...</p>;

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data) return <p>No data here</p>;

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

// export const

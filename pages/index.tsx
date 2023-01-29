import { GetStaticProps } from "next";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function Home({ products }: { products: Array<any> }) {
  console.log({ products });

  return (
    <div>
      <ul>
        {products.map((v, i) => (
          <li key={i}>
            <Link href={`/products/${v.id}`}>{v.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**get static saat build time */
export const getStaticProps: GetStaticProps = async (context) => {
  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData.toString());

  if (JSON.parse(jsonData.toString()) === undefined)
    return {
      notFound: true,
      redirect: {
        statusCode: 400,
        destination: "/no-data",
      },
    };

  if (products.length === 0) return { notFound: true };

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};

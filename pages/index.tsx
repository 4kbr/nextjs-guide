import { GetStaticProps } from "next";
import fs from "fs/promises";
import path from "path";

export default function Home({ products }: { products: Array<any> }) {
  console.log({ products });

  return (
    <div>
      <ul>
        {products.map((v, i) => (
          <li key={i}>{v.title}</li>
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
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};

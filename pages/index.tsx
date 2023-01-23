import { GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
};

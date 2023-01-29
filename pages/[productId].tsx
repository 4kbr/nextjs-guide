import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import { Fragment } from "react";
import fs from "fs/promises";

export default function ProductDetail({ product }: any) {
  console.log({ product });

  if (!product) {
    return <p>Loading....</p>;
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <h1>{product.description}</h1>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params;
  const productId = params?.productId;
  console.log({ productId });

  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData = await fs.readFile(filePath);
  const { products }: { products: Array<any> } = JSON.parse(
    jsonData.toString()
  );
  console.log("products ini");
  // console.log({ products });

  const product = products.find((value) => value.id === productId);
  console.log({ product });

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [{ params: { productId: "p1" } }],
    fallback: true,
  };
};

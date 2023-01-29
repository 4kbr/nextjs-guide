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

const getData = async () => {
  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData = await fs.readFile(filePath);
  const { products }: { products: Array<any> } = JSON.parse(
    jsonData.toString()
  );
  return products;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params;
  const productId = params?.productId;
  console.log({ productId });

  console.log("products ini");
  // console.log({ products });

  const products = await getData();

  const product = products.find((value) => value.id === productId);
  console.log({ product });

  if (!product) return { notFound: true };

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const products = await getData();
  const ids = products.map((product) => product.id);

  const params = ids.map((id) => ({ params: { productId: id } }));

  return {
    paths: params,
    fallback: true,
  };
};

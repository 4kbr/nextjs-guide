import { GetServerSideProps } from "next";

export default function UserDetailPage(props: any) {
  return <div>{props.id}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userId = params?.userId;

  console.log("server side code");

  return {
    props: {
      id: `userid-${userId}`,
    },
  };
};

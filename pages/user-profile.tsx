import { GetServerSideProps } from "next";

export default function UserProfilePage(props: any) {
  return <div>{props.username}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context;

  return {
    props: {
      username: "Aram",
    },
  };
};

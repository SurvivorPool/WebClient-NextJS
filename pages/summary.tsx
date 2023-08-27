import Head from "next/head";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const Dashboard = () => {
  useAuthRedirect();
  return <>hello</>;
};

export default Dashboard;

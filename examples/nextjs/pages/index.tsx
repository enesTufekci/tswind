import type { NextPage } from "next";
import { hello } from "tswind";

const Home: NextPage = () => {
  return <div>{hello("x")}</div>;
};

export default Home;

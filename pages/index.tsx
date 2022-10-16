import { Container } from "@mui/material";
import { Header } from "../src/Layout/Header";
import { NextPageWithLayout } from "../pages/_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <Container>
      <Header />
      Home
    </Container>
  );
};

export default HomePage;

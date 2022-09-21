import { FC, PropsWithChildren } from "react";

import { Container } from "@mui/material";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const PageContainer: FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  return (
    <Container maxWidth={false}>
      <Header />
      <Container
        sx={{
          paddingY: "40px",
        }}
      >
        {children}
      </Container>
      <Footer />
    </Container>
  );
};

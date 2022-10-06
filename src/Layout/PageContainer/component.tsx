import { FC, PropsWithChildren } from "react";

import { Container } from "@mui/material";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const PageContainer: FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        position: "relative",
      }}
    >
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

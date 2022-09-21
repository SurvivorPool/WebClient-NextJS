import { Container, Grid, List, ListItem, Typography } from "@mui/material";

import { FC } from "react";
import Link from "next/link";

const links = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms of Use",
    href: "/terms-of-use",
  },
  {
    label: "Data Policy",
    href: "/data-policy",
  },
];

export const Footer: FC = () => {
  return (
    <footer>
      <Container
        maxWidth="xl"
        sx={({ colors }) => ({
          padding: "40px 20px",
          borderTop: `1px solid ${colors.border}`,
          backgroundColor: colors.offWhite,
        })}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <List>
              {links.map((link) => (
                <ListItem key={link.href}>
                  <Link href={link.href}>
                    <Typography
                      sx={({ colors, fonts }) => ({
                        color: colors.burntOrange,
                        fontSize: "0.875rem",

                        "&:hover, &:active": {
                          textDecoration: "underline",
                          color: colors.orange,
                          cursor: "pointer",
                        },
                      })}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              sx={({ colors }) => ({
                fontSize: "0.625rem",
                color: colors.black,
                textAlign: "left",
                maxWidth: "450px",
              })}
            >
              Survivor Pool is not affiliated with The National Football League
              (NFL). The team names, logos and uniform designs are registered
              trademarks of the teams indicated. All other NFL-related
              trademarks are trademarks of the National Football League.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

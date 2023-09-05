import { Box, Breadcrumbs, Button, Text } from "@mantine/core";

import { FC } from "react";
import { useRouter } from "next/router";

interface BreadCrumbProps {
  items: Array<{ title: string; href: string | null }>;
}

const BreadCrumb: FC<BreadCrumbProps> = ({ items }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        marginBottom: "24px",
      }}
    >
      <Breadcrumbs>
        {items.map((item) => {
          if (item.href) {
            return (
              <Button
                variant="link"
                onClick={() => {
                  router.push({
                    pathname: item.href,
                  });
                }}
                sx={({ colors }) => ({
                  color: colors.orange[5],

                  "&:hover": {
                    color: colors.red[3],
                  },
                })}
                fz="sm"
                key={item.href}
              >
                {item.title}
              </Button>
            );
          }
          return (
            <Text fz="sm" key={item.title}>
              {item.title}
            </Text>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
export default BreadCrumb;

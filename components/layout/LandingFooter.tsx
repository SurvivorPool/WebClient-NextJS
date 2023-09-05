import { Container, Group, SimpleGrid, Text } from "@mantine/core";

import Link from "next/link";

const LandingFooter = () => {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "120px",
        borderTop: "1px solid #eaeaea",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
        <Group spacing={"16px"} position="left" noWrap>
          <Link href="/terms-of-use">
            <Text
              c="dimmed"
              fz="xs"
              sx={{
                textAlign: "center",
              }}
            >
              Terms
            </Text>
          </Link>
          <Link href="/privacy-policy">
            <Text
              c="dimmed"
              fz="xs"
              sx={{
                textAlign: "center",
              }}
            >
              Privacy
            </Text>
          </Link>
          <Link href="/data-policy">
            <Text
              c="dimmed"
              fz="xs"
              sx={{
                textAlign: "center",
              }}
            >
              Data Policy
            </Text>
          </Link>
        </Group>
        <Group>
          <Text c="dimmed" fz="xs">
            All trademarks on SurvivorPool.win are property of their respective
            owners. SurvivorPool.win is not affiliated with the National
            Football League (NFL) or any of its members.
          </Text>
          <Text c="dimmed" fz="xs">
            This is not a gambling site and all information and games here are
            for entertainment purposes only.
          </Text>
        </Group>
      </SimpleGrid>
    </footer>
  );
};

export default LandingFooter;

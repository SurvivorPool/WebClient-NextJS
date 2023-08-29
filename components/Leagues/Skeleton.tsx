import { Box, Divider, Card as MantineCard, Skeleton } from "@mantine/core";

const CardSkeleton = () => {
  return (
    <Box
      sx={(theme) => ({
        padding: "6px",
        position: "relative",
        background: `linear-gradient(to right, ${theme.colors.orange[5]}, ${theme.colors.yellow[5]})`,
        cursor: "pointer",
        borderRadius: "4px",
        maxWidth: "350px",

        "&:hover": {
          transform: "scale(1.02) perspective(0px)",
          boxShadow: "0 10px 10px rgba(0,0,0,.1)",
        },
      })}
    >
      <MantineCard
        withBorder
        shadow="sm"
        padding="lg"
        sx={{
          borderRadius: "4px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Skeleton height="40px" />
            <Skeleton height="40px" />
          </Box>

          <Divider />
          <Skeleton height="80px" />
        </Box>
      </MantineCard>
    </Box>
  );
};

export default CardSkeleton;

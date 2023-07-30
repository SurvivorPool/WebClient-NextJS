import { Button, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const icon = colorScheme === "dark" ? <IconSun /> : <IconMoon />;

  return (
    <Button
      onClick={() => toggleColorScheme()}
      sx={{
        backgroundColor: "transparent",
        color: "#c1582d",
        padding: "4px 8px",
        height: "50px",
        width: "50px",

        "&:hover": {
          backgroundColor: "rgba(193, 88, 45, 0.1)",
          border: "1px solid transparent",
        },
      }}
    >
      {icon}
    </Button>
  );
};

export default ThemeSwitcher;

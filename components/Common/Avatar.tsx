import { Avatar as MantineAvatar, useMantineColorScheme } from "@mantine/core";

import { FC } from "react";

function getBorderColor(stringInput: string) {
  let stringUniqueHash = stringInput.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
}

interface AvatarProps {
  name: string;
  size?: string | number;
}

const Avatar: FC<AvatarProps> = ({ name, size }) => {
  const { colorScheme } = useMantineColorScheme();
  const initial = (name[0] || "u").toUpperCase();

  return (
    <MantineAvatar
      radius="xl"
      variant="gradient"
      size={size || 32}
      gradient={{
        from: getBorderColor(name),
        to: colorScheme === "light" ? "#fff" : "#000",
        deg: 145,
      }}
      sx={{
        "& >.mantine-Avatar-placeholder": {
          border: `3px solid ${getBorderColor(name)}`,
        },
      }}
    >
      {initial}
    </MantineAvatar>
  );
};

export default Avatar;

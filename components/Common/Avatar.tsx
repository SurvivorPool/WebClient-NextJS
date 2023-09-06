import { Avatar as MantineAvatar, useMantineColorScheme } from "@mantine/core";

import { FC } from "react";

//https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
const getStringColor = (
  string: string,
  opts?: { hue?: Array<number>; sat?: Array<number>; lit?: Array<number> }
) => {
  var h, s, l;
  opts = opts || {};
  opts.hue = opts.hue || [0, 360];
  opts.sat = opts.sat || [75, 100];
  opts.lit = opts.lit || [40, 60];

  var range = function (hash: number, min: number, max: number) {
    var diff = max - min;
    var x = ((hash % diff) + diff) % diff;
    return x + min;
  };

  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  h = range(hash, opts.hue[0], opts.hue[1]);
  s = range(hash, opts.sat[0], opts.sat[1]);
  l = range(hash, opts.lit[0], opts.lit[1]);

  return `hsl(${h}, ${s}%, ${l}%)`;
};

interface AvatarProps {
  name: string;
  size?: string | number;
}

const Avatar: FC<AvatarProps> = ({ name, size }) => {
  const { colorScheme } = useMantineColorScheme();
  const initial = (name[0] || "u").toUpperCase();
  const color = getStringColor(name, {
    hue: [name.length * 2, Math.min((40 + name.length / 3) * 10, 280)],
  });

  return (
    <MantineAvatar
      radius="xl"
      size={size || 32}
      sx={({ colors }) => ({
        "& >.mantine-Avatar-placeholder": {
          backgroundColor: color,
          border: `1px solid ${
            colorScheme === "dark" ? colors.gray[5] : colors.gray[2]
          }`,
          color: "#FFF",
        },
      })}
    >
      {initial}
    </MantineAvatar>
  );
};

export default Avatar;

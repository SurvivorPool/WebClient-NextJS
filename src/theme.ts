import { ThemeOptions, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      lightBlue: string;
      orange: string;
      burntOrange: string;
      peach: string;
      lavender: string;
      lightLavender: string;
      honeydew: string;
      green: string;
      lightGreen: string;
      silver: string;
      gray: string;
      border: string;
      black: string;
      offWhite: string;
    };
    fonts: {
      happyFox: string;
      raleway: string;
    };
  }

  interface ThemeOptions {
    colors: {
      lightBlue?: string;
      orange?: string;
      burntOrange?: string;
      peach?: string;
      lavender?: string;
      lightLavender?: string;
      honeydew?: string;
      green?: string;
      lightGreen?: string;
      silver?: string;
      gray?: string;
      border?: string;
      black?: string;
      offWhite?: string;
    };
    fonts: {
      happyFox?: string;
      raleway?: string;
    };
  }
}

const theme = createTheme({
  colors: {
    lightBlue: "#00AEEF",
    orange: "#FDC37B",
    burntOrange: "#C1582D",
    peach: "#FCCAB3",
    lavender: "#8799CE",
    lightLavender: "#B0BEE6",
    honeydew: "#D6EBCE",
    green: "#79C68D",
    lightGreen: "#B7DB9F",
    silver: "#F7F7F8",
    gray: "#CECECE",
    border: "#DDD",
    black: "#0D0D0D",
    offWhite: "#FDFDFD",
  },
  fonts: {
    happyFox: "Happy-Fox",
    raleway: "Raleway",
  },
  typography: {
    fontFamily: "Lato, Raleway, Arial",
  },
}) as ThemeOptions;

export default theme;

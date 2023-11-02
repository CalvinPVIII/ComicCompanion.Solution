import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  styles: {
    global: () => ({
      body: {
        color: "#f5f5f5",
        bg: "#17181c",
      },
    }),
  },
});

export default theme;

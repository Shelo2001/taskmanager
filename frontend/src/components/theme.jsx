import { extendTheme } from "@chakra-ui/react";
import "@fontsource/archivo";

const theme = extendTheme({
    fonts: {
        body: `Archivo`,
    },
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
    },
});

export default theme;

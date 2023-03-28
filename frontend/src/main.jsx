import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import theme from "./components/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider theme={theme}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </ChakraProvider>
);

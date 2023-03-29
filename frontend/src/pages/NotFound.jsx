import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>OOPS...</h1>
            <h4>404 NOT FOUND</h4>
            <Link to="/">
                <Button colorScheme={"blue"}>Go Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;

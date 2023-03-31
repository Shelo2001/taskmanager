import { Box, Code, Divider } from "@chakra-ui/react";
import React from "react";

const Samples = () => {
    return (
        <div>
            <Code>Users with admin permission</Code>
            <Box
                display={"flex"}
                bg={"blackAlpha.300"}
                flexDirection={"column"}
            >
                <Code>Email: test@test.com</Code>
                <Code>Password: asdasd</Code>
                <Code>Department: IT</Code>
                <Divider />
                <Code>Email: test1@test.com</Code>
                <Code>Password: asdasd</Code>
                <Code>Department: Sales</Code>
            </Box>
            <Code mt={"100px"}>Users without admin permission</Code>
            <Box
                display={"flex"}
                bg={"blackAlpha.300"}
                flexDirection={"column"}
            >
                <Code>Email: test2@test.com</Code>
                <Code>Password: asdasd</Code>
                <Code>Department: Developers</Code>
                <Divider />
                <Code>Email: test3@test.com</Code>
                <Code>Password: asdasd</Code>
                <Code>Department: Support</Code>
            </Box>
        </div>
    );
};

export default Samples;

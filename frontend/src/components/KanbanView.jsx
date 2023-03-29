import React from "react";
import {
    Box,
    Center,
    Divider,
    Flex,
    StackDivider,
    Text,
} from "@chakra-ui/react";

const KanbanView = () => {
    return (
        <div>
            <Flex marginTop={"10"} w={"80%"} float="right">
                <Box p="4" w="30%" bgColor="gray.200" mr="4" borderRadius="md">
                    <Text mb="4" fontSize={"2xl"} fontWeight="semibold">
                        My requests
                    </Text>
                    <Divider borderColor={"gray.800"} />
                    <Text mt={"4"}></Text>
                </Box>
                <Box p="4" w="30%" bgColor="gray.200" mr="4" borderRadius="md">
                    <Text mb="4" fontSize={"2xl"} fontWeight="semibold">
                        My tasks
                    </Text>
                    <Divider borderColor={"gray.800"} />
                    <Text mt={"4"}></Text>
                </Box>
                <Box p="4" w="30%" bgColor="gray.200" borderRadius="md">
                    <Text mb="4" fontSize={"2xl"} fontWeight="semibold">
                        Tasks to do
                    </Text>
                    <Divider borderColor={"gray.800"} />
                    <Text mt={"4"}></Text>
                </Box>
            </Flex>
        </div>
    );
};

export default KanbanView;

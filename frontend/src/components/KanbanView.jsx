import React, { useEffect } from "react";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Link,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { useTasks } from "../services/tasks";
import { Link as ReachLink } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const KanbanView = () => {
    const {
        myCreatedTasks,
        getMyCreatedTasks,
        departmentToDoTasks,
        getMyToDoTasks,
        getMyAssignedTasks,
        myAssignedTasks,
        deleteTask,
    } = useTasks();

    useEffect(() => {
        getMyCreatedTasks();
        getMyToDoTasks();
        getMyAssignedTasks();
    }, []);

    const deleteTaskHandler = (id) => {
        deleteTask(id);
    };

    return (
        <div>
            <Flex marginTop={"10"} w={"80%"} float="right">
                <Box
                    p="4"
                    maxH="700px"
                    overflow="auto"
                    w="30%"
                    bgColor="gray.200"
                    mr="4"
                    borderRadius="md"
                >
                    <Text
                        mb="4"
                        fontSize={"xl"}
                        textTransform="uppercase"
                        fontWeight="semibold"
                    >
                        My requests
                    </Text>
                    <Divider borderColor={"gray.800"} />
                    {myCreatedTasks.map((myTask) => (
                        <Tooltip placement="top" label={myTask.type}>
                            <Box
                                mt={"2.5"}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg="white"
                                borderColor="gray.200"
                                borderBottom={
                                    myTask.type === "Urgent"
                                        ? "3px solid #ff5f67"
                                        : myTask.type === "High priority"
                                        ? "3px solid #5b9e7f"
                                        : myTask.type === "Low priority"
                                        ? "3px solid #978ae6"
                                        : "3px solid #f0bb6b"
                                }
                            >
                                <Box position={"relative"} p="6">
                                    {myTask.status === "Finished" && (
                                        <Button
                                            position={"absolute"}
                                            right="20px"
                                            colorScheme="red"
                                            size="sm"
                                            onClick={() =>
                                                deleteTaskHandler(myTask.id)
                                            }
                                            leftIcon={<FaTrash />}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                    <Link
                                        as={ReachLink}
                                        to={`/task/${myTask.id}`}
                                    >
                                        <Box d="flex" alignItems="baseline">
                                            {myTask.status ===
                                            "Waiting for assignee" ? (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="red"
                                                >
                                                    {myTask.status}
                                                </Badge>
                                            ) : myTask.status ===
                                              "In progress" ? (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="blue"
                                                >
                                                    {myTask.status}
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="teal"
                                                >
                                                    {myTask.status}
                                                </Badge>
                                            )}

                                            <Text
                                                ml="2"
                                                textTransform="uppercase"
                                                fontSize="sm"
                                                fontWeight="bold"
                                                color="gray.500"
                                            >
                                                {myTask.department}
                                            </Text>
                                        </Box>
                                        <Box mt="4">
                                            <Text
                                                fontWeight="bold"
                                                fontSize="2xl"
                                            >
                                                {myTask.title}
                                            </Text>
                                            <Text mt="2" color="gray.600">
                                                {myTask.description.substring(
                                                    0,
                                                    40
                                                )}
                                                ...
                                            </Text>
                                        </Box>
                                    </Link>
                                    <Divider mt={"5px"} />
                                    <Flex
                                        mt="4"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        color="gray.600"
                                    >
                                        <Flex alignItems="center">
                                            <Avatar
                                                size="sm"
                                                name={`${myTask.user.name}`}
                                                bg="gray.400"
                                                color={"white"}
                                            />
                                            <Text
                                                ml="2"
                                                fontSize="sm"
                                                fontWeight="medium"
                                            >
                                                Author: {myTask.user.name}
                                            </Text>
                                        </Flex>
                                        <Text fontSize="sm" fontWeight="medium">
                                            Department: {myTask.user.department}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Box>
                        </Tooltip>
                    ))}
                </Box>
                <Box
                    p="4"
                    maxH="700px"
                    overflow="auto"
                    w="30%"
                    bgColor="gray.200"
                    mr="4"
                    borderRadius="md"
                >
                    <Text
                        mb="4"
                        fontSize={"xl"}
                        textTransform="uppercase"
                        fontWeight="semibold"
                    >
                        Tasks to do
                    </Text>
                    <Divider borderColor={"gray.800"} />
                    {departmentToDoTasks.map((departmentToDoTask) => (
                        <Tooltip
                            placement="top"
                            label={departmentToDoTask.type}
                        >
                            <Box
                                mt={"2.5"}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg="white"
                                borderColor="gray.200"
                                borderBottom={
                                    departmentToDoTask.type === "Urgent"
                                        ? "3px solid #ff5f67"
                                        : departmentToDoTask.type ===
                                          "High priority"
                                        ? "3px solid #5b9e7f"
                                        : departmentToDoTask.type ===
                                          "Low priority"
                                        ? "3px solid #978ae6"
                                        : "3px solid #f0bb6b"
                                }
                            >
                                <Box p="6">
                                    <Link
                                        as={ReachLink}
                                        to={`/task/${departmentToDoTask.id}`}
                                    >
                                        <Box d="flex" alignItems="baseline">
                                            {departmentToDoTask.status ===
                                            "Waiting for assignee" ? (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="red"
                                                >
                                                    {departmentToDoTask.status}
                                                </Badge>
                                            ) : departmentToDoTask.status ===
                                              "In progress" ? (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="blue"
                                                >
                                                    {departmentToDoTask.status}
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="teal"
                                                >
                                                    {departmentToDoTask.status}
                                                </Badge>
                                            )}
                                            <Text
                                                ml="2"
                                                textTransform="uppercase"
                                                fontSize="sm"
                                                fontWeight="bold"
                                                color="gray.500"
                                            >
                                                {departmentToDoTask.department}
                                            </Text>
                                        </Box>
                                        <Box mt="4">
                                            <Text
                                                fontWeight="bold"
                                                fontSize="2xl"
                                            >
                                                {departmentToDoTask.title}
                                            </Text>
                                            <Text mt="2" color="gray.600">
                                                {departmentToDoTask.description.substring(
                                                    0,
                                                    40
                                                )}
                                                ...
                                            </Text>
                                        </Box>
                                    </Link>
                                    <Divider mt={"5px"} />
                                    <Flex
                                        mt="4"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        color="gray.600"
                                    >
                                        <Flex alignItems="center">
                                            <Avatar
                                                color={"white"}
                                                size="sm"
                                                name={`${departmentToDoTask.user.name}`}
                                                bg="gray.400"
                                            />
                                            <Text
                                                ml="2"
                                                fontSize="sm"
                                                fontWeight="medium"
                                            >
                                                Author:{" "}
                                                {departmentToDoTask.user.name}
                                            </Text>
                                        </Flex>
                                        <Text fontSize="sm" fontWeight="medium">
                                            Department:{" "}
                                            {departmentToDoTask.user.department}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Box>
                        </Tooltip>
                    ))}
                </Box>
                <Box
                    p="4"
                    maxH="700px"
                    overflow="auto"
                    w="30%"
                    bgColor="gray.200"
                    borderRadius="md"
                >
                    <Text
                        mb="4"
                        fontSize={"xl"}
                        textTransform="uppercase"
                        fontWeight="semibold"
                    >
                        My Tasks
                    </Text>
                    <Divider borderColor={"gray.800"} />

                    {myAssignedTasks.map((myAssignedTask) => (
                        <Tooltip placement="top" label={myAssignedTask.type}>
                            <Box
                                mt={"2.5"}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg="white"
                                borderColor="gray.200"
                                borderBottom={
                                    myAssignedTask.type === "Urgent"
                                        ? "3px solid #ff5f67"
                                        : myAssignedTask.type ===
                                          "High priority"
                                        ? "3px solid #5b9e7f"
                                        : myAssignedTask.type === "Low priority"
                                        ? "3px solid #978ae6"
                                        : "3px solid #f0bb6b"
                                }
                            >
                                <Box p="6">
                                    <Link
                                        as={ReachLink}
                                        to={`/task/${myAssignedTask.id}`}
                                    >
                                        <Box d="flex" alignItems="baseline">
                                            {myAssignedTask.status ===
                                            "Waiting for assignee" ? (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="red"
                                                >
                                                    {myAssignedTask.status}
                                                </Badge>
                                            ) : myAssignedTask.status ===
                                              "In progress" ? (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="blue"
                                                >
                                                    {myAssignedTask.status}
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    borderRadius="full"
                                                    px="2"
                                                    colorScheme="teal"
                                                >
                                                    {myAssignedTask.status}
                                                </Badge>
                                            )}
                                            <Text
                                                ml="2"
                                                textTransform="uppercase"
                                                fontSize="sm"
                                                fontWeight="bold"
                                                color="gray.500"
                                            >
                                                {myAssignedTask.department}
                                            </Text>
                                        </Box>
                                        <Box mt="4">
                                            <Text
                                                fontWeight="bold"
                                                fontSize="2xl"
                                            >
                                                {myAssignedTask.title}
                                            </Text>
                                            <Text mt="2" color="gray.600">
                                                {myAssignedTask.description.substring(
                                                    0,
                                                    40
                                                )}
                                                ...
                                            </Text>
                                        </Box>
                                    </Link>
                                    <Divider mt={"5px"} />
                                    <Flex
                                        mt="4"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        color="gray.600"
                                    >
                                        <Flex alignItems="center">
                                            <Avatar
                                                color={"white"}
                                                size="sm"
                                                name={`${myAssignedTask.user.name}`}
                                                bg="gray.400"
                                            />
                                            <Text
                                                ml="2"
                                                fontSize="sm"
                                                fontWeight="medium"
                                            >
                                                Author:{" "}
                                                {myAssignedTask.user.name}
                                            </Text>
                                        </Flex>
                                        <Text fontSize="sm" fontWeight="medium">
                                            Department:{" "}
                                            {myAssignedTask.user.department}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Box>
                        </Tooltip>
                    ))}
                </Box>
            </Flex>
        </div>
    );
};

export default KanbanView;

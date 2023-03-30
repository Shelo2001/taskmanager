import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    Flex,
    Text,
    Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTasks } from "../services/tasks";

const Task = () => {
    const {
        getTaskById,
        assignee,
        task,
        taskNotFoundError,
        updateTaskInProgress,
        updateTaskToFinished,
    } = useTasks();
    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getTaskById(id);
    }, []);

    const assignTaskHandler = () => {
        let data = {
            assignee: user.id,
            status: "In progress",
        };
        updateTaskInProgress(id, data);
    };

    const updateTaskToFinishedHandler = () => {
        updateTaskToFinished(id);
    };

    return (
        <div>
            <Navbar />
            <Box ml={"20%"} display="flex" gap={"50px"} alignItems="center">
                {taskNotFoundError ? (
                    <Alert mr={"100px"} status="error">
                        <AlertIcon />
                        {taskNotFoundError}, Task not found
                    </Alert>
                ) : (
                    <>
                        <Box w="20%" minHeight={"80vh"}>
                            <Box
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                p="4"
                            >
                                <Text fontSize="xl" fontWeight="bold">
                                    {task?.title}
                                </Text>
                                <Divider mt={"10px"} mb="10px" />
                                <Box mt="2">
                                    <Text fontWeight="semibold">
                                        Task Number:{" "}
                                        <span style={{ fontWeight: "lighter" }}>
                                            00{task?.id}
                                        </span>
                                    </Text>
                                </Box>
                                <Box mt="2">
                                    <Text fontWeight="semibold">
                                        Type:{" "}
                                        <span style={{ fontWeight: "lighter" }}>
                                            {task?.type}
                                        </span>
                                    </Text>
                                </Box>

                                <Box mt="2">
                                    <Text fontWeight="semibold">
                                        Status:{" "}
                                        <span style={{ fontWeight: "lighter" }}>
                                            {task?.status}
                                        </span>
                                    </Text>
                                </Box>
                                <Box mt="2">
                                    <Text fontWeight="semibold">
                                        Assignee:{" "}
                                        <span style={{ fontWeight: "lighter" }}>
                                            {task?.assignee === null
                                                ? `Not assigned yet`
                                                : `Assigned by ${assignee?.name}`}
                                        </span>
                                    </Text>
                                </Box>
                                <Divider mt={"10px"} mb="10px" />
                                <Box mt="2">
                                    <Text fontWeight="semibold">
                                        Author:{" "}
                                        <span style={{ fontWeight: "lighter" }}>
                                            {task?.user?.name}
                                        </span>
                                    </Text>
                                </Box>
                                <Box mt="2">
                                    <Text fontWeight="semibold">
                                        Email:{" "}
                                        <span style={{ fontWeight: "lighter" }}>
                                            {task?.user?.email}
                                        </span>
                                    </Text>
                                </Box>
                                <Box mt="2">
                                    <Text fontWeight="semibold">
                                        Department:{" "}
                                        <span style={{ fontWeight: "lighter" }}>
                                            {task?.user?.department}
                                        </span>
                                    </Text>
                                </Box>
                                <Box mt="2">
                                    <Text fontWeight="semibold">
                                        Last log:{" "}
                                        <span style={{ fontWeight: "lighter" }}>
                                            {new Date(
                                                task?.updated_at
                                            ).toLocaleString()}
                                        </span>
                                    </Text>
                                </Box>
                                <Divider mt={"10px"} mb="10px" />
                                {task?.user_id === user.id ? (
                                    <Button
                                        isDisabled
                                        colorScheme={"blue"}
                                        w="100%"
                                    >
                                        You can't assign your task
                                    </Button>
                                ) : assignee?.name ? (
                                    <Button
                                        onClick={updateTaskToFinishedHandler}
                                        colorScheme={"blue"}
                                        w="100%"
                                    >
                                        Finish Task
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={assignTaskHandler}
                                        colorScheme={"blue"}
                                        w="100%"
                                    >
                                        Assign task
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        <Box w="60%" minHeight={"80vh"}>
                            <Flex>
                                <Box marginRight={10}>
                                    <Link to={`/task/${task.id}`}>
                                        <Text fontWeight="bold">
                                            Task Overview
                                        </Text>
                                    </Link>
                                </Box>
                                <Box marginLeft={10} marginRight={10}>
                                    <Link to={`/chat/${task.id}`}>
                                        <Text fontWeight="bold">Chat</Text>
                                    </Link>
                                </Box>
                            </Flex>
                            <Divider
                                mt={"20px"}
                                borderColor="black"
                                mb={"20px"}
                            />
                            <Flex>
                                <Textarea
                                    border={"4px solid #e5eaf2"}
                                    maxH={"70vh"}
                                    value={task.description}
                                >
                                    {task.description}
                                </Textarea>
                            </Flex>
                        </Box>
                    </>
                )}
            </Box>
        </div>
    );
};

export default Task;

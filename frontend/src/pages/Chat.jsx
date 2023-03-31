import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Input,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import Pusher from "pusher-js";
import axios from "axios";

const Chat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/task/${id}`);
    };

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const pusher = new Pusher("048daae321b9583af0c9", {
            cluster: "eu",
        });

        const channel = pusher.subscribe(`chat.${id}`);
        channel.bind(`message`, function (data) {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, []);
    const user = JSON.parse(localStorage.getItem("user"));
    const handleNewMessage = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const newText = newMessage;

        setNewMessage("");
        axios.post(`${import.meta.env.VITE_BASE_API_URL}/chat/${id}`, {
            id,
            user: user.name,
            message: newText,
        });
    };

    console.log(messages);

    return (
        <div>
            <Box position="absolute" top="2rem" left="2rem">
                <Tooltip label="go back to task">
                    <IconButton
                        aria-label="back"
                        icon={<BiArrowBack />}
                        onClick={handleClick}
                        size="md"
                        bg="white"
                        boxShadow="md"
                        borderRadius="50%"
                        _hover={{ bg: "gray.100" }}
                        _active={{ bg: "gray.200" }}
                    />
                </Tooltip>
            </Box>
            <Heading textAlign={"center"} mt="10" fontSize={"2xl"}>
                Chat for task {id}
            </Heading>
            <Box
                maxW="60%"
                mt={"15vh"}
                h="70vh"
                mx="auto"
                p={4}
                boxShadow="xl"
                borderRadius="md"
                overflow="hidden"
                bg="gray.100"
                display="flex"
                flexDirection="column"
            >
                <VStack
                    align="flex-start"
                    spacing={4}
                    flexGrow="1"
                    p={4}
                    overflowY="scroll"
                    maxHeight="calc(70vh - 64px)"
                >
                    {messages.map((message) => (
                        <HStack
                            key={message.id}
                            bg={message.user == user.name ? "white" : "#3182ce"}
                            color={message.user != user.name && "white"}
                            p={2}
                            borderRadius="lg"
                            justifyContent={
                                message.user == user.name
                                    ? "flex-end"
                                    : "flex-start"
                            }
                            alignSelf={
                                message.user == user.name
                                    ? "flex-end"
                                    : "flex-start"
                            }
                        >
                            <Text fontWeight="bold">{message.user}: </Text>
                            <Text>{message.message}</Text>
                        </HStack>
                    ))}
                    <Box ref={messagesEndRef} />
                </VStack>
                <Box borderTopWidth="1px" borderTopColor="gray.300" p={4}>
                    <HStack flexGrow="1" w="100%">
                        <Input
                            placeholder="Type your message here"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            bg="white"
                            borderRadius="full"
                            px={4}
                            py={2}
                            mr={2}
                            _focus={{ outline: "none" }}
                            flexGrow="1"
                        />
                        <Button
                            bg="blue.500"
                            color="white"
                            borderRadius="full"
                            px={4}
                            py={2}
                            onClick={handleNewMessage}
                            _hover={{ bg: "blue.600" }}
                            _active={{ bg: "blue.700" }}
                        >
                            Send
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </div>
    );
};

export default Chat;

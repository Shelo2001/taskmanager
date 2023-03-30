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

const Chat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/task/${id}`);
    };

    const [messages, setMessages] = useState([
        { id: 1, author: "John", text: "Hello" },
        { id: 2, author: "Jane", text: "Hi there" },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleNewMessage = () => {
        const newId = messages.length + 1;
        const newAuthor = "Me";
        const newText = newMessage;
        setMessages([
            ...messages,
            { id: newId, author: newAuthor, text: newText },
        ]);
        setNewMessage("");
    };

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
                            bg="white"
                            p={2}
                            borderRadius="lg"
                        >
                            <Text fontWeight="bold">{message.author}: </Text>
                            <Text>{message.text}</Text>
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

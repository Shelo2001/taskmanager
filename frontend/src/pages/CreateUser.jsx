import {
    Alert,
    AlertIcon,
    Avatar,
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Stack,
    Tooltip,
    chakra,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown, AiOutlineMail } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDepartments } from "../services/departments";
import { useUsers } from "../services/users";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CAiOutlineMail = chakra(AiOutlineMail);

const CreateUser = () => {
    const { departments, getDepartments } = useDepartments();
    const { createUser, errorUser } = useUsers();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getDepartments();
    }, []);

    const createUserHandler = () => {
        let data = { name, department, password, email };
        createUser(data);
    };

    return (
        <>
            <Box position="absolute" top="2rem" left="2rem">
                <Tooltip label="go back to dashboard">
                    <Link to="/admin">
                        <IconButton
                            aria-label="back"
                            icon={<BiArrowBack />}
                            size="md"
                            bg="white"
                            boxShadow="md"
                            borderRadius="50%"
                            _hover={{ bg: "gray.100" }}
                            _active={{ bg: "gray.200" }}
                        />
                    </Link>
                </Tooltip>
            </Box>
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                backgroundColor="gray.200"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Avatar bg="blue.500" />
                    <Heading color="blue.400">Create new user</Heading>
                    {errorUser && (
                        <Alert status="error">
                            <AlertIcon />
                            {errorUser}
                        </Alert>
                    )}
                    <Box minW={{ base: "90%", md: "468px" }}>
                        <form>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md"
                            >
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={
                                                <CFaUserAlt color="gray.300" />
                                            }
                                        />
                                        <Input
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Name"
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={
                                                <CAiOutlineMail color="gray.300" />
                                            }
                                        />
                                        <Input
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            type="email"
                                            placeholder="Email address"
                                        />
                                    </InputGroup>
                                </FormControl>

                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={
                                                <CFaLock color="gray.300" />
                                            }
                                        />
                                        <Input
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Password"
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <Select
                                            onChange={(e) =>
                                                setDepartment(e.target.value)
                                            }
                                        >
                                            <option>Choose department</option>
                                            {departments.map((department) => (
                                                <option key={department.id}>
                                                    {department.title}
                                                </option>
                                            ))}
                                        </Select>
                                    </InputGroup>
                                </FormControl>
                                <Button
                                    onClick={createUserHandler}
                                    variant="solid"
                                    colorScheme="blue"
                                    width="full"
                                >
                                    Create
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default CreateUser;

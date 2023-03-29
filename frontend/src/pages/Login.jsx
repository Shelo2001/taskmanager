import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    InputRightElement,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { useUsers } from "../services/users";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleShowClick = () => setShowPassword(!showPassword);
    const { login, errorUser } = useUsers();

    console.log(errorUser);

    const loginHandler = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
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
                <Heading color="blue.400">Task Manager</Heading>
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
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleShowClick}
                                        >
                                            {showPassword ? (
                                                <AiFillEyeInvisible
                                                    size={"20"}
                                                />
                                            ) : (
                                                <AiFillEye size={"20"} />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                type="submit"
                                variant="solid"
                                colorScheme="blue"
                                width="full"
                                onClick={loginHandler}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box></Box>
        </Flex>
    );
};

export default Login;

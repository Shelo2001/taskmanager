import {
    Button,
    Box,
    Flex,
    Heading,
    IconButton,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { AiFillBehanceSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

function Sidemenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Box zIndex={"10000"}>
            <IconButton
                aria-label="Toggle side menu"
                icon={<AiFillBehanceSquare />}
                size="md"
                variant="outline"
                onClick={isOpen ? onClose : onOpen}
                position="fixed"
                top="50%"
                transform="translateY(-50%)"
                zIndex="999"
                display={{ base: "block", md: "none" }}
            />
            <Flex
                as="nav"
                w={{ base: "full", md: "64" }}
                bg="white"
                borderRight="1px"
                borderColor="gray.200"
                flexShrink={0}
                direction="column"
                display={{ base: isOpen ? "flex" : "none", md: "flex" }}
                position="fixed"
                h="full"
                overflow="auto"
                pt={{ base: "4", md: "8" }}
            >
                <Flex
                    align="center"
                    mb={{ base: "4", md: "8" }}
                    px={{ base: "4", md: "8" }}
                >
                    <Heading size="md" fontWeight="semibold">
                        TaskManager
                    </Heading>
                </Flex>
                <Stack
                    marginRight={"10"}
                    textAlign="center"
                    spacing="4"
                    align="stretch"
                >
                    {user.is_admin && (
                        <Button variant="outline" onClick={onClose}>
                            <Text fontWeight="medium">
                                <Link to="/admin">Dashboard</Link>
                            </Text>
                        </Button>
                    )}
                    <Button variant="outline" onClick={onClose}>
                        <Text fontWeight="medium">
                            <Link to="/tasks/table">Table view</Link>
                        </Text>
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
}

export default Sidemenu;

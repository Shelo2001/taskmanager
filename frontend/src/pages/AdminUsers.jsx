import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    ModalFooter,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidemenu from "../components/Sidemenu";
import { useUsers } from "../services/users";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
function AdminUsers() {
    const {
        users,
        user: adminUser,
        getAllUsers,
        getUserById,
        loading,
    } = useUsers();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [id, setId] = useState(null);

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <Table
                marginTop={"10"}
                variant="simple"
                maxW={"70%"}
                marginLeft="20%"
            >
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Is Admin</Th>
                        <Th>Is Active</Th>
                        <Th>Department</Th>
                        <Th>Created At</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tooltip label="Double click to edit">
                            <Tr
                                _hover={{ bg: "gray.100", cursor: "pointer" }}
                                onDoubleClick={() => {
                                    onOpen();
                                    setId(user.id);
                                    getUserById(user.id);
                                }}
                                key={user.id}
                            >
                                <Td>{user.id}</Td>
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                <Td>
                                    {user.is_admin ? (
                                        <AiOutlineCheck />
                                    ) : (
                                        <AiOutlineClose />
                                    )}
                                </Td>
                                <Td>
                                    {user.is_active ? (
                                        <AiOutlineCheck />
                                    ) : (
                                        <AiOutlineClose />
                                    )}
                                </Td>
                                <Td>{user.department}</Td>
                                <Td>
                                    {new Date(user.created_at).toLocaleString()}
                                </Td>
                            </Tr>
                        </Tooltip>
                    ))}
                </Tbody>
            </Table>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            <ModalBody pb={6}>{adminUser.name}</ModalBody>

                            <ModalFooter>
                                {adminUser.is_active ? (
                                    <Button colorScheme="red" mr={3}>
                                        Deactivate
                                    </Button>
                                ) : (
                                    <Button colorScheme="teal" mr={3}>
                                        Activate
                                    </Button>
                                )}
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default AdminUsers;

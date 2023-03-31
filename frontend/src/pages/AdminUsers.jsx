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
    Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidemenu from "../components/Sidemenu";
import { useUsers } from "../services/users";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

function AdminUsers() {
    const {
        users,
        user: adminUser,
        getAllUsers,
        getUserById,
        loading,
        updateToActive,
        updateToNonActive,
        createUser,
    } = useUsers();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [id, setId] = useState(null);

    useEffect(() => {
        getAllUsers();
    }, []);

    const departments = {};
    users.forEach(function (user) {
        departments[user?.department] =
            (departments[user?.department] || 0) + 1;
    });

    const departmentNames = [];
    const count = [];
    for (var key in departments) {
        departmentNames.push(key);
        count.push(departments[key]);
    }

    const deactivateHandler = (id) => {
        updateToNonActive(id);
    };
    const activateHandler = (id) => {
        updateToActive(id);
    };

    return (
        <div>
            <Navbar />

            <Box float={"right"} mr={"100px"} mt={"50px"} mb={"10"}>
                <Chart
                    type="pie"
                    width={1000}
                    height={400}
                    series={count}
                    options={{
                        labels: departmentNames,
                    }}
                ></Chart>
            </Box>
            <Link to={`/admin/create`}>
                <Button
                    mt={"10"}
                    mb="10"
                    ml={"20%"}
                    colorScheme={"blue"}
                    borderRadius="full"
                >
                    + Create new user
                </Button>
            </Link>

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
                    <ModalHeader>User actions</ModalHeader>
                    <ModalCloseButton />
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            <ModalBody pb={6}>
                                {adminUser.is_active
                                    ? "Deactivate "
                                    : "Activate "}
                                {adminUser.name}?
                            </ModalBody>

                            <ModalFooter>
                                {adminUser.is_active ? (
                                    <Button
                                        onClick={() =>
                                            deactivateHandler(adminUser.id)
                                        }
                                        colorScheme="red"
                                        mr={3}
                                    >
                                        Deactivate
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() =>
                                            activateHandler(adminUser.id)
                                        }
                                        colorScheme="teal"
                                        mr={3}
                                    >
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

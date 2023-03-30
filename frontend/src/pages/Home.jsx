import {
    Alert,
    AlertIcon,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import KanbanView from "../components/KanbanView";
import Navbar from "../components/Navbar";
import { useDepartments } from "../services/departments";
import { useTasks } from "../services/tasks";
import Pusher from "pusher-js";

const Home = () => {
    const { getDepartments, departments } = useDepartments();
    const { createTask, taskError } = useTasks();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [departmentTask, setDepartmentTask] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        getDepartments();
    }, []);

    const createTaskHandler = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let user_id = user.id;

        const data = {
            department: departmentTask,
            title,
            description,
            type,
            user_id,
        };
        createTask(data);
    };

    return (
        <div>
            <Navbar />
            <Button
                mt={"10"}
                mb="10"
                ml={"20%"}
                colorScheme={"blue"}
                borderRadius="full"
                onClick={onOpen}
            >
                + Create new request
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setDepartmentTask("");
                    setDescription("");
                    setTitle("");
                    setType("");
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new request</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {taskError && (
                            <Alert status="error">
                                <AlertIcon />
                                {taskError}
                            </Alert>
                        )}
                        <FormControl mt={"2"} id="department">
                            <FormLabel>Department</FormLabel>
                            <Select
                                placeholder="Select department"
                                onChange={(e) =>
                                    setDepartmentTask(e.target.value)
                                }
                                type="department"
                            >
                                {departments.map((department) => (
                                    <option key={department.id}>
                                        {department.title}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl mt={"2"} id="title">
                            <FormLabel>Request Title</FormLabel>
                            <Input
                                placeholder="title"
                                type="title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={"2"} id="desc">
                            <FormLabel>Request Description</FormLabel>
                            <Textarea
                                type="desc"
                                placeholder={
                                    departmentTask.length >= 0
                                        ? `I have issues in ${departmentTask} field`
                                        : "Some other issues"
                                }
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={"2"} id="type">
                            <FormLabel>Type</FormLabel>
                            <Select
                                placeholder="Select type"
                                onChange={(e) => setType(e.target.value)}
                                type="type"
                            >
                                <option>Urgent</option>
                                <option>High priority</option>
                                <option>Low priority</option>
                                <option>Not critical</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={createTaskHandler}
                            colorScheme="blue"
                            mr={3}
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <KanbanView />
        </div>
    );
};

export default Home;

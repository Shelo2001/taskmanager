import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useTasks = create(
    devtools((set) => ({
        myCreatedTasks: [],
        departmentToDoTasks: [],
        myAssignedTasks: [],
        taskError: null,
        taskNotFoundError: null,
        task: {},
        assignee: null,
        loading: false,
        createTask: async (data) => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_API_URL}/task/create`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                window.location.href = "/";
            } catch (error) {
                set({ taskError: error.response.data.message });
                setTimeout(() => {
                    set({
                        taskError: null,
                    });
                }, 3000);
            }
        },
        getMyCreatedTasks: async () => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/tasks/mycreated/${
                    user.id
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            set({ myCreatedTasks: await res.data });
        },
        getMyToDoTasks: async () => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/tasks/${
                    user.department
                }/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            set({ departmentToDoTasks: await res.data });
        },
        getMyAssignedTasks: async () => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/tasks/myassigned/${
                    user.id
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            set({ myAssignedTasks: await res.data });
        },
        getTaskById: async (id) => {
            try {
                set({ loading: true, taskNotFoundError: null });
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_API_URL}/tasks/get/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                set({
                    task: await res.data.task,
                    assignee: await res.data.assignee,
                    loading: false,
                });
            } catch (error) {
                set({ taskNotFoundError: error.message });
            }
        },
        updateTaskInProgress: async (id, data) => {
            set({ loading: true });
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/tasks/update/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.reload();
        },
        updateTaskToFinished: async (id, data) => {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/tasks/finish/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.href = "/";
        },
        deleteTask: async (id) => {
            const token = localStorage.getItem("token");
            const res = await axios.delete(
                `${import.meta.env.VITE_BASE_API_URL}/tasks/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            window.location.href = "/";
        },
    }))
);

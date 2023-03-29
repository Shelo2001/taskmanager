import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useTasks = create(
    devtools((set) => ({
        myCreatedTasks: [],
        taskError: null,
        departmentToDoTasks: [],
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
                `${import.meta.env.VITE_BASE_API_URL}/tasks/${user.department}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            set({ departmentToDoTasks: await res.data });
        },
    }))
);

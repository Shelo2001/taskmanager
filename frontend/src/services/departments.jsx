import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useDepartments = create(
    devtools((set) => ({
        departments: [],
        getDepartments: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/departments`
            );
            set({ departments: await res.data });
        },
    }))
);

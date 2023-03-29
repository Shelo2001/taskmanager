import React, { useEffect } from "react";
import KanbanView from "../components/KanbanView";
import Navbar from "../components/Navbar";
import { useUsers } from "../services/users";

const Home = () => {
    const { users } = useUsers();

    useEffect(() => {}, []);

    return (
        <div>
            <Navbar />
            <KanbanView />
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from "react";
import Sidemenu from "./Sidemenu";
import { AiFillBell } from "react-icons/ai";
import {
    Avatar,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { useUsers } from "../services/users";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { logout } = useUsers();
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        const pusher = new Pusher("048daae321b9583af0c9", {
            cluster: "eu",
        });

        const channel = pusher.subscribe(`department.${user?.department}`);
        channel.bind(`notification`, function (data) {
            console.log(data);
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data,
            ]);
        });
    }, []);

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    return (
        <div className="header">
            <div className="header-left">
                <Sidemenu />
            </div>
            <div className="header-right">
                <Menu>
                    <MenuButton>
                        <IconButton
                            border={"1px solid gray"}
                            borderRadius="full"
                            variant={"ghost"}
                            icon={<AiFillBell size={"20"} />}
                        />
                        <p className="notifications">{notifications.length}</p>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={clearAllNotifications}>
                            Clear
                        </MenuItem>
                        <MenuDivider />
                        {notifications.length === 0 ? (
                            <p style={{ marginLeft: "10px" }}>
                                No notifications yet
                            </p>
                        ) : (
                            notifications.map((notification) => (
                                <>
                                    <MenuItem>
                                        <Link
                                            to={`/task/${notification?.notification?.id}`}
                                        >
                                            New task -{" "}
                                            {notification?.notification?.id}
                                        </Link>
                                    </MenuItem>
                                </>
                            ))
                        )}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton>
                        <Avatar
                            name={`${user.name}`}
                            bg={"blue.500"}
                            w="40px"
                            color={"white"}
                            height={"40px"}
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => logout()}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;

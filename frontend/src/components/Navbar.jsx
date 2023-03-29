import React from "react";
import Sidemenu from "./Sidemenu";
import { AiFillBell } from "react-icons/ai";
import {
    Avatar,
    Button,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { useUsers } from "../services/users";

const Navbar = () => {
    const { logout } = useUsers();
    const user = JSON.parse(localStorage.getItem("user"));

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
                        <p className="notifications">0</p>
                    </MenuButton>
                    <MenuList>
                        <p style={{ marginLeft: "10px" }}>
                            No notifications yet
                        </p>
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

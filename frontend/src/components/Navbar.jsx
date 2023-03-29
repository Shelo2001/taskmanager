import React from "react";
import Sidemenu from "./Sidemenu";
import { AiFillBell } from "react-icons/ai";
import {
    Button,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";

const Navbar = () => {
    return (
        <div className="header">
            <div className="header-left">
                <Sidemenu />
            </div>
            <div className="header-right">
                <Menu>
                    <MenuButton>
                        <Image
                            borderRadius="full"
                            border={"1px solid gray"}
                            boxSize="50px"
                            src="https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png"
                            alt="Dan Abramov"
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Create new task</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;

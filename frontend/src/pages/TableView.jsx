import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const TableView = () => {
    return (
        <div>
            <Box position="absolute" top="2rem" left="2rem">
                <Tooltip label="go back to home">
                    <Link to="/">
                        <IconButton
                            aria-label="back"
                            icon={<BiArrowBack />}
                            size="md"
                            bg="white"
                            boxShadow="md"
                            borderRadius="50%"
                            _hover={{ bg: "gray.100" }}
                            _active={{ bg: "gray.200" }}
                        />
                    </Link>
                </Tooltip>
            </Box>
        </div>
    );
};

export default TableView;

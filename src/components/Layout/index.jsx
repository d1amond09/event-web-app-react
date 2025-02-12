import { Outlet } from "react-router-dom";
import { Box, Divider } from "@chakra-ui/react";
import NavBar from "../Header/NavBar";

const Layout = () => {
    return (
        <>
        <header>
            <NavBar/>
        </header>
        <main>
            <Box m={5} h={"81vh"}>
                <Outlet/>
            </Box>
        </main>
        <footer>
            <Box align="center" w={"100vw"}>
                <Divider w={"90vw"}/>

            </Box>
        </footer> 
        </>
    );
}

export {Layout}
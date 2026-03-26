import {Footer} from "./Footer.tsx";
import {Outlet} from "react-router-dom";
import {Header} from "./Header.tsx";

export const Layout = () => {
    return (
        <>
            <Header/>
                <Outlet/>
            <Footer/>
        </>
    )
}
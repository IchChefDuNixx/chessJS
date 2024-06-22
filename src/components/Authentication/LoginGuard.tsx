import axios from "axios";
import React, {useState} from "react";

import LoginPage from "./LoginPage";
import NavBar from "../App/NavBar";


async function checkLogin(): Promise<boolean> {
    if (!sessionStorage.accessToken) {
        return false;
    }
    const config = {headers: {"Authorization": `Bearer ${sessionStorage.accessToken}`}};  // authentication
    const logged_in = await axios.get("api/user/logged_in", config)
    .then(() => true)
    .catch(() => {
        sessionStorage.removeItem("accessToken")    // delete invalid token
        return false
    })
    
    return logged_in;
}

type Props = {
    children: React.ReactNode;
};

function LoginGuard( {children}: Props ) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);

    checkLogin().then((value) => {
        setLoading(false);
        setLoggedIn(value);
    })

    if (isLoading) {
        return <div className="App"> Checking Login... </div>;
    }

    if (!loggedIn) {
        return (
            <>
                <NavBar />
                <LoginPage />
            </>
        );
    }
    return <>{children}</>
}

export default LoginGuard;
export { checkLogin };

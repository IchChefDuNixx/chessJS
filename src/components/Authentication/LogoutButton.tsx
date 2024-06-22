import { useNavigate } from "react-router-dom";


function LogoutButton() {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("username");

        navigate(0);
    }

    return(
        <button onClick={logout}> Logout </button>
    )
}

export default LogoutButton;

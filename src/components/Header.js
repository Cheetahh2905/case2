import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";

export default function Header() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("currentUser");
        navigate("/");
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "#212529" }}>
            <Toolbar>
                {/* Logo / Brand */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/home"
                    style={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
                >
                    🛒 Shop App
                </Typography>

                {/* Menu bên trái */}
                <Box sx={{ display: "flex", ml: 3 }}>
                    <Button color="inherit" component={Link} to="/home">
                        Home
                    </Button>

                    {currentUser?.role === "admin" && (
                        <>
                            <Button color="inherit" onClick={() => navigate("/home/add-product")}>
                                Thêm sản phẩm
                            </Button>
                            <Button color="inherit" onClick={() => navigate("/home/order-management")}>
                                Orders
                            </Button>
                        </>
                    )}

                    {currentUser?.role === "user" && (
                        <Button color="inherit" onClick={() => navigate("/home/order-management")}>
                            Orders
                        </Button>
                    )}
                </Box>

                {/* Spacer đẩy phần user sang phải */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Menu bên phải */}
                {currentUser && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                            color="inherit"
                            onClick={() => navigate(`/home/edit-user/${currentUser.id}`)}
                        >
                            User
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            sx={{ ml: 2 }}
                            onClick={handleLogout}
                        >
                            Logout {currentUser.name}
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

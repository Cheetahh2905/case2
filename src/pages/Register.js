import { useState } from "react";
import { URL_USERS } from "../const/URLS";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";

export default function Register() {
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    function handleChange(e) {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    function handleRegister() {
        if (!newUser.username.trim() || !newUser.password.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        if (newUser.password.length < 3) {
            alert("Mật khẩu phải ít nhất 3 ký tự!");
            return;
        }

        axios.post(URL_USERS, { ...newUser, role: "user" }).then(() => {
            alert("Đăng ký tài khoản thành công");
            navigate("/");
        });
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
            }}
        >
            <Card
                sx={{
                    width: 400,
                    borderRadius: 4,
                    boxShadow: 6,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Typography
                        variant="h5"
                        align="center"
                        fontWeight="bold"
                        color="primary"
                        gutterBottom
                    >
                        Đăng ký
                    </Typography>

                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={newUser.username}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, borderRadius: "12px", py: 1.2, fontWeight: "bold" }}
                        onClick={handleRegister}
                    >
                        Đăng ký
                    </Button>

                    <Typography align="center" sx={{ mt: 2 }}>
                        Đã có tài khoản?{" "}
                        <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
                            Đăng nhập
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

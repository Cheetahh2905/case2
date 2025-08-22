import { useEffect, useState } from "react";
import axios from "axios";
import { URL_USERS } from "../const/URLS";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [userList, setUserList] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(URL_USERS).then((response) => {
            setUserList(response.data);
        });
    }, []);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleLogin() {
        const userCheck = userList.find(
            (item) =>
                item.username === user.username &&
                item.password === user.password
        );
        if (userCheck) {
            localStorage.setItem("currentUser", JSON.stringify(userCheck));
            alert("Đăng nhập thành công");
            navigate("/home");
        } else {
            alert("Sai tài khoản hoặc mật khẩu");
        }
    }

    return (
        <div
            style={{
                background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                sx={{
                    width: 400,
                    borderRadius: 4,
                    boxShadow: 6,
                    backdropFilter: "blur(10px)",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            background:
                                "linear-gradient(90deg, #ff9966, #ff5e62)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Đăng nhập
                    </Typography>

                    <TextField
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={user.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            mb: 1,
                            py: 1,
                            borderRadius: 2,
                            background:
                                "linear-gradient(90deg, #667eea, #764ba2)",
                        }}
                        onClick={handleLogin}
                    >
                        🚀 Đăng nhập
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ py: 1, borderRadius: 2 }}
                        onClick={() => navigate("/register")}
                    >
                        ➕ Đăng ký tài khoản mới
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser, getUserById } from "../service/UserService";
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
} from "@mui/material";

export default function Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [form, setForm] = useState({
        name: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            const user = JSON.parse(strUser);
            setCurrentUser(user);

            getUserById(user.id).then((data) => {
                setForm({
                    name: data.name || "",
                    password: data.password || "",
                    confirmPassword: data.password || "",
                });
            });
        }
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!currentUser) return;

        if (!form.name.trim()) {
            alert("Tên không được để trống!");
            return;
        }
        if (form.password.length < 3) {
            alert("Mật khẩu phải ít nhất 3 ký tự!");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        const updatedUser = {
            ...currentUser,
            name: form.name,
            password: form.password,
        };

        await editUser(updatedUser, currentUser.id);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        alert("Cập nhật thông tin cá nhân thành công!");
        navigate("/home");
    }

    if (!currentUser)
        return (
            <Typography color="error" mt={3}>
                Bạn chưa đăng nhập
            </Typography>
        );

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardHeader
                    title={
                        <Typography
                            variant="h5"
                            align="center"
                            fontWeight="bold"
                            color="white"
                        >
                            🔒 Thông tin cá nhân
                        </Typography>
                    }
                    sx={{
                        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}
                />
                <CardContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <TextField
                            label="Tên đăng nhập"
                            value={currentUser.username}
                            disabled
                            fullWidth
                        />
                        <TextField
                            label="Tên hiển thị"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nhập tên hiển thị"
                            fullWidth
                        />
                        <TextField
                            label="Mật khẩu"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu mới"
                            fullWidth
                        />
                        <TextField
                            label="Xác nhận mật khẩu"
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu"
                            fullWidth
                        />
                        <Box textAlign="right" mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{ px: 4, borderRadius: 5, fontWeight: "bold" }}
                            >
                                💾 Lưu thay đổi
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

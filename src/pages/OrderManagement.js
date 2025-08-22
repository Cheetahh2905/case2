import { useEffect, useState } from "react";
import { getOrders, getOrdersByUser, updateOrderStatus } from "../service/OrderService";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Alert,
    Chip,
    Box,
} from "@mui/material";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [editedOrders, setEditedOrders] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            const user = JSON.parse(strUser);
            setCurrentUser(user);

            if (user.role === "admin") {
                getOrders().then(setOrders);
            } else {
                getOrdersByUser(user.id).then(setOrders);
            }
        }
    }, []);

    function handleSelectChange(orderId, newStatus) {
        setEditedOrders((prev) => ({
            ...prev,
            [orderId]: newStatus,
        }));
    }

    async function handleSaveAll() {
        for (let orderId in editedOrders) {
            await updateOrderStatus(orderId, editedOrders[orderId]);
        }
        alert("Cập nhật trạng thái thành công ✅");
        navigate("/home");
    }

    function getStatusChip(status) {
        switch (status) {
            case "pending":
                return <Chip label="Pending" color="warning" variant="outlined" />;
            case "delivered":
                return <Chip label="Delivered" color="success" variant="outlined" />;
            case "cancelled":
                return <Chip label="Cancelled" color="error" variant="outlined" />;
            default:
                return <Chip label={status} color="default" />;
        }
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                📦 Danh sách đơn hàng
            </Typography>

            {orders.length === 0 ? (
                <Alert severity="info" sx={{ textAlign: "center", fontSize: "1.1rem" }}>
                    🚫 Chưa có đơn hàng nào
                </Alert>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {orders.map((order) => (
                            <Grid item xs={12} md={6} key={order.id}>
                                <Card sx={{ borderRadius: 3, boxShadow: 4, height: "100%" }}>
                                    <CardContent>
                                        <Typography variant="h6" color="primary" fontWeight="bold">
                                            Mã đơn: {order.id}
                                        </Typography>
                                        <Typography>
                                            <b>Người mua:</b> {order.userId}
                                        </Typography>
                                        <Typography>
                                            <b>Sản phẩm:</b> {order.productName}
                                        </Typography>
                                        <Typography>
                                            <b>Số lượng:</b> {order.quantity}
                                        </Typography>
                                        <Typography>
                                            <b>Tổng tiền:</b>{" "}
                                            <Box component="span" color="success.main" fontWeight="bold">
                                                {Number(order.totalPrice).toLocaleString("vi-VN")} ₫
                                            </Box>
                                        </Typography>
                                        <Typography sx={{ mt: 1 }}>
                                            <b>Trạng thái:</b> {getStatusChip(order.status)}
                                        </Typography>

                                        {currentUser?.role === "admin" && (
                                            <FormControl fullWidth sx={{ mt: 2 }}>
                                                <InputLabel>Cập nhật trạng thái</InputLabel>
                                                <Select
                                                    value={editedOrders[order.id] || order.status}
                                                    onChange={(e) => handleSelectChange(order.id, e.target.value)}
                                                    label="Cập nhật trạng thái"
                                                >
                                                    <MenuItem value="pending">Pending</MenuItem>
                                                    <MenuItem value="delivered">Delivered</MenuItem>
                                                    <MenuItem value="cancelled">Cancelled</MenuItem>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {currentUser?.role === "admin" && (
                        <Box textAlign="center" mt={4}>
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                onClick={handleSaveAll}
                                sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: "bold" }}
                            >
                                💾 Lưu thay đổi
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
}

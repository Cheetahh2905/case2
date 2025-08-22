import { useEffect, useState } from "react";
import { getOrders, getOrdersByUser } from "../service/OrderService";

import {
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Alert,
} from "@mui/material";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

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

    return (
        <Container sx={{ my: 5 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardHeader
                    title={
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            📦 Danh sách đơn hàng
                        </Typography>
                    }
                    sx={{
                        background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        p: 2,
                    }}
                />

                <CardContent>
                    {orders.length === 0 ? (
                        <Alert
                            severity="info"
                            sx={{ fontSize: "1.1rem", borderRadius: 2, textAlign: "center" }}
                        >
                            🚫 Chưa có đơn hàng nào
                        </Alert>
                    ) : (
                        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            background: "linear-gradient(90deg, #43cea2, #185a9d)",
                                        }}
                                    >
                                        <TableCell align="center" sx={{ color: "white" }}>
                                            Mã đơn
                                        </TableCell>
                                        <TableCell sx={{ color: "white" }}>Người mua</TableCell>
                                        <TableCell sx={{ color: "white" }}>Sản phẩm</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>
                                            Số lượng
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: "white" }}>
                                            Tổng tiền
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id} hover>
                                            <TableCell align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
                                                {order.id}
                                            </TableCell>
                                            <TableCell>{order.userId}</TableCell>
                                            <TableCell>{order.productName}</TableCell>
                                            <TableCell align="center">{order.quantity}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: "bold", color: "success.main" }}>
                                                {Number(order.totalPrice).toLocaleString("vi-VN")} ₫
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

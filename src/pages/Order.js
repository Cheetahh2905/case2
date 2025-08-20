import { useEffect, useState } from "react";
import { getOrders, getOrdersByUser } from "../service/OrderService";

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
        <div className="container my-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-gradient text-white rounded-top-4 p-3"
                     style={{ background: "linear-gradient(135deg, #4facfe, #00f2fe)" }}>
                    <h3 className="mb-0 text-center">📦 Danh sách đơn hàng</h3>
                </div>
                <div className="card-body">
                    {orders.length === 0 ? (
                        <div className="alert alert-info text-center fs-5 rounded-3 shadow-sm">
                            🚫 Chưa có đơn hàng nào
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table align-middle table-hover">
                                <thead className="text-white"
                                       style={{ background: "linear-gradient(90deg, #43cea2, #185a9d)" }}>
                                <tr className="text-center">
                                    <th>Mã đơn</th>
                                    <th>Người mua</th>
                                    <th>Sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="shadow-sm">
                                        <td className="fw-bold text-center text-primary">{order.id}</td>
                                        <td>{order.userId}</td>
                                        <td>{order.productName}</td>
                                        <td className="text-center">{order.quantity}</td>
                                        <td className="text-end fw-semibold text-success">
                                            {Number(order.totalPrice).toLocaleString("vi-VN")} ₫
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

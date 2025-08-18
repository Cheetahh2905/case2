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
                // Admin -> xem tất cả đơn hàng
                getOrders().then(setOrders);
            } else {
                // User -> chỉ xem đơn hàng của chính mình
                getOrdersByUser(user.id).then(setOrders);
            }
        }
    }, []);

    return (
        <div>
            <h2>Danh sách đơn hàng</h2>
            {orders.length === 0 ? (
                <p>Chưa có đơn hàng nào</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                        <p><b>Mã đơn hàng:</b> {order.id}</p>
                        <p><b>Người mua:</b> {order.userId}</p>
                        <p><b>Sản phẩm:</b> {order.productName}</p>
                        <p><b>Số lượng:</b> {order.quantity}</p>
                        <p><b>Tổng tiền:</b> {order.totalPrice}</p>
                    </div>
                ))
            )}
        </div>
    );
}

import { useEffect, useState } from "react";
import { getOrders, getOrdersByUser, updateOrderStatus } from "../service/OrderService";
import { useNavigate } from "react-router-dom";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [editedOrders, setEditedOrders] = useState({}); // lưu trạng thái đã chỉnh sửa
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
        // Lưu tất cả thay đổi lên server
        for (let orderId in editedOrders) {
            await updateOrderStatus(orderId, editedOrders[orderId]);
        }
        alert("Cập nhật trạng thái thành công ✅");
        navigate("/home"); // Quay lại trang Home
    }

    function getStatusBadge(status) {
        switch (status) {
            case "pending":
                return "badge bg-warning text-dark";
            case "delivered":
                return "badge bg-success";
            case "cancelled":
                return "badge bg-danger";
            default:
                return "badge bg-secondary";
        }
    }

    return (
        <div className="container mt-4 orders-page">
            <h2 className="text-center mb-4 fw-bold title">
                📦 Danh sách đơn hàng
            </h2>

            {orders.length === 0 ? (
                <div className="alert alert-info text-center shadow-sm">
                    Chưa có đơn hàng nào
                </div>
            ) : (
                <>
                    <div className="row">
                        {orders.map((order) => (
                            <div key={order.id} className="col-md-6 mb-4">
                                <div className="card order-card shadow-lg border-0 h-100">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold text-primary">
                                            Mã đơn: {order.id}
                                        </h5>
                                        <p className="mb-2">
                                            <b>Người mua:</b> {order.userId}
                                        </p>
                                        <p className="mb-2">
                                            <b>Sản phẩm:</b> {order.productName}
                                        </p>
                                        <p className="mb-2">
                                            <b>Số lượng:</b> {order.quantity}
                                        </p>
                                        <p className="mb-2">
                                            <b>Tổng tiền:</b>{" "}
                                            <span className="text-success fw-bold">
                                                {Number(order.totalPrice).toLocaleString("vi-VN")} ₫
                                            </span>
                                        </p>
                                        <p>
                                            <b>Trạng thái:</b>{" "}
                                            <span className={getStatusBadge(order.status)}>
                                                {order.status}
                                            </span>
                                        </p>

                                        {currentUser?.role === "admin" && (
                                            <div className="mb-2">
                                                <label className="form-label fw-bold">
                                                    Cập nhật trạng thái:
                                                </label>
                                                <select
                                                    className="form-select"
                                                    value={editedOrders[order.id] || order.status}
                                                    onChange={(e) =>
                                                        handleSelectChange(order.id, e.target.value)
                                                    }
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {currentUser?.role === "admin" && (
                        <div className="text-center mt-3">
                            <button
                                className="btn btn-success px-4 py-2 fw-bold"
                                onClick={handleSaveAll}
                            >
                                💾 Lưu
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

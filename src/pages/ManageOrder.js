import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../service/OrderService";
import { getProducts } from "../service/ProductService";

export default function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getOrders().then(setOrders);
        getProducts().then(setProducts);
    }, []);

    function getProductName(productId) {
        const p = products.find((pr) => pr.id === productId);
        return p ? p.name : "Unknown";
    }

    async function handleChangeStatus(orderId, newStatus) {
        await updateOrderStatus(orderId, newStatus);
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }

    return (
        <div>
            <h2>Quản lý đơn hàng (Admin)</h2>
            {orders.map((o) => (
                <div key={o.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                    <p><b>Mã đơn:</b> {o.id}</p>
                    <p><b>User ID:</b> {o.userId}</p>
                    <p>
                        <b>Trạng thái:</b>
                        <select value={o.status} onChange={(e) => handleChangeStatus(o.id, e.target.value)}>
                            <option value="pending">pending</option>
                            <option value="delivered">delivered</option>
                            <option value="cancelled">cancelled</option>
                        </select>
                    </p>
                    <ul>
                        {o.items.map((it, idx) => (
                            <li key={idx}>
                                {getProductName(it.productId)} - SL: {it.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

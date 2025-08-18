import { useEffect, useState } from "react";
import { getOrdersByUser } from "../service/OrderService";
import { getProducts } from "../service/ProductService";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (currentUser) {
            getOrdersByUser(currentUser.id).then(setOrders);
            getProducts().then(setProducts);
        }
    }, [currentUser]);

    function getProductName(productId) {
        const p = products.find((pr) => pr.id === productId);
        return p ? p.name : "Unknown";
    }

    return (
        <div>
            <h2>Đơn hàng của tôi</h2>
            {orders.map((o) => (
                <div key={o.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                    <p><b>Mã đơn:</b> {o.id}</p>
                    <p><b>Trạng thái:</b> {o.status}</p>
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

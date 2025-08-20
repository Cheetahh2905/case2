import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../service/ProductService";
import { createOrder } from "../service/OrderService";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        async function fetchData() {
            const data = await getProductById(id);
            setProduct(data);
        }
        fetchData();
    }, [id]);

    async function handleBuy() {
        const newOrder = {
            userId: currentUser.id,
            productId: product.id,
            productName: product.name,
            quantity: Number(quantity),
            totalPrice: product.price * Number(quantity),
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        await createOrder(newOrder);
        navigate("/home/orders");
    }

    if (!product) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-3 text-primary fw-bold">
                        {product.name}
                    </h2>
                    <p className="text-muted">{product.description}</p>
                    <p className="fw-bold fs-5 text-danger">
                        Giá: {product.price.toLocaleString()} VNĐ
                    </p>

                    <div className="mb-3">
                        <label className="form-label">Số lượng:</label>
                        <input
                            type="number"
                            value={quantity}
                            min={1}
                            className="form-control w-25"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleBuy}
                        className="btn btn-success w-100 fw-bold"
                    >
                        🛒 Mua ngay
                    </button>
                </div>
            </div>
        </div>
    );
}

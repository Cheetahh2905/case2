import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getProductById} from "../service/ProductService";
import {createOrder} from "../service/OrderService";

export default function ProductDetail() {
    const {id} = useParams();
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
            productName: product.name,      // thêm để hiển thị
            quantity: Number(quantity),
            totalPrice: product.price * Number(quantity),
            status: "pending",
            createdAt: new Date().toISOString()
        };
        await createOrder(newOrder);
        navigate("/home/orders");
    }


    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Giá: {product.price}</p>
            <input
                type="number"
                value={quantity}
                min={1}
                onChange={e => setQuantity(e.target.value)}
            />
            <button onClick={handleBuy}>Mua</button>
        </div>
    );
}

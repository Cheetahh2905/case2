import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {editProduct, getProductById} from "../service/ProductService";

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        }
        fetchProduct();
    }, [id]);

    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    async function handleEdit(e) {
        e.preventDefault();
        await editProduct(id, product);
        navigate("/home");
    }

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleEdit}>
                Name:
                <input
                    type="text"
                    value={product.name}
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />
                <br/>
                Description:
                <input
                    type="text"
                    value={product.description}
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />
                <br/>
                Price:
                <input
                    type="number"
                    value={product.price}
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                />
                <br/>
                Stock:
                <input
                    type="number"
                    value={product.stock}
                    name="stock"
                    placeholder="Stock"
                    onChange={handleChange}
                />
                <br/>
                <button type="submit">Sửa</button>
                <button type="button" onClick={() => navigate(-1)}>Quay lại</button>
            </form>
        </div>
    );
}

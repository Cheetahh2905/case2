import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editProduct, getProductById } from "../service/ProductService";

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        description: "",
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
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-gradient bg-warning text-dark text-center py-4">
                            <h3 className="mb-0 fw-bold">✏️ Chỉnh sửa sản phẩm</h3>
                        </div>
                        <div className="card-body p-5">
                            <form onSubmit={handleEdit}>
                                <div className="form-floating mb-4">
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        id="name"
                                        value={product.name}
                                        name="name"
                                        placeholder="Tên sản phẩm"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="name">Tên sản phẩm</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <textarea
                                        className="form-control rounded-3"
                                        id="description"
                                        style={{ height: "100px" }}
                                        value={product.description}
                                        name="description"
                                        placeholder="Mô tả"
                                        onChange={handleChange}
                                    ></textarea>
                                    <label htmlFor="description">Mô tả</label>
                                </div>

                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                className="form-control rounded-3"
                                                id="price"
                                                value={product.price}
                                                name="price"
                                                placeholder="Giá"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="price">Giá (₫)</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                className="form-control rounded-3"
                                                id="stock"
                                                value={product.stock}
                                                name="stock"
                                                placeholder="Số lượng tồn"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="stock">Số lượng tồn</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-5">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4 py-2 rounded-3"
                                        onClick={() => navigate(-1)}
                                    >
                                        ⬅️ Quay lại
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4 py-2 rounded-3 fw-bold shadow-sm"
                                    >
                                        💾 Lưu thay đổi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

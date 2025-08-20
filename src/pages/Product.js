import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../service/ProductService";
import { useNavigate } from "react-router-dom";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }
    }, []);

    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products);
        });
    }, []);

    function handleDelete(productId) {
        if (window.confirm("Bạn có chắc muốn xóa không?")) {
            deleteProduct(productId).then(() => {
                setProducts(products.filter((item) => item.id !== productId));
            });
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold text-primary">🛍 Danh sách sản phẩm</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden product-card">
                            {/* Ảnh sản phẩm */}
                            <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: "180px" }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="img-fluid"
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold text-dark">{product.name}</h5>
                                <p className="card-text text-muted">{product.description}</p>
                                <p className="mb-1">
                                    <span className="fw-bold text-danger fs-5">{product.price}₫</span>
                                </p>
                                <p className="mb-3 text-secondary">
                                    <small>Kho: {product.stock}</small>
                                </p>

                                {/* Nút */}
                                <div className="mt-auto">
                                    {currentUser && currentUser.role === "admin" && (
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                ❌ Xóa
                                            </button>
                                            <button
                                                className="btn btn-outline-warning btn-sm rounded-pill px-3"
                                                onClick={() =>
                                                    navigate(`/home/edit-product/${product.id}`)
                                                }
                                            >
                                                ✏️ Sửa
                                            </button>
                                        </div>
                                    )}

                                    {currentUser && currentUser.role === "user" && (
                                        <button
                                            className="btn btn-primary w-100 rounded-pill fw-bold"
                                            onClick={() => navigate(`/home/products/${product.id}`)}
                                        >
                                            🔍 Xem chi tiết
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CSS thêm hiệu ứng hover */}
            <style>{`
                .product-card {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                }
            `}</style>
        </div>
    );
}

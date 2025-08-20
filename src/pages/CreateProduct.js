import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../service/ProductService";

export default function CreateProduct() {
    const [currentUser, setCurrentUser] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }
    }, []);

    function handleChange(e) {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }

    function handleAdd() {
        const newProducts = {
            ...newProduct,
            price: Number(newProduct.price),
            stock: Number(newProduct.stock),
            createdBy: currentUser.id,
            createdDate: new Date().toISOString(),
        };
        addProduct(newProducts).then(() => {
            navigate("/home");
        });
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow rounded-4 border-0">
                        <div className="card-header bg-gradient bg-primary text-white text-center py-4 rounded-top-4">
                            <h4 className="mb-0 fw-bold">➕ Thêm sản phẩm mới</h4>
                        </div>
                        <div className="card-body p-4">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    id="name"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleChange}
                                    placeholder="Tên sản phẩm"
                                />
                                <label htmlFor="name">Tên sản phẩm</label>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea
                                    className="form-control rounded-3"
                                    id="description"
                                    name="description"
                                    rows="3"
                                    value={newProduct.description}
                                    onChange={handleChange}
                                    placeholder="Mô tả sản phẩm"
                                    style={{ height: "100px" }}
                                ></textarea>
                                <label htmlFor="description">Mô tả</label>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control rounded-3"
                                            id="price"
                                            name="price"
                                            value={newProduct.price}
                                            onChange={handleChange}
                                            placeholder="Giá"
                                        />
                                        <label htmlFor="price">Giá (₫)</label>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control rounded-3"
                                            id="stock"
                                            name="stock"
                                            value={newProduct.stock}
                                            onChange={handleChange}
                                            placeholder="Số lượng tồn"
                                        />
                                        <label htmlFor="stock">Số lượng tồn</label>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm"
                                onClick={handleAdd}
                                style={{ transition: "0.3s" }}
                            >
                                ✅ Lưu sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

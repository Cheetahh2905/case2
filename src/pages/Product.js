import {useEffect, useState} from "react";
import {deleteProduct, getProducts} from "../service/ProductService";
import {useNavigate} from "react-router-dom";


export default function Product() {
    const [products, setProducts] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const strUser = localStorage.getItem('currentUser');
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }
    },[])

    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products);
        })
    },[])

    function handleDelete(productId) {
        if (window.confirm('Bạn co chắc muốn xóa không?')){
            deleteProduct(productId).then(() => {
                setProducts(products.filter((item) => item.id !== productId));
            })
        }
    }
    return (
        <>
            List Products
            {products.map((product) => (
                <div key={product.id}>
                    <h3>Name: {product.name}</h3>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>

                    {currentUser && currentUser.role === "admin" && (
                        <div>
                            <button onClick={() =>handleDelete(product.id)}>Xóa</button>
                            <button onClick={()=>navigate(`/home/edit-product/${product.id}`)}>Sửa</button>
                        </div>
                    )}
                    {currentUser && currentUser.role === "user" && (
                        <div>
                            <button onClick={()=> navigate(`/home/products/${product.id}`)}>Xem chi tiết</button>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}
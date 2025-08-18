import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {addProduct} from "../service/ProductService";

export default function CreateProduct() {
    const [currentUser, setCurrentUser] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: null,
        stock: null,
    });
    const navigate = useNavigate();
    useEffect(() => {
        const strUser = localStorage.getItem('currentUser');
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }
    },[])
    function handleChange(e) {
        setNewProduct({...newProduct, [e.target.name]: e.target.value});
    }
    function handleAdd(){
        const newProducts = {
            ...newProduct,
            price: Number(newProduct.price),
            stock: Number(newProduct.stock),
            createdBy: currentUser.id,
            createdDate: new Date().toISOString(),
        }
        addProduct(newProducts).then(() => {
            navigate('/home')
        })
    }
    return (
        <>
            createProduct
            <br/>
            Name:
            <input
                type="text"
                name={'name'}
                value={newProduct.name}
                onChange={handleChange}
            />
            <br/>
            Description:
            <input
                type="text"
                name={'description'}
                value={newProduct.description}
                onChange={handleChange}
            />
            <br/>
            Price:
            <input
                type="text"
                name={'price'}
                value={newProduct.price}
                onChange={handleChange}
            />
            <br/>
            Stock:
            <input
                type="text"
                name={'stock'}
                value={newProduct.stock}
                onChange={handleChange}
            />
            <br/>
            <button onClick={handleAdd}>Thêm sản phẩm</button>
        </>
    )
}
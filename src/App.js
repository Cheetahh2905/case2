import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Order";
import OrderManagement from "./pages/OrderManagement";
import Profile from "./pages/Profile";


function App() {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='home' element={<Home/>}>
                <Route path='' element={<Product/>}/>
                <Route path='add-product' element={<CreateProduct/>}/>
                <Route path='edit-product/:id' element={<EditProduct/>}/>
                <Route path='products/:id' element={<ProductDetails/>}/>
                <Route path='orders' element={<Orders/>}/>
                <Route path='order-management' element={<OrderManagement/>}/>
                <Route path='edit-user/:id' element={<Profile/>}/>
            </Route>
        </Routes>
    );
}

export default App;

import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrder";
import ManageOrders from "./pages/ManageOrder";
import Orders from "./pages/Order";


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
                <Route path='my-orders' element={<MyOrders/>}/>
                <Route path='manage-orders' element={<ManageOrders/>}/>
                <Route path='orders' element={<Orders/>}/>
            </Route>
        </Routes>
    );
}

export default App;

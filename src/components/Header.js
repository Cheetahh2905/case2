import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Header() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const strUser = localStorage.getItem('currentUser');
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }else{
            //navigate('/');
        }
    },[])
    function handleLogout() {
        localStorage.removeItem('currentUser');
        navigate('/');
    }
    return (
        <>
            <div>
                <Link to={'/home'}>Home</Link>
                {currentUser && currentUser.role === 'admin' &&(
                    <button onClick={()=>navigate('/home/add-product')}>Thêm sản phẩm</button>
                )}
                {currentUser && currentUser.role === 'user' && (
                    <button onClick={() => navigate('/home/orders')}>Orders</button>
                )}
                {currentUser && <button onClick={handleLogout}>Logout {currentUser.name}</button>}
            </div>
        </>
    )
}
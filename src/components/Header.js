import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("currentUser");
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    🛒 Shop App
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                Home
                            </Link>
                        </li>

                        {currentUser && currentUser.role === "admin" && (
                            <>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-link nav-link"
                                        onClick={() => navigate("/home/add-product")}
                                    >
                                        Thêm sản phẩm
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-link nav-link"
                                        onClick={() => navigate("/home/order-management")}
                                    >
                                        Orders
                                    </button>
                                </li>
                            </>
                        )}

                        {currentUser && currentUser.role === "user" && (
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link"
                                    onClick={() => navigate("/home/order-management")}
                                >
                                    Orders
                                </button>
                            </li>
                        )}
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {currentUser && (
                            <>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-link nav-link"
                                        onClick={() =>
                                            navigate(`/home/edit-user/${currentUser.id}`)
                                        }
                                    >
                                        User
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light ms-2"
                                        onClick={handleLogout}
                                    >
                                        Logout {currentUser.name}
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

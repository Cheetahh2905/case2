import { useEffect, useState } from "react";
import axios from "axios";
import { URL_USERS } from "../const/URLS";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(URL_USERS).then((response) => {
            setUserList(response.data);
        });
    }, []);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleLogin() {
        const userCheck = userList.find(
            (item) =>
                item.username === user.username &&
                item.password === user.password
        );
        if (userCheck) {
            localStorage.setItem("currentUser", JSON.stringify(userCheck));
            alert("Đăng nhập thành công");
            navigate("/home");
        } else {
            alert("Sai tài khoản hoặc mật khẩu");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
            <div
                className="card glass-card p-4 rounded-4 shadow-lg"
                style={{ width: "400px" }}
            >
                <h2 className="text-center mb-4 fw-bold text-gradient">
                    Đăng nhập
                </h2>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Nhập username"
                        value={user.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Nhập password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="btn btn-primary w-100 mb-3 fw-semibold shadow-sm"
                    onClick={handleLogin}
                >
                    🚀 Đăng nhập
                </button>
                <button
                    className="btn btn-outline-primary w-100 fw-semibold"
                    onClick={() => navigate("/register")}
                >
                    ➕ Đăng ký tài khoản mới
                </button>
            </div>

            {/* Custom CSS */}
            <style>{`
                .bg-gradient {
                    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .text-gradient {
                    background: linear-gradient(90deg, #ff8a00, #e52e71);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
}

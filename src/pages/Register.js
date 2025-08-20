import { useState } from "react";
import { URL_USERS } from "../const/URLS";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    function handleChange(e) {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    function handleRegister() {
        if (!newUser.username.trim() || !newUser.password.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        if (newUser.password.length < 3) {
            alert("Mật khẩu phải ít nhất 3 ký tự!");
            return;
        }

        axios.post(URL_USERS, { ...newUser, role: "user" }).then(() => {
            alert("Đăng ký tài khoản thành công");
            navigate("/");
        });
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
            }}
        >
            <div
                className="card shadow-lg p-4"
                style={{
                    width: "400px",
                    borderRadius: "20px",
                    backdropFilter: "blur(12px)",
                    background: "rgba(255, 255, 255, 0.9)",
                }}
            >
                <h2 className="text-center mb-4 fw-bold text-primary">Đăng ký</h2>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        name="username"
                        placeholder="Nhập username"
                        value={newUser.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        placeholder="Nhập password"
                        value={newUser.password}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    style={{ borderRadius: "12px" }}
                    onClick={handleRegister}
                >
                    Đăng ký
                </button>
                <p className="mt-3 text-center">
                    Đã có tài khoản?{" "}
                    <a href="/" className="fw-semibold text-decoration-none text-primary">
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    );
}

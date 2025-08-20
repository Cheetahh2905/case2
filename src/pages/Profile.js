import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {editUser, getUserById} from "../service/UserService";

export default function Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [form, setForm] = useState({
        name: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            const user = JSON.parse(strUser);
            setCurrentUser(user);

            getUserById(user.id).then((data) => {
                setForm({
                    name: data.name || "",
                    password: data.password || "",
                    confirmPassword: data.password || ""
                });
            });
        }
    }, []);

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!currentUser) return;

        if (!form.name.trim()) {
            alert("Tên không được để trống!");
            return;
        }
        if (form.password.length < 3) {
            alert("Mật khẩu phải ít nhất 3 ký tự!");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        const updatedUser = {
            ...currentUser,
            name: form.name,
            password: form.password
        };

        await editUser(updatedUser, currentUser.id);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        alert("Cập nhật thông tin cá nhân thành công!");
        navigate("/home");
    }

    if (!currentUser) return <p className="text-danger mt-3">Bạn chưa đăng nhập</p>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-gradient text-white rounded-top-4"
                             style={{background: "linear-gradient(135deg, #4e73df, #1cc88a)"}}>
                            <h4 className="mb-0 text-center fw-bold">🔒 Thông tin cá nhân</h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Tên đăng nhập</label>
                                    <input
                                        className="form-control shadow-sm"
                                        value={currentUser.username}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Tên hiển thị</label>
                                    <input
                                        name="name"
                                        className="form-control shadow-sm"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Nhập tên hiển thị"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control shadow-sm"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu mới"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Xác nhận mật khẩu</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control shadow-sm"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="btn btn-success px-4 fw-semibold shadow-sm"
                                        style={{borderRadius: "20px"}}
                                    >
                                        💾 Lưu thay đổi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import {useState} from "react";
import {URL_USERS} from "../const/URLS";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    function handleChange(e) {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }
    function handleRegister() {
        axios.post(URL_USERS,{...newUser, role:'user'}).then((response) => {
            alert('Đăng ký tài khoản thành công')
            navigate("/");
        })
    }
    return (
        <div>
            <h2>Register Page</h2>
            <div>
                Username:
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleChange}
                />
                <br/>
                Password:
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleChange}
                />
                <br/>
                <button onClick={handleRegister}>Đăng ký</button>
            </div>
        </div>
    )
}
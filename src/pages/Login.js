import {useEffect, useState} from "react";
import axios from "axios";
import {URL_USERS} from "../const/URLS";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(URL_USERS).then((response) => {
            setUserList(response.data);
        })
    },[])
    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }
    function handleLogin() {
        const userCheck = userList.find(item => item.username === user.username && item.password === user.password);
        if (userCheck) {
            localStorage.setItem('currentUser', JSON.stringify(userCheck));
            alert('Đăng nhập thành công')
            navigate('/home')
        }else{
            alert('Sai tài khoản hoặc mật khẩu')
        }
    }
    return (
        <div>
            <h2>Login Page</h2>
            <div>
                Username:
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                />
                <br/>
                Password:
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={handleChange}
                />
                <br/>
                <button onClick={handleLogin}>Đăng nhập</button>
            </div>
        </div>
    )
}
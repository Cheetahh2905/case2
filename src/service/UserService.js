import axios from "axios";
import {URL_USERS} from "../const/URLS";

export async function getUsers() {
    const response = await axios.get(URL_USERS)
    return response.data
}

export async function editUser(user, id) {
    const response = await axios.put(`${URL_USERS}/${id}`)
    return response.data
}

export async function getUserById(id) {
    const response = await axios.get(`${URL_USERS}/${id}`);
    return response.data;
}
import axios from "axios";
import {URL_Produtcs} from "../const/URLS";

export async function getProducts() {
    const response = await axios.get(URL_Produtcs)
    return response.data
}

export async function deleteProduct(productId) {
    await axios.delete(`${URL_Produtcs}/${productId}`);
}
export async function addProduct(product) {
    return await axios.post(URL_Produtcs, product)
}
export async function editProduct(productId, editProduct) {
    const response = await axios.put(`${URL_Produtcs}/${productId}`, editProduct)
    return response.data
}
export async function getProductById(productId) {
    const response = await axios.get(`${URL_Produtcs}/${productId}`)
    return response.data
}
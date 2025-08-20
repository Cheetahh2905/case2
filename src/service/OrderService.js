import axios from "axios";
import { URL_Orders } from "../const/URLS";

// Lấy tất cả đơn hàng (admin)
export async function getOrders() {
    const res = await axios.get(URL_Orders);
    return res.data;
}

// Lấy đơn hàng theo userId (user)
export async function getOrdersByUser(userId) {
    const res = await axios.get(`${URL_Orders}?userId=${userId}`);
    return res.data;
}

// Tạo đơn hàng mới
export async function createOrder(newOrder) {
    const res = await axios.post(URL_Orders, newOrder);
    return res.data;
}

// Cập nhật đơn hàng
export async function updateOrder(orderId, updatedOrder) {
    const res = await axios.put(`${URL_Orders}/${orderId}`, updatedOrder);
    return res.data;
}

// Cập nhật trạng thái đơn hàng (admin)
export async function updateOrderStatus(orderId, newStatus) {
    const res = await axios.patch(`${URL_Orders}/${orderId}`, { status: newStatus });
    return res.data;
}

// Xóa đơn hàng
export async function deleteOrder(orderId) {
    await axios.delete(`${URL_Orders}/${orderId}`);
}


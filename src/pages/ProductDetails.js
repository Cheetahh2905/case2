import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../service/ProductService";
import { createOrder } from "../service/OrderService";
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        async function fetchData() {
            const data = await getProductById(id);
            setProduct(data);
        }
        fetchData();
    }, [id]);

    async function handleBuy() {
        const newOrder = {
            userId: currentUser.id,
            productId: product.id,
            productName: product.name,
            quantity: Number(quantity),
            totalPrice: product.price * Number(quantity),
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        await createOrder(newOrder);
        navigate("/home/orders");
    }

    if (!product)
        return (
            <Typography variant="h6" align="center" sx={{ mt: 5 }}>
                Loading...
            </Typography>
        );

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                        {product.name}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {product.description}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "error.main", mb: 2 }}
                    >
                        Giá: {product.price.toLocaleString()} VNĐ
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <TextField
                            label="Số lượng"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            inputProps={{ min: 1 }}
                            sx={{ width: "120px" }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        size="large"
                        onClick={handleBuy}
                    >
                        🛒 Mua ngay
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

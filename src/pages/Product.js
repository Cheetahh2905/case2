import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../service/ProductService";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
} from "@mui/material";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }
    }, []);

    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products);
        });
    }, []);

    function handleDelete(productId) {
        if (window.confirm("Bạn có chắc muốn xóa không?")) {
            deleteProduct(productId).then(() => {
                setProducts(products.filter((item) => item.id !== productId));
            });
        }
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight="bold"
                color="primary"
            >
                🛍 Danh sách sản phẩm
            </Typography>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 4,
                                height: "100%",
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: 8,
                                },
                            }}
                        >
                            {/* Ảnh sản phẩm */}
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{
                                    height: 180,
                                    objectFit: "cover",
                                    backgroundColor: "#f8f9fa",
                                }}
                            />

                            {/* Nội dung */}
                            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 1 }}
                                >
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" color="error" fontWeight="bold">
                                    {product.price}₫
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Kho: {product.stock}
                                </Typography>

                                {/* Nút */}
                                <Box mt="auto">
                                    {currentUser && currentUser.role === "admin" && (
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                fullWidth
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                ❌ Xóa
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="warning"
                                                size="small"
                                                fullWidth
                                                onClick={() =>
                                                    navigate(`/home/edit-product/${product.id}`)
                                                }
                                            >
                                                ✏️ Sửa
                                            </Button>
                                        </Box>
                                    )}

                                    {currentUser && currentUser.role === "user" && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{ mt: 1, borderRadius: 3, fontWeight: "bold" }}
                                            onClick={() => navigate(`/home/products/${product.id}`)}
                                        >
                                            🔍 Xem chi tiết
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

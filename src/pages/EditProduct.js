import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editProduct, getProductById } from "../service/ProductService";

// MUI Components
import {
    Container,
    TextField,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        }
        fetchProduct();
    }, [id]);

    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    async function handleEdit(e) {
        e.preventDefault();
        await editProduct(id, product);
        navigate("/home");
    }

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Card elevation={6} sx={{ borderRadius: 3 }}>
                <CardHeader
                    title="✏️ Chỉnh sửa sản phẩm"
                    sx={{
                        textAlign: "center",
                        background: "linear-gradient(90deg, #FFD54F, #FFB300)",
                        color: "#000",
                        fontWeight: "bold",
                    }}
                />
                <CardContent>
                    <Box component="form" onSubmit={handleEdit} noValidate>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Tên sản phẩm"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Mô tả"
                            name="description"
                            multiline
                            rows={4}
                            value={product.description}
                            onChange={handleChange}
                        />

                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    fullWidth
                                    label="Giá (₫)"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    fullWidth
                                    label="Số lượng tồn"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Box
                            sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
                        >
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigate(-1)}
                            >
                                Quay lại
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                            >
                                Lưu thay đổi
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

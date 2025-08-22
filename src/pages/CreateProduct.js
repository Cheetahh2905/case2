import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../service/ProductService";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
    Grid,
    Typography,
} from "@mui/material";

export default function CreateProduct() {
    const [currentUser, setCurrentUser] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const strUser = localStorage.getItem("currentUser");
        if (strUser) {
            setCurrentUser(JSON.parse(strUser));
        }
    }, []);

    function handleChange(e) {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }

    function handleAdd() {
        const newProducts = {
            ...newProduct,
            price: Number(newProduct.price),
            stock: Number(newProduct.stock),
            createdBy: currentUser.id,
            createdDate: new Date().toISOString(),
        };
        addProduct(newProducts).then(() => {
            navigate("/home");
        });
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Card sx={{ width: 500, borderRadius: 3, boxShadow: 4 }}>
                <CardHeader
                    title={
                        <Typography variant="h6" fontWeight="bold" textAlign="center">
                            ➕ Thêm sản phẩm mới
                        </Typography>
                    }
                    sx={{ bgcolor: "primary.main", color: "white", textAlign: "center" }}
                />
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            label="Tên sản phẩm"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Mô tả"
                            name="description"
                            value={newProduct.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Giá (₫)"
                                    name="price"
                                    type="number"
                                    value={newProduct.price}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Số lượng tồn"
                                    name="stock"
                                    type="number"
                                    value={newProduct.stock}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAdd}
                            sx={{
                                fontWeight: "bold",
                                py: 1.2,
                                borderRadius: 2,
                                boxShadow: 2,
                                "&:hover": { boxShadow: 4 },
                            }}
                        >
                            ✅ Lưu sản phẩm
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

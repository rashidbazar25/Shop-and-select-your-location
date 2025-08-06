import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  CardActions,
  CircularProgress,
} from "@mui/material";

const Producta = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [localLoading, setLocalLoading] = useState(true); // حالة لانتظار 4 ثواني

  useEffect(() => {
    dispatch(fetchProducts());

    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // تنظيف المؤقت
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading || localLoading) {
    return (
      <Box mt={30} display="flex" justifyContent="center">
        <CircularProgress size={60} color="secondary" />
      </Box>
    );
  }

  return (
    <Box p={4} mt={10}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Explore Our Products
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                width: "250px",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: 4,
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  height: 180,
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />

              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5, flexGrow: 1 }}
                >
                  {product.description}
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  ${product.price}
                </Typography>

                <Box mt={1}>
                  <Chip
                    label={product.category}
                    color="primary"
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    label={product.isAvailable ? "Available" : "Out of stock"}
                    color={product.isAvailable ? "success" : "default"}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>
              </Box>

              <CardActions sx={{ justifyContent: "center", p: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  disabled={!product.isAvailable}
                  onClick={() => handleAddToCart(product)}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    py: 1,
                  }}
                >
                  Buying
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Producta;

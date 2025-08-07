import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { addToCart } from "../store/cartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme(); // لاستخدام ألوان الثيم

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // دالة لتظليل الجزء المطابق من الاسم
  const highlightMatch = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={i}
          style={{
            color: theme.palette.secondary.main,
            fontWeight: "bold",
          }}
        >
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  // فلترة المنتجات حسب التصنيف والبحث
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Box mt={10} p={3}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Welcome to Store
      </Typography>

      {/* قائمة التصنيفات + البحث */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Select Category</InputLabel>
            <Select
            sx={{width:"200px"}}
              labelId="category-select-label"
              value={selectedCategory}
              label="Select Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* المنتجات حسب الفلترة */}
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
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
                height="180"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  {highlightMatch(product.name, searchQuery)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {product.description}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  ${product.price}
                </Typography>
                <Box mt={1}>
                  <Chip
                    label={product.isAvailable ? "Available" : "Out of stock"}
                    color={product.isAvailable ? "success" : "default"}
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  disabled={!product.isAvailable}
                  onClick={() => handleAddToCart(product)}
                >
                  Buy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;

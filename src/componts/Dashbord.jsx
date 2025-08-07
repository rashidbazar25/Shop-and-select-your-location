// src/componts/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, removeProduct } from "../store/productsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    isAvailable: false,
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    const { name, price, image, category, description } = form;
    if (!name || !price || !image || !category || !description) return;

    dispatch(addProduct(form));
    setForm({
      name: "",
      price: "",
      image: "",
      category: "",
      description: "",
      isAvailable: false,
    });
  };

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <Box p={4} mt={10}>
      <Typography variant="h4" gutterBottom>
        Product Dashboard
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2} mb={3}mt={3}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
        <TextField label="Image URL" name="image" value={form.image} onChange={handleChange} />
        <TextField label="Category" name="category" value={form.category} onChange={handleChange} />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
        <FormControlLabel
          control={<Checkbox checked={form.isAvailable} onChange={handleChange} name="isAvailable" />}
          label="Available"
        />
        <Button variant="contained" onClick={handleAdd}>
          Add Product
        </Button>
      </Box>

      {loading ? (
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px", 
  }}
>
  <CircularProgress size={60} color="secondary" />
</div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  {product.image && <img src={product.image} alt={product.name} width="50" height="50" />}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.isAvailable ? "✅" : "❌"}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default Dashboard;

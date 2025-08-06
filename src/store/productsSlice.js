// store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc
} from "firebase/firestore";
import { db } from "../firebase";

// جلب المنتجات
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});

// حذف منتج
export const removeProduct = createAsyncThunk("products/removeProduct", async (id) => {
  await deleteDoc(doc(db, "products", id));
  return id;
});

// إضافة منتج
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ name, price, image, category, description, isAvailable }) => {
    const docRef = await addDoc(collection(db, "products"), {
      name: name.trim(),
      price: Number(price),
      image: image.trim(),
      category: category.trim(),
      description: description.trim(),
      isAvailable: Boolean(isAvailable),
    });

    return {
      id: docRef.id,
      name,
      price,
      image,
      category,
      description,
      isAvailable,
    };
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const productsReducer = productsSlice.reducer;

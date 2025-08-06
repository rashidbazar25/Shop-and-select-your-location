import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Button,
  Link,
} from "@mui/material";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("هل أنت متأكد من الطلب تم اعطائة الموصل ؟");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "orders", orderId));
      alert("لحضات ليصلك طلبك  ✅");
    } catch (error) {
      console.error("خطأ أثناء حذف الطلب:", error);
      alert("❌ فشل في حذف الطلب");
    }
  };

  return (
    <Box p={{ xs: 2, md: 4 }} mt={10}>
      <Typography variant="h4" gutterBottom textAlign="center">
        الطلبات الواردة 
      </Typography>

      {orders.length === 0 ? (
        <Typography mt={5} align="center" color="text.secondary">
          لا توجد طلبات حالياً.
        </Typography>
      ) : (
        orders.map((order) => (
          <Paper
            key={order.id}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" gutterBottom>
              رقم الطلب: {order.id}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {(order.items || []).map((item) => (
              <Box
                key={item.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
                flexWrap="wrap"
              >
                <Typography sx={{ minWidth: 100 }}>
                  {item.name || "منتج بدون اسم"}
                </Typography>
                <Typography>
                  الكمية: {item.quantity || 0} × ${item.price || 0}
                </Typography>
                <Typography sx={{ fontWeight: "bold", color: "green" }}>
                  الإجمالي: ${(item.price * item.quantity).toFixed(2)}$
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
            >
              <Chip
                label={`الإجمالي الكلي: $${order.total?.toFixed?.(2) || "0.00"}`}
                color="success"
                variant="outlined"
                sx={{ fontWeight: "bold" }}
              />

              <Chip
                label={`الوقت: ${
                  order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "غير معروف"
                }`}
                variant="outlined"
              />

              {order.location?.latitude && order.location?.longitude ? (
                <Link
                  href={`https://www.google.com/maps?q=${order.location.latitude},${order.location.longitude}`}
                  target="_blank"
                  underline="none"
                >
                  <Chip label="عرض الموقع على الخريطة" color="primary" clickable />
                </Link>
              ) : (
                <Chip label="الموقع غير متوفر" color="default" />
              )}

              <Button
                color="error"
                variant="outlined"
                onClick={() => handleDelete(order.id)}
              >
                تم اعطاء الطلب للموصل 
              </Button>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default OrdersPage;

import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Divider,
  ButtonGroup,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/cartSlice";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";





const CartCard = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmitOrder = async () => {
    if (!navigator.geolocation) {
      alert("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const order = {
          items: cartItems,
          location,
          total,
          createdAt: new Date().toISOString(),
        };

        try {
          await addDoc(collection(db, "orders"), order);
          dispatch(clearCart()); //  تفريغ السلة بعد الإرسال
          alert(" تم إرسال الطلب بنجاح!");
        } catch (error) {
          console.error("فشل في إرسال الطلب:", error);
          alert(" حدث خطأ أثناء إرسال الطلب");
        }
      },
      (error) => {
        alert("تعذر الحصول على الموقع: " + error.message);
      }
    );
  };


  

  return (
    <Box p={{ xs: 2, md: 4 }} mt={10}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          mt={5}
        >
          🛒 السلة فارغة الآن. اذهب إلى المنتجات لتبدأ بالتسوق!
        </Typography>
      ) : (
        <>
          <TableContainer
            component={Paper}
            elevation={6}
            sx={{ borderRadius: 3 }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Avatar
                        variant="rounded"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup size="small" variant="outlined">
                        <Button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          -
                        </Button>
                        <Button disabled>{item.quantity}</Button>
                        <Button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell align="center">${item.price}</TableCell>
                    <TableCell align="center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => dispatch(removeFromCart(item.id))}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", color: "#2c3e50" }}
          >
            Total of All: ${total.toFixed(2)}
          </Typography>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitOrder}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              إرسال الطلب 
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartCard;

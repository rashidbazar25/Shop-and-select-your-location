import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const cart = useSelector((S) => S.cart.items);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("فشل تسجيل الخروج", err);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f6f2",
        color: "#000",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* الروابط اليمنى */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            MyApp
          </Typography>

          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/products">
            Products
          </Button>
          <Button color="inherit" component={RouterLink} to="/orderPage">
            OrderPage
          </Button>
          <Button color="inherit" component={RouterLink} to="/dashbord">
            Dashbord
          </Button>
        </Box>

        {/* الروابط اليسرى */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/cart">
            Cart ({cart.length})
          </Button>

          {!user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

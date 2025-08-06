import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const cart = useSelector((state) => state.cart.items);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <AppBar 
      color="#f9f6f2" 
      sx={{
        width: "100%",
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: "#f9f6f2"
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          MyApp
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/products">Products</Button>
          <Button color="inherit" component={RouterLink} to="/orderPage">OrderPage</Button>
          <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={RouterLink} to="/cart">
            Cart <span style={{ color: "#28364a", marginLeft: 4 }}>({cart.length})</span>
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                {user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/register">Register</Button>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

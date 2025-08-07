import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const cart = useSelector((state) => state.cart.items);
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setIsAuthChecked(true);
    });
    return () => unSubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navLinks = (
    <>
      <Button color="inherit" component={RouterLink} to="/">Home</Button>
      <Button color="inherit" component={RouterLink} to="/products">Products</Button>
      <Button color="inherit" component={RouterLink} to="/orderPage">OrderPage</Button>
      <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
      <Button color="inherit" component={RouterLink} to="/cart">
        Cart <span style={{ color: "#28364a", marginLeft: 4 }}>({cart.length})</span>
      </Button>
    </>
  );

  const authLinks = !isAuthChecked ? null : user ? (
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
);

  return (
    <>
      <AppBar 
        color="#f9f6f2" 
        sx={{
          width: "100%",
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: "#f9f6f2",
        }}
        position="static"
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            MyApp
          </Typography>

          {isMobile ? (
            <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navLinks}
              {authLinks}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            <ListItem button component={RouterLink} to="/" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={RouterLink} to="/products" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={RouterLink} to="/orderPage" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="OrderPage" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={RouterLink} to="/cart" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={`Cart (${cart.length})`} />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            {isAuthChecked && (
              user ? (
                <>
                  <ListItem>
                    <ListItemText primary={user.email} />
                  </ListItem>
                  <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem button component={RouterLink} to="/register" onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary="Register" />
                  </ListItem>
                  <ListItem button component={RouterLink} to="/login" onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary="Login" />
                  </ListItem>
                </>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;

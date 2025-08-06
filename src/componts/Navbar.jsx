
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {

 const cart = useSelector((S)=>S.cart.items);
 console.log(cart);
 
 
  return (
    <AppBar  color="#f9f6f2" 
     sx={{
    width:"100%",
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor:"#f9f6f2"
  }} >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          MyApp
        </Typography>
        <Box>
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

            <Button color="inherit" component={RouterLink} to="/cart">
           <span>cart<span style={{color:"#28364a" , marginBottom:"3px"}}> {cart.length}</span></span>
          </Button>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
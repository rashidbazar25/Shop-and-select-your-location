
import { Container } from '@mui/material'
import './App.css'
import Dashbord from './componts/Dashbord'
import Navbar from './componts/Navbar'
import Products from './componts/Producta'
import { Route ,Routes } from 'react-router-dom'
import Home from './componts/Home'
import Cart from './componts/Cart'
import OrdersPage from './componts/OrdersPage'

function App() {

  return (
    <>
     <Container maxWidth="lg">
      <Navbar/>
    <Routes>
      
      <Route path='/' element = {<Home/>} />
      <Route path='/products' element = {<Products/>} />
      <Route path='/dashbord' element = {<Dashbord/>} />
      <Route path='/cart' element = {<Cart/>} />
      <Route path='/orderPage' element = {<OrdersPage/>} />
      

    </Routes>
    </Container>
    </>
  )
}

export default App

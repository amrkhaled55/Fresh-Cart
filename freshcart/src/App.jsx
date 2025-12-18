import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Compenents/LayOut/LayOut'
import Register from './Compenents/Register/Register'
import Login from './Compenents/Login/Login';
import Products from './Compenents/Products/Products';
import Brands from './Compenents/Brands/Brands';
import Categories from './Compenents/Categories/Categories';
import { Toaster } from 'react-hot-toast';
import Home from './Compenents/Home/Home';
import NotFound from './Compenents/NotFound/NotFound';
import { TokenContext } from './Compenents/AthunicatContext/AthunticatContext';
import ProtectedRoute from './Compenents/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './Compenents/ProductDetails/ProductDetails';
import CategoryDetails from './Compenents/CategoryDetails/CategoryDetails';
import { CartContext } from './Compenents/CartContext/CartContext';
import Cart from './Compenents/Cart/Cart';
import Details from './Compenents/Details/Details';
import AllOrders from './Compenents/AllOrders/AllOrders';
import WishListContext from './Compenents/WishListContext/WishListContext';
import WishList from './Compenents/WishList/WishList';
import ForgetPassword from './Compenents/ForgetPassword/ForgetPassword';
import VertifyCode from './Compenents/VertifyCode/VertifyCode';
import ResetPassword from './Compenents/ResetPassword/ResetPassword';
import BrandsDetails from './Compenents/Brands/BrandsDetails';
const router= createBrowserRouter([
  {path:"" ,element:<WishListContext>
    <LayOut/>
  </WishListContext>,children:[
 {   path:"",element:<Login/>},
  {  path:"login",element:<Login/>},
  {  path:"home",element:<ProtectedRoute><Home/></ProtectedRoute>},
   { path:"register",element:<Register/>},
   { path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
 {   path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
 {   path:"brandsdetails/:id",element:<ProtectedRoute><BrandsDetails/></ProtectedRoute>},
  {  path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {  path:"productDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {  path:"categoryDetails/:id",element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
  {  path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {  path:"details",element:<ProtectedRoute><Details/></ProtectedRoute>},
  {  path:"allorders",element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
  {  path:"wishlist",element:<ProtectedRoute><WishList/></ProtectedRoute>},
  {  path:"forgetpassword",element:<ForgetPassword/>},
  {  path:"verify",element:<VertifyCode/>},
  {  path:"resetpassword",element:<ResetPassword/>},
  {  path:"*",element:<NotFound/>},
]}
 ])
   let clientQuary=new QueryClient();
function App() {
  return <>
  <CartContext>
  <QueryClientProvider client={clientQuary}>
  <Toaster position='top center'/>
  <TokenContext>
 <RouterProvider router={router}/>
  </TokenContext>
  </QueryClientProvider>
  </CartContext>

  </>
}

export default App

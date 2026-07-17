import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
}
from "react-router-dom";


import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";


import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/Profile/Profile";



import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AddProduct from "./pages/AddProduct/AddProduct";
import ManageProducts from "./pages/ManageProducts/ManageProducts";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageOrders from "./pages/ManageOrders/ManageOrders";

import EditProduct from "./pages/EditProduct/EditProduct";


import "./App.css";





function Layout(){


const location = useLocation();



const adminRoutes=[


"/admin-dashboard",
"/add-product",
"/manage-products",
"/manage-users",
"/manage-orders"


];




const isAdminPage =

adminRoutes.includes(location.pathname)
||
location.pathname.startsWith("/admin/edit-product");






const hideNavbar=[

"/",
"/login",
"/register",
"/forgot-password"

].includes(location.pathname);





return(


<>


{

!hideNavbar && !isAdminPage &&

<Navbar/>

}






<Routes>


<Route
path="/"
element={<Navigate to="/login"/>}
/>



<Route
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>


<Route
path="/forgot-password"
element={<ForgotPassword/>}
/>






<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
    path="/reset-password/:token"
    element={<ResetPassword />}
/>





<Route
path="/products"
element={
<ProtectedRoute>
<Products/>
</ProtectedRoute>
}
/>





<Route
path="/product/:id"
element={
<ProtectedRoute>
<ProductDetails/>
</ProtectedRoute>
}
/>





<Route
path="/cart"
element={
<ProtectedRoute>
<Cart/>
</ProtectedRoute>
}
/>





<Route
path="/wishlist"
element={
<ProtectedRoute>
<Wishlist/>
</ProtectedRoute>
}
/>





<Route
path="/checkout"
element={
<ProtectedRoute>
<Checkout/>
</ProtectedRoute>
}
/>





<Route
path="/orders"
element={
<ProtectedRoute>
<Orders/>
</ProtectedRoute>
}
/>





<Route
path="/profile"
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>








<Route
path="/admin-dashboard"
element={
<ProtectedRoute adminOnly>
<AdminDashboard/>
</ProtectedRoute>
}
/>





<Route
path="/add-product"
element={
<ProtectedRoute adminOnly>
<AddProduct/>
</ProtectedRoute>
}
/>





<Route
path="/manage-products"
element={
<ProtectedRoute adminOnly>
<ManageProducts/>
</ProtectedRoute>
}
/>





<Route
path="/admin/edit-product/:id"
element={
<ProtectedRoute adminOnly>
<EditProduct/>
</ProtectedRoute>
}
/>





<Route
path="/manage-users"
element={
<ProtectedRoute adminOnly>
<ManageUsers/>
</ProtectedRoute>
}
/>





<Route
path="/manage-orders"
element={
<ProtectedRoute adminOnly>
<ManageOrders/>
</ProtectedRoute>
}
/>






<Route
path="*"
element={<Navigate to="/dashboard"/>}
/>



</Routes>






{

!hideNavbar && !isAdminPage &&

<Footer/>

}



</>


);


}






function App(){


return(

<BrowserRouter>

<Layout/>

</BrowserRouter>

);


}



export default App;
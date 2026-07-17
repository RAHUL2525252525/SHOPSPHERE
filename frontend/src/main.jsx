import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";


import UserProvider from "./context/UserContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import WishlistProvider from "./context/WishlistContext.jsx";



ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>


        <UserProvider>


            <CartProvider>


                <WishlistProvider>


                    <App />


                </WishlistProvider>


            </CartProvider>


        </UserProvider>


    </React.StrictMode>

);
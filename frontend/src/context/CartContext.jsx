import { createContext, useEffect, useState } from "react";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../services/cartService";


export const CartContext = createContext();



function CartProvider({ children }) {


    const [cartItems, setCartItems] = useState([]);



    useEffect(() => {

        loadCart();

    }, []);




    const loadCart = async () => {

        try {

            const data = await getCart();

            setCartItems(data || []);


        } catch(error) {

            console.log(error);

        }

    };





    const addItem = async (productId, quantity = 1) => {

        try {

            const data = await addToCart(
                productId,
                quantity
            );


            setCartItems(data);


        } catch(error) {

            console.log(error);

        }

    };






    const updateItem = async (cartId, quantity) => {

        try {

            const data = await updateCartItem(
                cartId,
                quantity
            );


            setCartItems(data);


        } catch(error) {

            console.log(error);

        }

    };






    const removeItem = async (cartId) => {

        try {

            const data = await removeCartItem(
                cartId
            );


            setCartItems(data);


        } catch(error) {

            console.log(error);

        }

    };






    const emptyCart = async () => {

        try {

            const data = await clearCart();

            setCartItems(data);


        } catch(error) {

            console.log(error);

        }

    };





    const cartCount = cartItems.reduce(

        (total, item) =>
            total + (item.quantity || 0),

        0

    );





    const cartTotal = cartItems.reduce(

        (total, item) =>

            total +
            (
                item.total ??
                (item.price || 0) * (item.quantity || 0)
            ),

        0

    );





    return (


        <CartContext.Provider

            value={{

                cartItems,
                setCartItems,
                addItem,
                updateItem,
                removeItem,
                emptyCart,
                loadCart,
                cartCount,
                cartTotal

            }}

        >

            {children}

        </CartContext.Provider>


    );


}



export default CartProvider;
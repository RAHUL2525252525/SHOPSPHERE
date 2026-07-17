import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

import "./Cart.css";


const FALLBACK_IMAGE =
    "https://via.placeholder.com/150?text=No+Image";



function Cart(){


    const navigate = useNavigate();


    const {

        cartItems,

        removeItem,

        updateItem,

        emptyCart,

        cartTotal

    } = useContext(CartContext);





    const decreaseQty = (item)=>{


        if(item.quantity <= 1){

            return;

        }


        updateItem(item.cartId, item.quantity - 1);


    };




    const increaseQty = (item)=>{


        updateItem(item.cartId, item.quantity + 1);


    };






    return(


        <div className="cart-page">




            <div className="cart-container">



                <h1>

                    My Cart 🛒

                </h1>





                {


                    cartItems.length === 0 ?



                    <div className="empty-cart">


                        <h2>

                            Your Cart is Empty

                        </h2>


                        <button

                            onClick={()=>navigate("/products")}

                        >

                            Continue Shopping

                        </button>



                    </div>



                    :



                    <>



                    <div className="cart-list">



                    {

                        cartItems.map((item)=>(


                            <div

                                className="cart-card"

                                key={item.cartId}

                            >



                                <img

                                    src={

                                        item.image ||

                                        FALLBACK_IMAGE

                                    }

                                    alt={item.productName}

                                    onError={(e)=>{

                                        e.target.onerror=null;

                                        e.target.src=FALLBACK_IMAGE;

                                    }}

                                />





                                <div className="cart-info">


                                    <h3>

                                        {item.productName}

                                    </h3>



                                    <p className="cart-brand">

                                        {item.brand}

                                    </p>



                                    <p className="cart-price">

                                        ₹{item.price}

                                    </p>




                                    <div className="qty-control">


                                        <button

                                            onClick={()=>decreaseQty(item)}

                                        >

                                            −

                                        </button>



                                        <span>

                                            {item.quantity}

                                        </span>



                                        <button

                                            onClick={()=>increaseQty(item)}

                                        >

                                            +

                                        </button>


                                    </div>




                                    <p className="cart-item-total">

                                        Subtotal : ₹{item.total}

                                    </p>




                                    <button

                                        className="remove-btn"

                                        onClick={()=>removeItem(item.cartId)}

                                    >

                                        Remove

                                    </button>



                                </div>



                            </div>


                        ))

                    }



                    </div>







                    <div className="cart-summary">


                        <h2>

                            Cart Summary

                        </h2>



                        <h3>

                            Total : ₹{cartTotal}

                        </h3>





                        <button

                            className="checkout-btn"

                            onClick={()=>navigate("/checkout")}

                        >

                            Proceed Checkout

                        </button>




                        <button

                            className="clear-btn"

                            onClick={emptyCart}

                        >

                            Clear Cart

                        </button>



                    </div>




                    </>


                }



            </div>




        </div>


    );


}



export default Cart;
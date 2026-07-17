import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";

import "./Wishlist.css";


const FALLBACK_IMAGE =
    "https://via.placeholder.com/200?text=No+Image";



function Wishlist(){


    const navigate = useNavigate();


    const {

        wishlistItems,

        removeWishlistItem

    } = useContext(WishlistContext);


    const { addItem } = useContext(CartContext);







    return(


        <div className="wishlist-page">




            <div className="wishlist-container">



                <h1>

                    My Wishlist ❤️

                </h1>





                {


                    wishlistItems.length === 0 ?



                    <div className="empty-wishlist">


                        <h2>

                            No Wishlist Items

                        </h2>


                        <p>

                            Add your favourite products here

                        </p>


                        <button

                            onClick={()=>navigate("/products")}

                        >

                            Browse Products

                        </button>



                    </div>



                    :



                    <div className="wishlist-grid">



                        {

                            wishlistItems.map((item)=>(


                                <div

                                    className="wishlist-card"

                                    key={item.wishlistId}

                                >



                                    {

                                        item.discount > 0 &&


                                        <span className="wishlist-discount">

                                            {item.discount}% OFF

                                        </span>

                                    }




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




                                    <h3>

                                        {item.productName}

                                    </h3>



                                    <p className="wishlist-brand">

                                        {item.brand}

                                    </p>




                                    <div className="wishlist-price-row">


                                        <span>

                                            ₹{item.sellingPrice}

                                        </span>



                                        {

                                            item.brandPrice &&
                                            item.brandPrice > item.sellingPrice &&


                                            <del>

                                                ₹{item.brandPrice}

                                            </del>

                                        }


                                    </div>




                                    <div className="wishlist-actions">


                                        <button

                                            className="move-cart-btn"

                                            onClick={()=>addItem(item.productId,1)}

                                        >

                                            Add To Cart

                                        </button>



                                        <button

                                            className="remove-btn"

                                            onClick={()=>removeWishlistItem(item.productId)}

                                        >

                                            Remove

                                        </button>


                                    </div>




                                </div>


                            ))

                        }



                    </div>



                }



            </div>




        </div>


    );


}



export default Wishlist;
import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import {
    getProductById
} from "../../services/productService";


import "./ProductDetails.css";


const FALLBACK_IMAGE =
    "https://via.placeholder.com/500x500?text=No+Image";



function ProductDetails(){


    const {id} = useParams();


    const [product,setProduct] = useState(null);


    const [loading,setLoading] = useState(true);


    const [activeImage,setActiveImage] = useState(null);


    const [added,setAdded] = useState(false);



    const {addItem} = useContext(CartContext);


    const {
        addWishlistItem,
        removeWishlistItem,
        isInWishlist
    } = useContext(WishlistContext);





    useEffect(()=>{


        loadProduct();


    },[id]);






    const loadProduct = async()=>{


        setLoading(true);


        try{


            const data = await getProductById(id);


            setProduct(data);


            setActiveImage(

                data?.image1 ||
                data?.image2 ||
                data?.image3 ||
                FALLBACK_IMAGE

            );


        }


        catch(error){


            console.log(error);


        }


        finally{


            setLoading(false);


        }


    };







    if(loading){


        return(

            <h2 className="loading">

                Loading Product...

            </h2>

        );


    }





    if(!product){


        return(

            <h2 className="loading">

                Product Not Found

            </h2>

        );


    }



    const thumbnails = [

        product.image1,
        product.image2,
        product.image3

    ].filter(Boolean);


    const displayPrice =

        product.sellingPrice ??
        product.finalPrice ??
        product.brandPrice ??
        0;


    const wishlist = isInWishlist(product.id);


    const ratingValue = Math.round(product.rating || 0);



    const handleAddToCart = async()=>{


        await addItem(product.id,1);


        setAdded(true);


        setTimeout(()=>setAdded(false),1500);


    };




    const handleWishlist = ()=>{


        if(wishlist){

            removeWishlistItem(product.id);

        }

        else{

            addWishlistItem(product.id);

        }


    };





    return(


        <div className="product-details-page">




            <div className="details-container">



                <div className="details-image">


                    <div className="main-image-box">


                        <img

                            src={activeImage}

                            alt={product.name}

                            onError={(e)=>{

                                e.target.onerror = null;

                                e.target.src = FALLBACK_IMAGE;

                            }}

                        />


                    </div>



                    {

                        thumbnails.length > 1 &&


                        <div className="thumbnail-row">


                            {

                                thumbnails.map((img,index)=>(


                                    <img

                                        key={index}

                                        src={img}

                                        alt={`${product.name}-${index}`}

                                        className={

                                            img === activeImage

                                            ?

                                            "thumb active"

                                            :

                                            "thumb"

                                        }

                                        onClick={()=>setActiveImage(img)}

                                        onError={(e)=>{

                                            e.target.onerror = null;

                                            e.target.src = FALLBACK_IMAGE;

                                        }}

                                    />


                                ))

                            }


                        </div>


                    }


                </div>






                <div className="details-info">


                    <h1>

                        {product.name}

                    </h1>



                    <p className="details-category">

                        {product.category}

                    </p>




                    <div className="details-rating">


                        <span className="stars">

                            {"★".repeat(ratingValue)}

                            {"☆".repeat(5 - ratingValue)}

                        </span>


                        <span className="rating-number">

                            {

                                product.rating

                                ?

                                `${product.rating} / 5`

                                :

                                "No ratings yet"

                            }

                        </span>


                    </div>




                    <div className="details-price">


                        <span>

                            ₹{displayPrice}

                        </span>


                        {

                            product.brandPrice &&
                            product.brandPrice > displayPrice &&


                            <del>

                                ₹{product.brandPrice}

                            </del>

                        }


                    </div>






                    <p className="description">


                        {product.description ||

                        "Premium quality product with amazing features."}


                    </p>






                    <div className="details-buttons">


                        <button

                            onClick={handleAddToCart}

                        >

                            {

                                added

                                ?

                                "Added ✓"

                                :

                                "Add To Cart"

                            }

                        </button>




                        <button

                            onClick={handleWishlist}

                            className={

                                wishlist

                                ?

                                "wishlist active"

                                :

                                "wishlist"

                            }

                        >

                            {

                                wishlist

                                ?

                                "❤️ In Wishlist"

                                :

                                "🤍 Add Wishlist"

                            }

                        </button>



                    </div>




                </div>



            </div>




        </div>


    );


}



export default ProductDetails;
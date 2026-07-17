import { createContext, useEffect, useState } from "react";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} from "../services/wishlistService";


export const WishlistContext = createContext();



function WishlistProvider({ children }) {


    const [wishlistItems, setWishlistItems] = useState([]);



    useEffect(() => {

        loadWishlist();

    }, []);





    const loadWishlist = async () => {

        try {

            const data = await getWishlist();

            setWishlistItems(data || []);


        } catch(error) {

            console.log(error);

        }

    };






    const addWishlistItem = async (productId) => {

        try {


            const data = await addToWishlist(
                productId
            );


            setWishlistItems(data);


        } catch(error) {

            console.log(error);

        }

    };






    const removeWishlistItem = async (productId) => {

        try {


            const existing = wishlistItems.find(

                item =>

                item.productId === productId

            );


            if(!existing){

                return;

            }


            const data = await removeFromWishlist(
                existing.wishlistId
            );


            setWishlistItems(data);


        } catch(error) {

            console.log(error);

        }

    };






    const isInWishlist = (productId) => {


        return wishlistItems.some(

            item =>

            item.productId === productId

        );


    };







    return (


        <WishlistContext.Provider


            value={{

                wishlistItems,
                setWishlistItems,
                loadWishlist,
                addWishlistItem,
                removeWishlistItem,
                isInWishlist

            }}


        >

            {children}


        </WishlistContext.Provider>


    );


}



export default WishlistProvider;
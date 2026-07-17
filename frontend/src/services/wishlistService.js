import API from "./api";


const getEmail = () => localStorage.getItem("userEmail");



export const getWishlist = async () => {

    const email = getEmail();

    if(!email){

        return [];

    }

    try {

        const response = await API.get(`/wishlist/${email}`);

        return response.data;


    } catch(error) {

        throw error;

    }

};





export const addToWishlist = async (productId) => {

    const email = getEmail();

    if(!email){

        throw new Error("User not logged in");

    }

    try {

        await API.post(

            "/wishlist/add",

            {
                userEmail: email,
                productId
            }

        );


        return await getWishlist();


    } catch(error) {

        throw error;

    }

};





export const removeFromWishlist = async (wishlistId) => {

    try {

        await API.delete(

            `/wishlist/remove/${wishlistId}`

        );


        return await getWishlist();


    } catch(error) {

        throw error;

    }

};
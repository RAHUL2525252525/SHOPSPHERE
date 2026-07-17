import API from "./api";


const getEmail = () => localStorage.getItem("userEmail");



export const getCart = async () => {

    const email = getEmail();

    if(!email){

        return [];

    }

    try {

        const response = await API.get(`/cart/${email}`);

        return response.data;


    } catch(error) {

        throw error;

    }

};





export const addToCart = async (productId, quantity=1) => {

    const email = getEmail();

    if(!email){

        throw new Error("User not logged in");

    }

    try {

        await API.post(

            "/cart/add",

            {
                userEmail: email,
                productId,
                quantity
            }

        );


        return await getCart();


    } catch(error) {

        throw error;

    }

};





export const updateCartItem = async (cartItemId, quantity) => {

    try {

        await API.put(

            `/cart/update/${cartItemId}`,

            null,

            {
                params: { quantity }
            }

        );


        return await getCart();


    } catch(error) {

        throw error;

    }

};





export const removeCartItem = async (cartItemId) => {

    try {

        await API.delete(

            `/cart/remove/${cartItemId}`

        );


        return await getCart();


    } catch(error) {

        throw error;

    }

};





export const clearCart = async () => {

    const email = getEmail();

    if(!email){

        return [];

    }

    try {

        await API.delete(

            `/cart/clear/${email}`

        );


        return [];


    } catch(error) {

        throw error;

    }

};
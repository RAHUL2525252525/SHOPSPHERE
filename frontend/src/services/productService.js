import API from "./api";



export const getAllProducts = async () => {

    try {

        const response = await API.get("/products");

        return response.data;


    } catch(error) {

        throw error;

    }

};



export const getProductsByCategory = async (category) => {

    try {

        const response = await API.get(
            `/products/category/${category}`
        );

        return response.data;


    } catch(error) {

        throw error;

    }

};






export const getProductById = async (id) => {

    try {

        const response = await API.get(
            `/products/${id}`
        );

        return response.data;


    } catch(error) {

        throw error;

    }

};






export const addProduct = async (productData) => {

    try {

        const response = await API.post(
            "/products/add",
            productData
        );

        return response.data;


    } catch(error) {

        throw error;

    }

};







export const updateProduct = async (id, productData) => {

    try {


        const response = await API.put(

            `/products/update/${id}`,

            productData

        );


        return response.data;



    } catch(error) {


        throw error;


    }

};







export const deleteProduct = async (id) => {

    try {


        const response = await API.delete(

            `/products/delete/${id}`

        );


        return response.data;



    } catch(error) {


        throw error;


    }

};
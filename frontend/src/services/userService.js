import API from "./api";





export const getUserProfile = async () => {

    try {

        const email = localStorage.getItem("userEmail");

        const response = await API.get(
            `/users/profile/${email}`
        );

        return response.data;


    } catch(error) {

        throw error;

    }

};







export const updateUserProfile = async (userData) => {

    try {

        const email = localStorage.getItem("userEmail");

        const response = await API.put(

            `/users/profile/${email}`,

            userData

        );


        return response.data;


    } catch(error) {

        throw error;

    }

};








// Admin - Get All Users

export const getAllUsers = async () => {

    try {

        const response = await API.get(

            "/users"

        );


        return response.data;


    } catch(error) {

        throw error;

    }

};








// Admin - Update User Status / Details

export const updateUser = async (id,userData) => {

    try {


        const response = await API.put(

            `/users/update/${id}`,

            userData

        );


        return response.data;



    } catch(error) {


        throw error;


    }

};








// Admin - Delete User

export const deleteUser = async (id) => {

    try {


        const response = await API.delete(

            `/users/delete/${id}`

        );


        return response.data;



    } catch(error) {


        throw error;


    }

};








export const changePassword = async (passwordData) => {

    try {

        const response = await API.put(

            "/users/change-password",

            passwordData

        );


        return response.data;


    } catch(error) {

        throw error;

    }

};
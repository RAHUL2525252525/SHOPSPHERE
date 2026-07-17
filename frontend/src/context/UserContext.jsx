import { createContext, useEffect, useState } from "react";
import {
    getUserProfile,
    updateUserProfile
} from "../services/userService";


export const UserContext = createContext();



function UserProvider({ children }) {


    const [user, setUser] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);





    useEffect(() => {

        loadUser();

    }, []);





    const loadUser = async () => {

        try {


            const token = localStorage.getItem("token");


            if(token) {


                const data = await getUserProfile();


                setUser(data);

                setIsLoggedIn(true);


            }


        } catch(error) {


            console.log(error);


            logout();


        }

    };







    const updateProfile = async (userData) => {


        try {


            const data = await updateUserProfile(
                userData
            );


            setUser(data);


        } catch(error) {


            console.log(error);


        }


    };







    const login = (userData, token) => {


        localStorage.setItem(
            "token",
            token
        );


        setUser(userData);

        setIsLoggedIn(true);


    };







    const logout = () => {


        localStorage.removeItem(
            "token"
        );


        setUser(null);

        setIsLoggedIn(false);


    };








    return (


        <UserContext.Provider


            value={{


                user,
                setUser,
                isLoggedIn,
                login,
                logout,
                loadUser,
                updateProfile


            }}


        >


            {children}


        </UserContext.Provider>


    );


}



export default UserProvider;
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./ResetPassword.css";


function ResetPassword(){


    const { token } = useParams();

    const navigate = useNavigate();


    const [password,setPassword] = useState("");

    const [confirmPassword,setConfirmPassword] = useState("");

    const [message,setMessage] = useState("");

    const [messageType,setMessageType] = useState("");

    const [loading,setLoading] = useState(false);




    const handleSubmit = async(e)=>{


        e.preventDefault();



        if(!password || !confirmPassword){


            setMessageType("error");

            setMessage("Please fill in both fields");

            return;


        }


        if(password.length < 8){


            setMessageType("error");

            setMessage("Password must be at least 8 characters");

            return;


        }


        if(password !== confirmPassword){


            setMessageType("error");

            setMessage("Passwords do not match");

            return;


        }



        try{


            setLoading(true);



            const response = await axios.post(

                `https://shopsphere-backend-5umn.onrender.com/api/auth/reset-password/${token}`,

                {

                    password

                }

            );



            setMessageType("success");

            setMessage(response.data);


            // send them back to login after a short pause so they can read the message

            setTimeout(()=>{

                navigate("/login");

            },2000);



        }

        catch(error){


            setMessageType("error");


            setMessage(

                error.response ?

                error.response.data

                :

                "Server connection failed"

            );


        }


        finally{


            setLoading(false);


        }


    };






    return(

        <div className="reset-page">


            <div className="reset-brand">

                <div className="brand-content">

                    <div className="brand-logo">
                        <span className="brand-icon">🛒</span>
                        ShopSphere
                    </div>

                    <h2 className="brand-headline">
                        Almost there.
                        <br />
                        Choose a new password.
                    </h2>

                    <p className="brand-sub">
                        Make it something you'll remember, but
                        hard for anyone else to guess.
                    </p>

                </div>

                <div className="floating-tags" aria-hidden="true">

                    <span className="tag tag-1">-20%</span>
                    <span className="tag tag-2">NEW</span>
                    <span className="tag tag-3">₹499</span>
                    <span className="tag tag-4">FREE SHIP</span>
                    <span className="tag tag-5">★ 4.8</span>
                    <span className="tag tag-6">-50%</span>

                </div>

            </div>


            <div className="reset-panel">


                <div className="reset-card">


                    <div className="logo">

                        🔒

                    </div>



                    <h1>

                        Reset Password

                    </h1>



                    <p className="subtitle">

                        Enter your new password below

                    </p>




                    {

                        message &&

                        <div className={`message ${messageType}`}>

                            {message}

                        </div>

                    }





                    <form onSubmit={handleSubmit}>


                        <div className="input-group">


                            <label htmlFor="password">

                                New Password

                            </label>


                            <input

                                id="password"

                                type="password"

                                placeholder="Enter new password"

                                value={password}

                                onChange={(e)=>setPassword(e.target.value)}

                            />


                        </div>



                        <div className="input-group">


                            <label htmlFor="confirmPassword">

                                Confirm Password

                            </label>


                            <input

                                id="confirmPassword"

                                type="password"

                                placeholder="Re-enter new password"

                                value={confirmPassword}

                                onChange={(e)=>setConfirmPassword(e.target.value)}

                            />


                        </div>





                        <button

                            className="reset-btn"

                            disabled={loading}

                        >

                            {

                                loading ?

                                "Resetting..."

                                :

                                "Reset Password"

                            }


                        </button>




                    </form>





                    <div className="back-login">


                        Remember password?{" "}


                        <Link to="/login">

                            Login

                        </Link>


                    </div>



                </div>


            </div>


        </div>

    );

}



export default ResetPassword;

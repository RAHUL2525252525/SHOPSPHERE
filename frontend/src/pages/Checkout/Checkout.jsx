import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

import {
    createOrder
} from "../../services/orderService";

import "./Checkout.css";



function Checkout(){


    const navigate = useNavigate();


    const {cartItems,emptyCart} = useContext(CartContext);




    const [formData,setFormData] = useState({


        address:"",

        city:"",

        state:"",

        pincode:"",

        paymentMethod:"COD"


    });




    const [loading,setLoading] = useState(false);

    const [success,setSuccess] = useState(false);





    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });


    };







    const placeOrder = async(e)=>{


        e.preventDefault();


        try{


            setLoading(true);




            const order = {


                userEmail:

                localStorage.getItem("userEmail"),



                address:formData.address,


                city:formData.city,


                state:formData.state,


                pincode:formData.pincode,


                paymentMethod:

                formData.paymentMethod


            };





            const placedOrder = await createOrder(order);



            if(!placedOrder){

                alert("Your cart is empty");

                setLoading(false);

                return;

            }



            await emptyCart();



            setSuccess(true);




            setTimeout(()=>{

                navigate("/orders");

            },2200);



        }


        catch(error){


            console.log(error);


            alert(

                "Order Failed"

            );


        }


        finally{


            setLoading(false);


        }


    };








    if(success){


        return(

            <div className="checkout-page">

                <div className="order-success-box">

                    <div className="success-icon">

                        🎉

                    </div>

                    <h1>

                        Order Placed Successfully!

                    </h1>

                    <p>

                        Thank you for shopping with ShopSphere.
                        Redirecting you to your orders...

                    </p>

                </div>

            </div>

        );


    }






    return(


        <div className="checkout-page">




            <div className="checkout-container">



                <h1>

                    Checkout

                </h1>






                <form

                    className="checkout-card"

                    onSubmit={placeOrder}

                >





                    <div className="input-group">


                        <label>

                            Address

                        </label>


                        <textarea

                            name="address"

                            placeholder="Enter Address"

                            onChange={handleChange}

                        />


                    </div>





                    <div className="row">


                        <input

                            name="city"

                            placeholder="City"

                            onChange={handleChange}

                        />



                        <input

                            name="state"

                            placeholder="State"

                            onChange={handleChange}

                        />



                    </div>







                    <input

                        name="pincode"

                        placeholder="Pincode"

                        onChange={handleChange}

                    />







                    <select

                        name="paymentMethod"

                        onChange={handleChange}

                    >


                        <option value="COD">

                            Cash On Delivery

                        </option>


                        <option value="ONLINE">

                            Online Payment

                        </option>



                    </select>






                    <button

                        disabled={loading}

                    >


                        {

                            loading ?

                            "Placing Order..."

                            :

                            "Place Order"

                        }



                    </button>





                </form>





            </div>




        </div>


    );


}



export default Checkout;
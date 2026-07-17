import React, { useEffect, useState } from "react";

import {
    getOrdersByUser
} from "../../services/orderService";


import "./Orders.css";



function Orders(){


    const [orders,setOrders] = useState([]);


    const [loading,setLoading] = useState(true);






    useEffect(()=>{


        loadOrders();


    },[]);






    const loadOrders = async()=>{


        try{


            const email = localStorage.getItem(
                "userEmail"
            );


            const data = await getOrdersByUser(email);


            setOrders(data);



        }


        catch(error){


            console.log(error);


        }


        finally{


            setLoading(false);


        }


    };







    return(


        <div className="orders-page">


            <div className="orders-container">


                <h1>

                    My Orders 📦

                </h1>





                {


                    loading ?


                    <div className="state-loading">

                        <div className="soda-spinner"></div>

                        <p>Loading Orders...</p>

                    </div>



                    :



                    orders.length === 0 ?



                    <div className="empty-orders">


                        <h2>

                            No Orders Found

                        </h2>


                        <p>

                            Start shopping now

                        </p>


                    </div>



                    :



                    <div className="orders-list">



                        {

                            orders.map((order)=>(


                                <div

                                    className="order-card"

                                    key={order.id}

                                >



                                    <div>


                                        <h3>

                                            Order ID :

                                            {order.id}

                                        </h3>



                                        <p>

                                            Date :

                                            {order.orderDate}

                                        </p>



                                        <p>

                                            Payment :

                                            {order.paymentMethod}

                                        </p>


                                    </div>




                                    <div className="order-status">


                                        <span

                                            className={

                                                "status-badge " +

                                                (order.status || "PLACED")
                                                    .toLowerCase()

                                            }

                                        >

                                            {order.status ||

                                            "PLACED"}

                                        </span>


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


export default Orders;
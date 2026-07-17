import React, { useEffect, useState } from "react";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import { getAllUsers } from "../../services/userService";
import { getOrders } from "../../services/orderService";
import { getAllProducts } from "../../services/productService";

import "./AdminDashboard.css";


function AdminDashboard(){


    const [userCount,setUserCount] = useState(null);

    const [orderCount,setOrderCount] = useState(null);

    const [productCount,setProductCount] = useState(null);





    useEffect(()=>{

        loadCounts();

    },[]);





    const loadCounts = async()=>{


        try{

            const users = await getAllUsers();

            setUserCount(users.length);

        }
        catch(error){

            console.log(error);

            setUserCount(0);

        }



        try{

            const orders = await getOrders();

            setOrderCount(orders.length);

        }
        catch(error){

            console.log(error);

            setOrderCount(0);

        }



        try{

            const products = await getAllProducts();

            setProductCount(products.length);

        }
        catch(error){

            console.log(error);

            setProductCount(0);

        }


    };





    const cards=[


        {
            title:"Total Products",
            value:

            productCount===null

            ?

            "..."

            :

            productCount,

            icon:"📦"
        },


        {
            title:"Total Users",
            value:

            userCount===null

            ?

            "..."

            :

            userCount,

            icon:"👥"
        },


        {
            title:"Total Orders",
            value:

            orderCount===null

            ?

            "..."

            :

            orderCount,

            icon:"🛒"
        }


    ];





    return(


        <div className="admin-page">


            <div className="admin-layout">


                <AdminSidebar />




                <div className="admin-content">



                    <h1>
                        Welcome Admin 👋
                    </h1>


                    <p className="admin-subtitle">
                        Manage your ShopSphere store
                    </p>







                    <div className="admin-profile">


                        <div className="admin-avatar">

                            👤

                        </div>



                        <div>


                            <h3>
                                Admin
                            </h3>


                            <p>
                                srinivasrahul838@gmail.com
                            </p>


                        </div>


                    </div>









                    <h2 className="dashboard-title">

                        Admin Dashboard

                    </h2>






                    <div className="dashboard-cards">


                    {

                    cards.map((card,index)=>(


                        <div

                        className="admin-card"

                        key={index}

                        >



                            <div className="card-icon">

                                {card.icon}

                            </div>




                            <div>


                                <h3>

                                    {card.title}

                                </h3>



                                <p>

                                    {card.value}

                                </p>


                            </div>




                        </div>



                    ))


                    }


                    </div>









                    <div className="recent-section">


                        <h2>

                            Recent Activities

                        </h2>





                        <div className="activity-box">


                            <p>
                                New user registered
                            </p>


                            <p>
                                New order received
                            </p>


                            <p>
                                Product added
                            </p>


                        </div>



                    </div>





                </div>




            </div>




        </div>


    );


}


export default AdminDashboard;
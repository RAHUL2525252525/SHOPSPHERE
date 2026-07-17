import { Link, useNavigate } from "react-router-dom";

import "./AdminSidebar.css";


function AdminSidebar(){


    const navigate = useNavigate();



    const logout = () => {


        localStorage.removeItem("token");

        localStorage.removeItem("role");

        localStorage.removeItem("userId");

        localStorage.removeItem("userName");


        navigate("/login");


    };




    return(


        <div className="admin-sidebar">



            <h2>
                🛒 ShopSphere
            </h2>





            <nav>



                <Link to="/admin-dashboard">

                    Dashboard

                </Link>





                <Link to="/add-product">

                    Add Product

                </Link>





                <Link to="/manage-products">

                    Products

                </Link>





                <Link to="/manage-users">

                    Users

                </Link>





                <Link to="/manage-orders">

                    Orders

                </Link>





            </nav>




            <button

                className="admin-logout"

                onClick={logout}

            >

                Logout

            </button>




        </div>


    );


}



export default AdminSidebar;
import React from "react";

import { Link } from "react-router-dom";

import "./Footer.css";


function Footer(){


    return(


        <footer className="footer">


            <div className="footer-container">



                <div className="footer-section">


                    <h2>

                        🛒 ShopSphere

                    </h2>


                    <p>

                        Your smart shopping destination.

                        Buy quality products at the best prices.

                    </p>


                </div>





                <div className="footer-section">


                    <h3>

                        Quick Links

                    </h3>


                    <Link to="/dashboard">

                        Home

                    </Link>


                    <Link to="/products">

                        Products

                    </Link>


                    <Link to="/orders">

                        Orders

                    </Link>


                    <Link to="/profile">

                        Profile

                    </Link>


                </div>






                <div className="footer-section">


                    <h3>

                        Customer Service

                    </h3>


                    <p>

                        Contact Us

                    </p>


                    <p>

                        Privacy Policy

                    </p>


                    <p>

                        Terms & Conditions

                    </p>


                </div>






                <div className="footer-section">


                    <h3>

                        Follow Us

                    </h3>


                    <p>

                        Instagram

                    </p>


                    <p>

                        Facebook

                    </p>


                    <p>

                        Twitter

                    </p>


                </div>




            </div>






            <div className="footer-bottom">


                © 2026 ShopSphere. All Rights Reserved.


            </div>



        </footer>


    );


}


export default Footer;
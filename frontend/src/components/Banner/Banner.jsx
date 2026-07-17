import { Link } from "react-router-dom";
import "./Banner.css";


function Banner() {


    return (

        <section className="banner">


            <div className="banner-content">


                <h1>
                    Shop Smart, Live Better
                </h1>


                <p>
                    Discover premium products at the best prices.
                </p>



                <Link to="/products">

                    <button className="banner-btn">

                        Shop Now

                    </button>

                </Link>


            </div>


        </section>

    );


}


export default Banner;
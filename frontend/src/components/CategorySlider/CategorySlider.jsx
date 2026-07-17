import { Link } from "react-router-dom";
import "./CategorySlider.css";


function CategorySlider() {


    const categories = [

        {
            name:"Mobiles",
            icon:"📱"
        },

        {
            name:"Laptops",
            icon:"💻"
        },

        {
            name:"Fashion",
            icon:"👕"
        },

        {
            name:"Electronics",
            icon:"🎧"
        },

        {
            name:"Shoes",
            icon:"👟"
        },

        {
            name:"Home",
            icon:"🏠"
        },

        {
            name:"Beauty",
            icon:"💄"
        }


    ];





    return (

        <section className="category-slider">


            <h2 className="category-title">

                Shop By Category

            </h2>



            <div className="category-container">


                {

                    categories.map((category,index)=>(


                        <Link

                            to={`/products?category=${category.name}`}

                            key={index}

                            className="category-card"

                        >


                            <div className="category-icon">

                                {category.icon}

                            </div>



                            <h3>

                                {category.name}

                            </h3>


                        </Link>


                    ))

                }


            </div>


        </section>

    );


}


export default CategorySlider;
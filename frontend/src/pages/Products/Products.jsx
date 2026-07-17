import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../../components/ProductGrid/ProductGrid";

import {
    getAllProducts,
    getProductsByCategory
} from "../../services/productService";

import "./Products.css";



function Products(){


    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");


    const [products,setProducts] = useState([]);


    const [loading,setLoading] = useState(true);


    const [search,setSearch] = useState("");





    useEffect(()=>{


        loadProducts();


    },[category]);






    const loadProducts = async()=>{


        setLoading(true);


        try{


            const data =

                category

                ?

                await getProductsByCategory(category)

                :

                await getAllProducts();


            setProducts(data);


        }


        catch(error){


            console.log(error);

            setProducts([]);


        }


        finally{


            setLoading(false);


        }


    };






    const filteredProducts = products.filter((product)=>


        product.name

        ?

        product.name

        .toLowerCase()

        .includes(search.toLowerCase())


        :

        false


    );






    return(


        <div className="products-page">




            <div className="products-header">


                <h1>

                    {

                        category

                        ?

                        category

                        :

                        "All Products"

                    }

                </h1>



                <input


                    type="text"

                    placeholder="Search products..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}


                />



            </div>






            <div className="products-container">


                {


                    loading ?


                    <h2>

                        Loading Products...

                    </h2>



                    :



                    filteredProducts.length === 0 ?


                    <h2>

                        No Products Found

                    </h2>



                    :



                    <ProductGrid

                        products={filteredProducts}

                    />


                }


            </div>




        </div>


    );


}


export default Products;
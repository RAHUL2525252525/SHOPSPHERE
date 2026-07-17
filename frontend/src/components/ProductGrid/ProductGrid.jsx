import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";


function ProductGrid({ products }) {


    return (


        <section className="product-grid-section">



            <h2 className="product-grid-title">

                Latest Products

            </h2>





            {

                products && products.length > 0 ?


                <div className="product-grid">


                    {

                        products.map(product => (


                            <ProductCard

                                key={product.id}

                                product={product}

                            />


                        ))

                    }


                </div>



                :


                <div className="no-products">

                    No Products Available

                </div>


            }



        </section>


    );


}



export default ProductGrid;
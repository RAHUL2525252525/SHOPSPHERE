import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import {
    getProductById,
    updateProduct
} from "../../services/productService";

import "./EditProduct.css";



function EditProduct(){


const {id}=useParams();

const navigate=useNavigate();





const [product,setProduct]=useState({

name:"",
category:"",
brand:"",
image1:"",
image2:"",
image3:"",
brandPrice:"",
sellingPrice:"",
gst:"",
discount:"",
rating:"",
active:true

});





useEffect(()=>{

fetchProduct();

},[]);






const fetchProduct=async()=>{


try{


const data=await getProductById(id);


setProduct(data);



}
catch(error){

console.log(error);

}


};






const handleChange=(e)=>{


setProduct({

...product,

[e.target.name]:

e.target.name==="active"

?

e.target.value==="true"

:

e.target.value


});


};







const calculatePrice=()=>{


const price=Number(product.brandPrice);

const discount=Number(product.discount);

const gst=Number(product.gst);



const discounted=

price-(price*discount/100);



const final=

discounted+(discounted*gst/100);



setProduct({

...product,

sellingPrice:Math.round(final)

});


};








const saveProduct=async(e)=>{


e.preventDefault();



try{


await updateProduct(

id,

product

);



alert("Product Updated Successfully");


navigate("/manage-products");



}
catch(error){


console.log(error);


}


};







return(


<div className="edit-product-page">


<div className="admin-layout">


<AdminSidebar/>





<div className="edit-product-container">



<h1>
Edit Product
</h1>





<form

className="edit-form"

onSubmit={saveProduct}

>



<input

name="name"

value={product.name}

onChange={handleChange}

placeholder="Product Name"

/>






<select

name="category"

value={product.category}

onChange={handleChange}

>


<option value="">
Select Category
</option>


<option value="Mobiles">
📱 Mobiles
</option>


<option value="Laptops">
💻 Laptops
</option>


<option value="Fashion">
👕 Fashion
</option>


<option value="Electronics">
🎧 Electronics
</option>


<option value="Shoes">
👟 Shoes
</option>


<option value="Home">
🏠 Home
</option>


<option value="Beauty">
💄 Beauty
</option>



</select>






<input

name="brand"

value={product.brand}

onChange={handleChange}

placeholder="Brand"

/>






<input

name="image1"

value={product.image1 || ""}

onChange={handleChange}

placeholder="Image 1 URL"

/>




<input

name="image2"

value={product.image2 || ""}

onChange={handleChange}

placeholder="Image 2 URL"

/>





<input

name="image3"

value={product.image3 || ""}

onChange={handleChange}

placeholder="Image 3 URL"

/>







<input

name="brandPrice"

value={product.brandPrice}

onChange={handleChange}

placeholder="Original Price"

/>






<input

name="discount"

value={product.discount}

onChange={handleChange}

placeholder="Discount %"

/>






<input

name="gst"

value={product.gst}

onChange={handleChange}

placeholder="GST %"

/>






<button

type="button"

onClick={calculatePrice}

>

Calculate Selling Price

</button>






<input

name="sellingPrice"

value={product.sellingPrice}

readOnly

placeholder="Selling Price"

/>







<select

name="active"

value={product.active}

onChange={handleChange}

>


<option value="true">
Active
</option>


<option value="false">
Hidden
</option>


</select>







<button

className="update-btn"

type="submit"

>

Update Product

</button>





</form>



</div>



</div>


</div>


);


}



export default EditProduct;
import React, { useState, useEffect } from "react";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import { addProduct } from "../../services/productService";

import "./AddProduct.css";


const FALLBACK_IMAGE =
    "https://via.placeholder.com/300x300?text=No+Image";


function AddProduct(){


const [product,setProduct]=useState({

name:"",
category:"",
brand:"",
description:"",
brandPrice:"",
discount:"",
gst:"",
sellingPrice:"",
rating:0,
image1:"",
image2:"",
image3:"",
active:true

});


const [message,setMessage]=useState("");



const handleChange=(e)=>{

setProduct({

...product,

[e.target.name]:e.target.value

});

};



const handleRatingClick = (value) => {

    setProduct(prev => ({

        ...prev,

        rating: value

    }));

};



const uploadImage=async(e,index)=>{


const file=e.target.files[0];


if(!file)
return;


const formData=new FormData();

formData.append("file",file);


try{


const response=await fetch(
"https://shopsphere-backend-5umn.onrender.com/api/products/upload",
{
method:"POST",
body:formData
}
);


const url=await response.text();


setProduct(prev=>({

...prev,

[`image${index}`]:url

}));


}
catch(error){

console.log(error);

}



};




useEffect(()=>{


const price=Number(product.brandPrice);

const discount=Number(product.discount);

const gst=Number(product.gst);


if(!price || price<=0){

return;

}


const discounted=

price-(price*discount/100);



const final=

discounted+(discounted*gst/100);



const rounded=Math.round(final);



if(rounded!==Number(product.sellingPrice)){


setProduct(prev=>({

...prev,

sellingPrice: isNaN(rounded) ? "" : rounded

}));


}


// eslint-disable-next-line
},[product.brandPrice,product.discount,product.gst]);





const submitProduct=async(e)=>{


e.preventDefault();


try{


await addProduct(product);


setMessage("Product Added Successfully");


setProduct({

name:"",
category:"",
brand:"",
description:"",
brandPrice:"",
discount:"",
gst:"",
sellingPrice:"",
rating:0,
image1:"",
image2:"",
image3:"",
active:true

});


}
catch(error){


console.log(error);

setMessage("Failed to add product");


}


};



const previewImage=

product.image1 ||
product.image2 ||
product.image3 ||
FALLBACK_IMAGE;




return(

<div className="add-product-page">


<div className="admin-layout">


<AdminSidebar/>


<div className="add-product-container">


<h1>Add New Product</h1>



{
message &&
<p className="message">
{message}
</p>
}



<div className="add-product-layout">



<form 
className="product-form"
onSubmit={submitProduct}
>



<input

name="name"

placeholder="Product Name"

value={product.name}

onChange={handleChange}

required

/>




<select

name="category"

value={product.category}

onChange={handleChange}

required

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

placeholder="Brand"

value={product.brand}

onChange={handleChange}

/>



<textarea

name="description"

placeholder="Product Description (details, features, materials, etc.)"

value={product.description}

onChange={handleChange}

rows={5}

className="description-input"

/>




<div className="row">


<input

name="brandPrice"

placeholder="Original Price"

value={product.brandPrice}

onChange={handleChange}

/>



<input

name="discount"

placeholder="Discount %"

value={product.discount}

onChange={handleChange}

/>


</div>





<input

name="gst"

placeholder="GST %"

value={product.gst}

onChange={handleChange}

/>




<input

name="sellingPrice"

placeholder="Selling Price (Auto Calculated)"

value={product.sellingPrice}

readOnly

/>




<label className="rating-label">Rating</label>

<div className="rating-select">

    {

        [1,2,3,4,5].map((star) => (

            <span

                key={star}

                className={

                    star <= product.rating

                    ?

                    "star filled"

                    :

                    "star"

                }

                onClick={() => handleRatingClick(star)}

            >

                ★

            </span>

        ))

    }

    <span className="rating-value">

        {product.rating > 0 ? `${product.rating} / 5` : "Not rated"}

    </span>

</div>




<h3>Product Images</h3>



<input

name="image1"

placeholder="Image 1 URL"

value={product.image1}

onChange={handleChange}

/>


<input

type="file"

accept="image/*"

onChange={(e)=>uploadImage(e,1)}

/>





<input

name="image2"

placeholder="Image 2 URL"

value={product.image2}

onChange={handleChange}

/>


<input

type="file"

accept="image/*"

onChange={(e)=>uploadImage(e,2)}

/>





<input

name="image3"

placeholder="Image 3 URL"

value={product.image3}

onChange={handleChange}

/>


<input

type="file"

accept="image/*"

onChange={(e)=>uploadImage(e,3)}

/>





<button

className="submit-btn"

type="submit"

>

Add Product

</button>



</form>





<div className="preview-panel">


<h3>Live Preview</h3>


<div className="preview-card">


{

product.discount>0 &&

<span className="preview-discount">

{product.discount}% OFF

</span>

}



<div className="preview-image-box">


<img

src={previewImage}

alt="preview"

onError={(e)=>{

e.target.onerror=null;

e.target.src=FALLBACK_IMAGE;

}}

/>


</div>




<div className="preview-info">


<span className="preview-category">

{product.category || "Category"}

</span>



<h4 className="preview-name">

{product.name || "Product Name"}

</h4>



<div className="preview-rating">

    {"★".repeat(Math.round(product.rating || 0))}

    {"☆".repeat(5 - Math.round(product.rating || 0))}

    <span className="preview-rating-num">

        ({product.rating || 0})

    </span>

</div>



<div className="preview-price-row">


<span className="preview-selling">

₹ {product.sellingPrice || 0}

</span>



{

product.brandPrice &&

Number(product.brandPrice) > Number(product.sellingPrice) &&


<del className="preview-original">

₹ {product.brandPrice}

</del>


}


</div>



<p className="preview-brand">

{product.brand || "Brand"}

</p>



{

product.description &&

<p className="preview-description">

{product.description}

</p>

}


</div>


</div>


</div>



</div>


</div>


</div>


</div>


);


}


export default AddProduct;

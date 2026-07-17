import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import {
    getAllProducts,
    deleteProduct,
    updateProduct
} from "../../services/productService";

import "./ManageProducts.css";



function ManageProducts(){


const [products,setProducts]=useState([]);

const navigate=useNavigate();





useEffect(()=>{

    fetchProducts();

},[]);





const fetchProducts=async()=>{


try{


const data=await getAllProducts();

setProducts(data);



}
catch(error){

console.log(error);

}


};








const removeProduct=async(id)=>{


if(!window.confirm("Delete this product?"))

return;



try{


await deleteProduct(id);


fetchProducts();



}
catch(error){

console.log(error);

}


};









const toggleStatus=async(product)=>{


try{


await updateProduct(

product.id,

{

...product,

active:!product.active

}

);



fetchProducts();



}
catch(error){

console.log(error);

}


};








return(


<div className="manage-products-page">


<div className="admin-layout">


<AdminSidebar/>




<div className="manage-products">



<h1>
Manage Products
</h1>






<div className="product-table-container">


<table>


<thead>


<tr>


<th>Images</th>

<th>Name</th>

<th>Category</th>

<th>Brand</th>

<th>Price</th>

<th>Selling</th>

<th>Status</th>

<th>Action</th>


</tr>


</thead>





<tbody>



{

products.length>0 ?



products.map(product=>(



<tr key={product.id}>


<td className="multi-images">


{

product.image1 &&

<img src={product.image1} alt="product"/>

}


{

product.image2 &&

<img src={product.image2} alt="product"/>

}


{

product.image3 &&

<img src={product.image3} alt="product"/>

}



</td>





<td>
{product.name}
</td>





<td>
{product.category}
</td>





<td>
{product.brand}
</td>





<td>
₹ {product.brandPrice}
</td>





<td>
₹ {product.sellingPrice}
</td>





<td>


<button

className={
product.active 
?
"active-btn"
:
"inactive-btn"
}


onClick={()=>toggleStatus(product)}

>


{

product.active
?
"Active"
:
"Inactive"

}


</button>


</td>





<td className="actions">



<button

className="edit-btn"

onClick={()=>navigate(`/admin/edit-product/${product.id}`)}

>

Edit

</button>






<button

className="delete-btn"

onClick={()=>removeProduct(product.id)}

>

Delete

</button>



</td>



</tr>



))



:



<tr>

<td colSpan="8">

No Products Found

</td>

</tr>



}



</tbody>


</table>



</div>


</div>



</div>


</div>


);


}


export default ManageProducts;
import React, { useEffect, useState } from "react";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import API from "../../services/api";

import "./ManageOrders.css";



function ManageOrders(){


const [orders,setOrders]=useState([]);

const [expandedId,setExpandedId]=useState(null);





useEffect(()=>{

fetchOrders();

},[]);







const fetchOrders=async()=>{


try{


const response=await API.get("/orders");


setOrders(response.data);



}
catch(error){

console.log(error);

}


};








const updateStatus=async(id,status)=>{


try{


await API.put(

`/orders/status/${id}?status=${status}`

);



if(status==="Cancelled"){


setOrders(

orders.filter(order=>order.id!==id)

);


}
else{


setOrders(

orders.map(order=>


order.id===id

?

{

...order,

status:status

}

:

order


)

);


}



}
catch(error){

console.log(error);

}


};







const deleteOrder=async(id)=>{


if(!window.confirm("Delete this order?"))

return;



try{


await API.delete(

`/orders/delete/${id}`

);



fetchOrders();



}
catch(error){

console.log(error);

}


};



const toggleExpand=(id)=>{

setExpandedId(expandedId===id ? null : id);

};








return(


<div className="manage-orders-page">


<div className="admin-layout">


<AdminSidebar/>





<div className="manage-orders">



<div className="orders-header">


<h1>
Manage Orders
</h1>


<span>

Total Orders : {orders.length}

</span>


</div>







<div className="orders-table-container">


<table>


<thead>


<tr>


<th>
Order ID
</th>


<th>
Customer Email
</th>


<th>
Amount
</th>


<th>
Status
</th>


<th>
Update
</th>


<th>
Details
</th>


<th>
Action
</th>


</tr>


</thead>






<tbody>


{


orders.length>0


?


orders.map(order=>(


<React.Fragment key={order.id}>


<tr>


<td>

#{order.id}

</td>




<td>

{order.userEmail}

</td>





<td>

₹ {order.totalAmount}

</td>





<td>


<span

className={`status ${order.status}`}

>

{order.status}

</span>


</td>






<td>


<select


value={order.status}


onChange={(e)=>

updateStatus(

order.id,

e.target.value

)

}


>


<option value="Pending">
Pending
</option>


<option value="Confirmed">
Confirmed
</option>


<option value="Shipped">
Shipped
</option>


<option value="Delivered">
Delivered
</option>


<option value="Cancelled">
Cancelled
</option>


</select>



</td>



<td>


<button

className="view-order"

onClick={()=>toggleExpand(order.id)}

>

{

expandedId===order.id

?

"Hide"

:

"View"

}

</button>


</td>






<td>


<button

className="delete-order"

onClick={()=>deleteOrder(order.id)}

>

Delete

</button>


</td>



</tr>



{

expandedId===order.id &&


<tr className="order-details-row">


<td colSpan="7">


<div className="order-details-box">


<div className="order-address">


<strong>Shipping Address:</strong>


<p>

{order.address}, {order.city}, {order.state} - {order.pincode}

</p>


<p>

Payment: {order.paymentMethod}

</p>


</div>




<div className="order-items">


<strong>Items Ordered:</strong>


<table className="items-table">


<thead>


<tr>


<th>Product</th>

<th>Qty</th>

<th>Price</th>


</tr>


</thead>


<tbody>


{

order.items && order.items.map((item,index)=>(


<tr key={index}>


<td className="item-name-cell">


{

item.productImage &&

<img

src={item.productImage}

alt={item.productName}

/>

}


{item.productName}


</td>


<td>{item.quantity}</td>


<td>₹{item.price}</td>


</tr>


))

}


</tbody>


</table>


</div>



</div>



</td>


</tr>


}


</React.Fragment>


))


:


<tr>

<td colSpan="7">

No Orders Found

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


export default ManageOrders;
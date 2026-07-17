import { useEffect,useState } from "react";

import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

import {
    getAllUsers,
    updateUser,
    deleteUser
} from "../../services/userService";

import "./ManageUsers.css";



function ManageUsers(){


const [users,setUsers]=useState([]);






useEffect(()=>{

fetchUsers();

},[]);







const fetchUsers=async()=>{


try{


const data=await getAllUsers();

setUsers(data);


}
catch(error){

console.log(error);

}


};







const removeUser=async(id)=>{


if(!window.confirm("Delete this user?"))

return;



try{


await deleteUser(id);


fetchUsers();


}
catch(error){

console.log(error);

}


};









const toggleStatus=async(user)=>{


try{


await updateUser(

user.id,

{

...user,

enabled:!user.enabled

}

);



fetchUsers();



}
catch(error){

console.log(error);

}


};







return(


<div className="manage-users-page">


<div className="admin-layout">


<AdminSidebar/>




<div className="manage-users">



<div className="users-header">


<h1>
Manage Users
</h1>


<span>

Total Users : {users.length}

</span>


</div>







<div className="users-table-container">


<table>


<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Email</th>

<th>Phone</th>

<th>Role</th>

<th>Status</th>

<th>Action</th>


</tr>

</thead>





<tbody>


{

users.length>0 ?


users.map(user=>(


<tr key={user.id}>


<td>
{user.id}
</td>


<td>
{user.name}
</td>


<td>
{user.email}
</td>


<td>
{user.phone}
</td>


<td>

<span className="role">

{user.role}

</span>

</td>




<td>


<button

className={
user.enabled
?
"active-status"
:
"inactive-status"
}


onClick={()=>toggleStatus(user)}

>


{

user.enabled
?
"Active"
:
"Disabled"

}


</button>


</td>





<td>


<button

className="delete-user"

onClick={()=>removeUser(user.id)}

>

Delete

</button>


</td>


</tr>


))


:


<tr>

<td colSpan="7">

No Users Found

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


export default ManageUsers;
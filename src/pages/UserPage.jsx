// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; 

// //components


// // extra libraries 

// function UserPage() {

//     //hooks
//     const { id } = useParams();

//     // Effects
//     // ---- ASYNC change
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch(`${import.meta.env.VITE_API_URL}users/${id}`);
//                 const data = await response.json();
//                 setUser(data);
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         fetchUser();
// }, []);


//     return (
//         <div className="user-detail">
//         <h2>{user.email}</h2>
//                 </div>
    
//             );
// }


// export default UserPage;
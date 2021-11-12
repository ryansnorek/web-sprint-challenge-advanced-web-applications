import React from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const Logout = () => {     
    console.log("LOgout") 
    axiosWithAuth().post("/logout")
        .then(res => console.log(res))
    return (
    <div>

    </div>
    );
}

export default Logout;

// Task List
// 1. On mount, execute a http request to the logout endpoint.
// 2. On a successful request, remove the token from localStorage and redirect to the login page.
import React, { useState } from "react";
import "../styles/Home.css";
import axios from "axios"

const Home = () => {

    const [res,setRes] = useState(null)
    
    const handleClick = async () => {
        try{
            const response = await axios.get("https://192.168.30.138:443/api/v1/info",{
                headers:{
                    "Content-Type": "application/json",
                    "x-api-key" : "hid_arcid",
                    "Accept" : "application/json"
                }
            })
    
            setRes(response.data)
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
        
    }
    return (
    <div className="home">
        <h1>Welcome to demo website</h1>
        <button onClick={handleClick} className="license">License Info</button>
        {res && 
        <div className="">
            <table>
                <th>
                    <tr>device_id</tr>
                    <tr>device_role</tr>
                    <tr>device_type</tr>
                    <tr>version</tr>
                </th>
                <td>
                    <tr>res.device_id</tr>
                    <tr>res.device_role</tr>
                    <tr>res.device_type</tr>
                    <tr>res.version</tr>
                </td>
            </table>
        </div>}
        
    </div>)
}

export default Home;
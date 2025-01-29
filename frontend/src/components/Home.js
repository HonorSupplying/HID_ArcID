import React, { useState } from "react";
import "../styles/Home.css";
import axios from "axios"

const Home = () => {

    const [res,setRes] = useState(null)
    
    const handleClick = async () => {
        try{
            const response = await axios.get("https://127.0.0.1:443/api/v1/info",{
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
            <p>Device Id : {res.device_id}</p>
            <p>Device Role : {res.device_role}</p>
            <p>Device Type : {res.device_type}</p>
            <p>Vesion : {res.version}</p>

        </div>}
        
    </div>)
}

export default Home;
import React from "react";
import "../styles/Home.css";
import axios from "axios"

const Home = () => {
    const handleClick = async () => {
        const res = await axios.get("https://192.168.30.138:443/api/v1/info",{
            headers:{
                "Content-Type":"application/json",
                "X-API-KEY":"hid_arcid"
            }
        })

        console.log(res)

    }
    return (
    <div className="home">
        <h1>Welcome to demo website</h1>
        <button onClick={handleClick} className="license">License Info</button>
    </div>)
}

export default Home;
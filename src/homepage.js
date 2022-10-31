import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

function Homepage(props){
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(nav){
            navigate('/profile');
        }
    });

    const changeLinkHandler = () => {
        setNav(true);
    }

    const NotloginHandler = () => {
        return (
            <div style={{display: props.token === "" || props.token === null ? 'block' : 'none'}}>
                <p>Already Have an Account? <a href="/account/login">Login Here</a></p>
                <p>Not a member? <a href="/account/register">Register</a></p>
            </div>
        )
        
    }

    const loggedinHandler = () => {
        return (
            <div style={{display: props.token !== "" && props.token !== null ? 'block' : 'none'}}>
                <h3 className="loggedInMsg">Your are logged in as {props.username}</h3>
                <button className="viewProfileBtn" type="submit" onClick={changeLinkHandler}>View Profile</button>
            </div>
        )
    }


    return(
        <div className="homepage">
            <Header token={props.token} setToken={props.setToken} setUsername={props.setUsername} />
            <div className="homepage-content" style={{ textAlign:"center", padding:"3%" }}>
                <h1 className="welMsg">Welcome to Stanger's Things</h1>
                <div className="userStatusNote">
                    {NotloginHandler()}
                    {loggedinHandler()}
                </div>
            </div>
        </div>
    )
}

export default Homepage;
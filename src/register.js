import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from './header';

function Register(props) {
    const navigate = useNavigate();
    const [pwd, setPWD] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        if(success){
            setTimeout(()=>{
                navigate('/');
                //console.log("1");
            }, 2000);
        }
    });


    const handlePassword = (event) => {
        
        setPWD(event.target.value);
    }

    const handleEmail = (event) => {
        
        props.setUsername(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(props.username === '' || pwd === ''){
            setError(true);
            setSuccess(false);
            setMessage("Email and Password can not be blank.")
        }
        else{
            setError(false);
            
            fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/users/register', {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    user:{
                        username: props.username,
                        password: pwd
                    }
                })
            }).then(response => response.json()).then(result => {
                //console.log(result);
                if(result.success){
                    props.setToken(result.data.token);
                    setSuccess(true);
                    window.localStorage.setItem('Token', result.data.token);
                    window.localStorage.setItem('User', props.username);
                    setMessage("Success~ Redirecting to your profile page now...");
                }
                else{
                    setError(true);
                    setMessage("Something wrong with the endpoint.");
                    
                }
                
            }).catch(console.log(error))
        }

    }

    const errorMessage = () => {
        return (
            <div className="error" style={{display: error ? 'block' : 'none'}}>
                <h4 style={{color: error? 'red': ''}}>{message}</h4>
            </div>
        );
    }

    const successMessage = () => {
        return (
            <div className="error" style={{display: success ? 'block' : 'none'}}>
                <h4 style={{color: success? 'green': ''}}>{message}</h4>
            </div>
        );
    }
    return (
        <div className="registerPage">
            <Header token={props.token} setToken={props.setToken} setUsername={props.setUsername}/>
            <div className="form text-center">
                <div>
                    <h1 className="regTitle">Registration</h1>
                </div>
            
                {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
            
                <form onSubmit={submitHandler}>
                    {/* Labels and inputs for form data */}
                    <div>
                        <label className="label loginInput">Email</label>
                        <input onChange={handleEmail} className="inputBox"
                        value={props.username === null ? "" : props.username} type="email" />
                    </div>
                    
                    <div>
                        <label className="label loginInput">Password</label>
                        <input onChange={handlePassword} className="inputBox"
                        value={pwd} type="password" />
                    </div>
                    
                    {/*onClick={handleSubmit}*/}
                    <button className="regSubBtn" type="submit">
                        Submit
                    </button>

                </form>
                <div className="text-center">
                    <p>Already Have an Account? <a href="/account/login">Login Here</a></p>
                </div>
            </div>
            
        </div>
    );
}

export default Register;
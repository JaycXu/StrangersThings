import React, { useState, useEffect } from "react";
import Header from "./header";
import { useNavigate } from "react-router-dom";



function Login(props) {
    const navigate = useNavigate();
    const [pwd, setPWD] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        if(success){
            setTimeout(()=>{
                navigate('/profile');
                //console.log("1");
            }, 1000);
        }
    });

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

    const submitHandler = (event) => {
        event.preventDefault();
        if(props.username === '' || pwd === ''){
            setError(true);
            setSuccess(false);
            
            setMessage("Email and Password can not be blank.")
        }
        else{
            fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/users/login', {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    user:{
                        username:props.username,
                        password: pwd
                    }
                })
            }).then(response => response.json())
            .then(result => {
                if(result.success){

                    props.setToken(result.data.token);
                    setSuccess(true);

                    window.localStorage.setItem('Token', result.data.token);
                    window.localStorage.setItem('User', props.username);
                    setMessage("Success~ Redirecting to your profile page now...");
                }
                else{
                    setError(true);
                    setMessage("No User found.");
                    
                }
            })
            .catch(console.error);
        }
    }

    const handleEmail = (event) => {
        props.setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPWD(event.target.value);
    }

    return (
    <div className="loginPage">
        <Header token={props.token} setToken={props.setToken} setUsername={props.setUsername}/>
        <div className="form text-center loginpage">
                <div>
                    <h1 className="loginTitle">Log in</h1>
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
                    <button className="loginSubBtn" type="submit">
                        Submit
                    </button>

                </form>
                <div className="text-center">
                    <p>Not a member? <a href="/account/register">Register Here</a></p>
                </div>
            </div>
        {/* 
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <h1 style={{textAlign:'center'}}>Log in</h1>
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4">Sign in</MDBBtn>

            <div className="text-center">
                <p>Not a member? <a href="/account/register">Register</a></p>

            </div>
        </MDBContainer>
        */}
    </div>
  );
}


export default Login;
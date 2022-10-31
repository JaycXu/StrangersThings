import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

function Add(props){
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [val, setVal] = useState({
        title:'',
        description:'',
        prices:'',
        location:'',
        deliver:false
    });

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(val);
        fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(props.token)
            },
            body: JSON.stringify({
                post:{
                    title:String(val.title),
                    description:String(val.description),
                    price: String(val.prices),
                    location: String(val.location),
                    willDeliver:val.deliver
                }
            })
        }).then(response => response.json()).then(result => {
            console.log(result);
            if(result.success){
                setSuccess(true);
                setMessage("Success~ Directing to Post page to view your newest created post");
                setTimeout(() => {
                    navigate('/posts');
                }, 3000);
            }else{
                setError(true);
                setMessage("Post Fail!!!");
            }
        }).catch(console.error);
    } 

    const titleHandler = (event) => {
        
        setVal({...val, title:event.target.value})
    }

    const descriptionHandler = (event) => {
        
        setVal({...val, description:event.target.value})
    }

    const locationHandler = (event) => {
       
        setVal({...val, location:event.target.value})
    }

    const pricesHandler = (event) => {
       
        setVal({...val, prices:event.target.value})
    }

    const deliverHandler = (event) => {
       
        setVal({...val, deliver:event.target.checked})
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
        <div className="addPostPage" style={{color:'black'}}>
            <Header token={props.token} setToken={props.setToken} setUsername={props.setUsername}/>
            <div className="form text-center">
                <div>
                    <h1 style={{margin:'40px'}}>Add New Post</h1>
                </div>
            
                {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
            
                <form onSubmit={submitHandler}>
                    {/* Labels and inputs for form data */}
                    <div>
                        <label className="addPostLabel">Title</label>
                        <input className="addPostInput" onChange={titleHandler}  type="text" required/>
                    </div>
                    
                    <div>
                        <label className="addPostLabel">Description</label>
                        <input className="addPostInput" onChange={descriptionHandler} type="text" required/>
                    </div>

                    <div>
                        <label className="addPostLabel">Prices</label>
                        <input className="addPostInput" onChange={pricesHandler} type="text" required/>
                    </div>

                    <div>
                        <label className="addPostLabel">Location</label>
                        <input className="addPostInput" onChange={locationHandler} type="text"/>
                    </div>

                    <div>
                        <input type="checkbox" id="deliver" name="deliver" onChange={deliverHandler}/>
                        <label htmlFor="deliver"> Will to Deliver</label>
                    </div>
                    
                    {/*onClick={handleSubmit}*/}
                    <button className="addPostBtn" type="submit">
                        Add New Post
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Add;
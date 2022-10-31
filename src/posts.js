import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

function Posts(props){
    const navigate =  useNavigate();
    const [userInput, setUserInput] = useState('');
    const [arr, setArr] = useState([]);
    
    
    
    useEffect(()=>{
        props.setreplayMessage(false);
        fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/posts').then(response => response.json()).then(result => {
        
        props.setpostVal(result.data.posts);
        }).catch(console.error);
    });

    

    const queryChangeHandler = (event) => {
        setArr([]);
        var test = []
        setUserInput(event.target.value);
        for(var i = 0; i < props.postVal.length; i++){
            if((props.postVal[i].author.username).includes(event.target.value)){
                test.push(props.postVal[i]);
            }
            else if((props.postVal[i].title).includes(event.target.value)){
                test.push(props.postVal[i]);
            }
            else if((props.postVal[i].description).includes(event.target.value)){
                test.push(props.postVal[i]);
            }
            else if((props.postVal[i].price).includes(event.target.value)){
                test.push(props.postVal[i]);
            }
            else if((props.postVal[i].location).includes(event.target.value)){
                test.push(props.postVal[i]);
            }
        }
        setArr(test);
    }
    const addPostHandler = () => {
        
        if(props.token === '' || props.token === null){
            navigate('/account/login');
        }else{
            navigate('/posts/add');
        }

    }

    const viewPostHandler = (obj) => {
        //console.log(obj);
        //props.setclickedpostdetail({title:obj.title, description:obj.description, price:obj.price, author:obj.author.username, location:obj.location, id:obj._id, message:obj.message});
        window.localStorage.removeItem("posttitle");
        window.localStorage.removeItem("postdesc");
        window.localStorage.removeItem("postauthor");
        window.localStorage.removeItem("postlocation");
        window.localStorage.removeItem("postprice");
        window.localStorage.removeItem("postid");
        window.localStorage.removeItem("postmessage");
        window.localStorage.removeItem("postwilldeliver");
        window.localStorage.setItem("posttitle", obj.title);
        window.localStorage.setItem("postdesc", obj.description);
        window.localStorage.setItem("postauthor", obj.author.username);
        window.localStorage.setItem("postlocation", obj.location);
        window.localStorage.setItem("postprice", obj.price);
        window.localStorage.setItem("postid", obj._id);
        window.localStorage.setItem("postmessage", JSON.stringify(obj.messages));
        window.localStorage.setItem("postwilldeliver", obj.willDeliver);

        
        navigate('/posts/'+obj._id);
    }


    return (
        <div className="postsPage">
            <Header token={props.token} setToken={props.setToken} setUsername={props.setUsername}/>
            <fieldset style={{textAlign:'left'}}>
                <label htmlFor="keywords" className="postsTitle">Posts</label>
                <input className="searchBar"
                    id="keywords" 
                    type="text" 
                    placeholder="What are you looking for?"
                    value={userInput}
                    onChange={queryChangeHandler} />
                <a onClick={addPostHandler} className="addPost">(Click Here to Add a New Post)</a>
            </fieldset>
            {arr.length == 0 && userInput=='' ? props.postVal.map(v => {
                return (
                    <fieldset style={{border:'1px solid black', height:'250px', margin:'20px', color:"black"}} key={v._id}>
                        <h3>{v.title}</h3>
                        <p>{v.description}</p>
                        <p>Prices: {v.price}</p>
                        <h4>Seller: {v.author.username}</h4>
                        <h5>Location: {v.location}</h5>
                        {props.username === v.author.username ? <button onClick={()=>viewPostHandler(v)}>View</button> : <button className ="sendMsgBtn" onClick={()=>viewPostHandler(v)}>Send Seller Message</button>}
                    </fieldset>
                )
            }) : arr.map(v=>{
                return (
                    <fieldset style={{border:'1px solid black', height:'250px', margin:'20px', color:'black'}} key={v._id}>
                        <h3>{v.title}</h3>
                        <p>{v.description}</p>
                        <p>Prices: {v.price}</p>
                        <h4>Seller: {v.author.username}</h4>
                        <h5>Location: {v.location}</h5>
                        {props.username === v.author.username ? <button className="viewBtn" onClick={()=>viewPostHandler(v)}>View</button> : <button className ="sendMsgBtn" onClick={()=>viewPostHandler(v)}>Send Seller Message</button>}
                    </fieldset>
                )
            })}
            
        </div>
    )
}

export default Posts;
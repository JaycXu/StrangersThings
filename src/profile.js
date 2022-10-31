import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

function Profile(props){
    const navigate = useNavigate();
    const [message, setMessage] = useState([]);
    const [mypost, setMypost] = useState([]);
    const [allpost, setallPost] = useState([]);
    let count = 1;

    const sendMessageHandler = (val) => {
        props.setreplayMessage(true);
  
        window.localStorage.removeItem("posttitle");
        window.localStorage.removeItem("postdesc");
        window.localStorage.removeItem("postauthor");
        window.localStorage.removeItem("postlocation");
        window.localStorage.removeItem("postprice");
        window.localStorage.removeItem("postid");
        window.localStorage.removeItem("postmessage");
        window.localStorage.removeItem("postwilldeliver");

        window.localStorage.setItem("posttitle", val.title);
        window.localStorage.setItem("postdesc", val.description);
        window.localStorage.setItem("postauthor", val.author.username);
        window.localStorage.setItem("postlocation", val.location);
        window.localStorage.setItem("postprice", val.price);
        window.localStorage.setItem("postid", val._id);
        window.localStorage.setItem("postmessage", JSON.stringify(val.messages));
        window.localStorage.setItem("postwilldeliver", val.willDeliver);

        
        navigate('/posts/'+val._id);
        

    }

    const sendMessageselfHandler = (val) => {

        props.setreplayMessage(true);
        window.localStorage.removeItem("posttitle");
        window.localStorage.removeItem("postdesc");
        window.localStorage.removeItem("postauthor");
        window.localStorage.removeItem("postlocation");
        window.localStorage.removeItem("postprice");
        window.localStorage.removeItem("postid");
        window.localStorage.removeItem("postmessage");
        window.localStorage.removeItem("postwilldeliver");

        window.localStorage.setItem("posttitle", val.title);
        window.localStorage.setItem("postdesc", val.description);
        window.localStorage.setItem("postauthor", props.username);
        window.localStorage.setItem("postlocation", val.location);
        window.localStorage.setItem("postprice", val.price);
        window.localStorage.setItem("postid", val._id);
        window.localStorage.setItem("postmessage", JSON.stringify(val.messages));
        window.localStorage.setItem("postwilldeliver", val.willDeliver);

        
        navigate('/posts/'+val._id);
        

    }

    useEffect(()=>{
        
        if(props.token === '' && props.token === null ){
            navigate('/');
        }else{
            if(count === 1){
                count = count + 1;
                fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/users/me', {
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+window.localStorage.getItem('Token')
                    },
                }).then(response => response.json()).then(result => {
                    if(result.success){

                        setMessage(result.data.messages);
                        setMypost(result.data.posts);
                    }
                }).catch(console.error);

                fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/posts').then(response => response.json()).then(result => {
                    props.setpostVal(result.data.posts);
                    setallPost(result.data.posts);
                }).catch(console.error);
            }
        }
    }, [count]);
 
    return (
        <div className="profilePage">
            <Header token={props.token} setToken={props.setToken} setUsername={props.setUsername} />
            <h2 className="welUserMsg" style={{textAlign:'center'}}>Welcome back, {props.username}</h2>
            <h5 className="msgToMe" style={{textAlign:'center'}}>Messages sent to me</h5>
            <div style={{color:'black'}}>
                {mypost.map((v)=>{
                    return (
                        <div key={v._id}>
                            {(v.messages).map((m)=>{
                                return (
                                    <fieldset style={{border:'1px solid black', height:'150px', margin:'20px'}} key={m._id}>
                                        <h3>From: {m.fromUser.username}</h3>
                                        <p>{m.content}</p>
                                        {v.active ? <a onClick={() => {return sendMessageselfHandler(v)}}><b>View My Post</b> {v.title}</a> : <b>Post Deleted</b>}
                                    </fieldset>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <h5 className="msgFromMe" style={{textAlign:'center'}}>Messages sent from me</h5>
            <div style={{color:'black'}}>
                {message.map((v) => {
                    if(v.fromUser.username === window.localStorage.getItem('User')){
                        return (
                            <fieldset style={{border:'1px solid black', height:'150px', margin:'20px'}} key={v._id}>
                                <h3>(Send By Me)</h3>
                                <p>{v.content}</p>
                                {allpost.map((post)=>{
                                    if(post._id === v.post._id){
                                        if(post.active){
                                            return (
                                                <a key={post._id} onClick={() => {return sendMessageHandler(post)}}><b>Message Again</b> {post.title}</a>
                                            )
                                        }else{
                                            // <b key={post._id}>Post Deleted</b>
                                        }
                                        
                                    }
                                })}
                            </fieldset>
                        )
                    }
                })}
            </div>
        </div>
    )
}


export default Profile;
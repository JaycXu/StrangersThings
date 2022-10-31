import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./header";


function PostDetail(props){
    const params = useParams();
    const navigate = useNavigate();
    const [clickedit, setClickEdit] = useState(false);
    const [mess, setMess] = useState('');
    const [postobj, setpostobj] = useState({
        title:window.localStorage.getItem('posttitle'),
        description: window.localStorage.getItem('postdesc'),
        price: window.localStorage.getItem('postprice'),
        author: window.localStorage.getItem('postauthor'),
        location:window.localStorage.getItem('postlocation'),
        id:window.localStorage.getItem('postid'),
        message:JSON.parse(window.localStorage.getItem('postmessage')),
        willDeliver:JSON.parse(window.localStorage.getItem('postwilldeliver'))
    });

    const [newval, setnewVal] = useState({
        title:postobj.title,
        description:postobj.description,
        price:postobj.price,
        location:postobj.location,
        message:postobj.message,
        willDeliver:postobj.willDeliver
    });

    const [allpersonalmess, setallpersonalmess] = useState([]);

    useEffect(()=>{
        fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/users/me', {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+window.localStorage.getItem('Token')
            },
        }).then(response => response.json()).then(result => {
            if(result.success){
                setallpersonalmess(result.data.messages);
            }

        }).catch(console.error);

        //fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/posts').then(response => response.json()).then(result => {
        //    if(result.success){
        //
        //    }
        //}).catch(console.error);
    });
    const titleHandler = (event) => {
        
        setnewVal({...newval, title:event.target.value})
    }

    const descriptionHandler = (event) => {
        
        setnewVal({...newval, description:event.target.value})
    }

    const locationHandler = (event) => {
       
        setnewVal({...newval, location:event.target.value})
    }

    const pricesHandler = (event) => {
       
        setnewVal({...newval, price:event.target.value})
    }

    const deliverHandler = (event) => {
       
        setnewVal({...newval, deliver:event.target.checked})
    }

    const displayEditHandler = () => {
        if(clickedit){
            setClickEdit(false);
        }
        else{
            setClickEdit(true);
        }
        
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        fetch('http://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/posts/' + postobj.id, {
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+window.localStorage.getItem('Token')
            },
            body:JSON.stringify({
                post:{
                    title:newval.title,
                    description:newval.description,
                    price:newval.price,
                    location:newval.location,
                    willDeliver:newval.willDeliver
                }
            })
        }).then(response => response.json()).then(result => {
            console.log(result);
            if(result.success){
                window.localStorage.removeItem("posttitle");
                window.localStorage.removeItem("postdesc");
                window.localStorage.removeItem("postauthor");
                window.localStorage.removeItem("postlocation");
                window.localStorage.removeItem("postprice");
                window.localStorage.removeItem("postid");
                window.localStorage.removeItem("postmessage");
                window.localStorage.removeItem("postwilldeliver");
                window.localStorage.setItem("posttitle", result.data.post.title);
                window.localStorage.setItem("postdesc", result.data.post.description);
                window.localStorage.setItem("postauthor", result.data.post.author.username);
                window.localStorage.setItem("postlocation", result.data.post.location);
                window.localStorage.setItem("postprice", result.data.post.price);
                window.localStorage.setItem("postid", result.data.post._id);
                window.localStorage.setItem("postmessage", JSON.stringify(result.data.post.messages));
                window.localStorage.setItem("postwilldeliver", result.data.post.willDeliver);
                setpostobj({
                    title:window.localStorage.getItem('posttitle'),
                    description: window.localStorage.getItem('postdesc'),
                    price: window.localStorage.getItem('postprice'),
                    author: window.localStorage.getItem('postauthor'),
                    location:window.localStorage.getItem('postlocation'),
                    id:window.localStorage.getItem('postid'),
                    message:JSON.parse(window.localStorage.getItem('postmessage')),
                    willDeliver:JSON.parse(window.localStorage.getItem('postwilldeliver'))
                });
                setClickEdit(false);
            }
        }).catch(console.error);
       
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/posts/'+ postobj.id, {
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+window.localStorage.getItem('Token')
            }
        }).then(response => response.json()).then(result => {
            
            if(result.success){
                navigate('/posts');
            }
        }).catch(console.error);
    }

    const messageHandler = (event) => {
        setMess(event.target.value);
    }

    const submitMessageHandler = (event) => {
        event.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/posts/' + postobj.id + '/messages', {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+window.localStorage.getItem('Token')
            },
            body: JSON.stringify({
                message:{
                    content:mess
                }
            })
        }).then(response => response.json()).then(result => {
            console.log(result);
        }).catch(console.error);
        
    }

    
    
    return(
        <div className="postdetailPage" style={{color:'black'}}>
            <Header token={props.token} setToken={props.setToken} setUsername={props.setUsername} />
            
            <fieldset style={{border:'1px solid black', height:'400px', margin:'20px'}} key={postobj.id}>
                <h3>{postobj.title}</h3>
                <p>{postobj.description}</p>
                <p>Prices: {postobj.price}</p>
                <h4>Seller: {postobj.author}</h4>
                <h5>Location: {postobj.location}</h5>
                {props.username == postobj.author && !props.replymessage ? 
                <div><button className='deleteBtn' onClick={deleteHandler}>Delete</button> {clickedit ? <button className='editingBtn' onClick={displayEditHandler}>Editing</button> : <button className='editBtn' onClick={displayEditHandler}>Edit</button>}</div> : 
                <form onClick={submitMessageHandler} style={{margin:'100px 0 0 0'}}>
                    <h4>Message seller about this post:</h4>
                    <input className="msgInput" onChange={messageHandler} type="text" value={mess} required  placeholder="type your message here..."/>
                    <button className="sendMsgBtn">Send</button>
                </form>}
                
                
                {/*{props.username === v.author.username ? <button onClick={()=>viewPostHandler(v)}>View</button> : <button onClick={()=>viewPostHandler(v)}>Send Message</button>}*/}
            </fieldset>
            <div className="editForm" style={{textAlign:'center', display: clickedit ? 'block':'none'}}>
                <form onSubmit={submitHandler}>
                        {/* Labels and inputs for form data */}
                        <div>
                            <label className="editPostLabel">Title</label>
                            <input className="editPostInput" onChange={titleHandler}  type="text" value={newval.title} required/>
                        </div>
                        
                        <div>
                            <label className="editPostLabel">Description</label>
                            <input className="editPostInput" onChange={descriptionHandler} type="text" value={newval.description} required/>
                        </div>

                        <div>
                            <label className="editPostLabel">Prices</label>
                            <input className="editPostInput" onChange={pricesHandler} type="text" value={newval.price} required/>
                        </div>

                        <div>
                            <label className="editPostLabel">Location</label>
                            <input className="editPostInput" onChange={locationHandler} type="text" value={newval.location}/>
                        </div>

                        <div>
                            <input type="checkbox" id="deliver" name="deliver" onChange={deliverHandler} checked={newval.willDeliver}/>
                            <label htmlFor="deliver"> Will to Deliver</label>
                        </div>
                        
                        {/*onClick={handleSubmit}*/}
                        <button className="updateBtn" type="submit">
                            Update
                        </button>

                    </form>
                </div>
                {props.username === postobj.author ? <div style={{textAlgin:'center'}}>
                    <h5 style={{marginLeft:'18px'}}>Messages regarding this post</h5>
                    {(allpersonalmess).map(v=>{
                        
                        if(v.post._id === postobj.id){
                            return(
                                <fieldset style={{border:'1px solid black', height:'150px', margin:'20px', color:'black'}} key={v._id}>
                                    <h3>From: {v.fromUser.username}</h3>
                                    <p>{v.content}</p>
                                </fieldset>
                            )
                        }
                    })}

                </div> : <h5></h5>}
                

        </div>
    )
}


export default PostDetail;


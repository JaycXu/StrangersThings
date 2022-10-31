import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register'
import Homepage from './homepage';
import Profile from './profile';
import Posts from './posts';
import Add from './add';
import PostDetail from './postdetail';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [postVal, setpostVal] = useState([]);
  const [replymessage, setreplayMessage] = useState(false);


 
  useEffect(()=>{
    setToken(window.localStorage.getItem("Token"));
    setUsername(window.localStorage.getItem("User"));
    
  }, [])


  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Homepage token={token} username={username} setToken={setToken} setUsername={setUsername}/>}></Route>
        <Route path='/account/login' element={<Login setToken={setToken} setUsername={setUsername} username={username} token={token}/>}></Route>
        <Route path='/account/register' element={<Register setToken={setToken} setUsername={setUsername} username={username} token={token}/>}></Route>
        <Route path='/posts' element={<Posts setreplayMessage={setreplayMessage} setpostVal={setpostVal} postVal={postVal} token={token} username={username} setToken={setToken} setUsername={setUsername}/>}></Route>
        <Route path='/posts/:id' element={<PostDetail replymessage={replymessage} postVal={postVal} token={token} username={username} setToken={setToken} setUsername={setUsername}/>}></Route>
        <Route path='/posts/add' element={<Add token={token} username={username} setToken={setToken} setUsername={setUsername}/>}></Route>
        <Route path='/profile' element={<Profile setreplayMessage={setreplayMessage}  setpostVal={setpostVal} token={token} username={username} setToken={setToken} setUsername={setUsername}/>}></Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;

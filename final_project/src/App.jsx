import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from './components/Home';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Post from './components/Post';
import logo from './assets/logo.png';
import userIcon from "./assets/user_post.png";


import './App.css'


function App() {
  const [userId, setUserId] = useState("user" + Math.floor(10000 + Math.random() * 90000));
  return (
    <>
      <BrowserRouter>
   
      <nav className="navbar">
      <div className="navbar__logo-title">
        <img src={logo} alt="Logo" className="navbar__logo" />
        <h1 className="navbar__title">Pet Star Contest</h1>
      </div>
      
      <ul className="navbar__links">
        <li className="navbar__item">
          <Link to="/" className="navbar__link">Home</Link>
        </li>
        <li className="navbar__item">
          <Link to="/createPost" className="navbar__link">Create New Post</Link>
        </li>
      </ul>
      <div className="navbar__user">
        <span> <img src={userIcon} alt="user" className="iconUser" /> {userId}</span>
      </div>
    </nav>
      <Routes>
        <Route path="/" element={<Home userId={userId} />} />
        <Route path="/:id" element={<Post userId={userId} />} />
        <Route path="/createPost" element={<CreatePost userId={userId} />} />
        <Route path="/EditPost/:id" element={<EditPost />} />
   
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

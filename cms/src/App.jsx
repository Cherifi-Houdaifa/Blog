import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import NavBar from './components/NavBar';
import Home from "./pages/Home";
import Login from './pages/Login';
import Post from "./pages/Post"

export default function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/posts/:postid" element={<Post />} />
                </Routes>
            </Router>
        </>
    );
}

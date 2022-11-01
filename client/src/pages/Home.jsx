import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch(
                `${process.env.SERVER_URL.url}/api/posts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            if (response.status !== 200) {
                return alert(data.errors[0].msg);
            }
            setPosts(data);
        };
        getPosts();
    }, []);

    return (
        <main className="home-content">
            <h1>Posts</h1>
            <div className="posts">
                {posts.map((post, index) => {
                    return <div className="post" key={index}>
                    <h2 onClick={(e) => navigate("/posts/" + post._id)}>{post.title}</h2>
                    <h3>{new Date(post.dateCreated).toDateString()}</h3>
                </div>
                })}
            </div>
        </main>
    );
}

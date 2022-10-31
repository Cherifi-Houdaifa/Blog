import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [posts, setPosts] = useState([]);
    const postsDiv = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('JWT_TOKEN');
        if (!token) {
            navigate('/login');
        }
        const getPosts = async () => {
            const response = await fetch(
                process.env.SERVER_URL.url + '/api/posts'
            );
            const data = await response.json();
            setPosts(data);
        };
        getPosts();
    }, []);

    const btnClickHandler = async (e) => {
        const token = sessionStorage.getItem('JWT_TOKEN');
        const response = await fetch(
            process.env.SERVER_URL.url + '/api/posts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({ title, text }),
            }
        );
        if (response.status === 401) {
            sessionStorage.clear();
            navigate('/login');
            return;
        }
        const data = await response.json();
        if (response.status !== 200) {
            return alert(data.errors[0].msg);
        }
        setText('');
        setTitle('');
        alert('Post created. Refresh to see changes');
    };

    return (
        <main className="home-content">
            <div className="create-post">
                <input
                    type="text"
                    placeholder="Title"
                    autoComplete="off"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <textarea
                    cols="30"
                    rows="10"
                    placeholder="Post Content"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                ></textarea>
                <input
                    type="button"
                    value="Create A post"
                    onClick={btnClickHandler}
                />
            </div>
            <div className="posts" ref={postsDiv}>
                <h2>Posts</h2>
                {posts.map((post, index) => {
                    return (
                        <>
                            <div className="post" key={index}>
                                <h3 onClick={(e) => navigate("/" + post._id)}>{post.title}</h3>
                                <h4>
                                    {new Date(post.dateCreated).toDateString()}
                                </h4>
                            </div>
                            <hr />
                        </>
                    );
                })}
            </div>
        </main>
    );
}

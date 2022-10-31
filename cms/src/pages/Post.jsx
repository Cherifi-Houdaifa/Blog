import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Post.css';

export default function Post() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);
    const { postid } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('JWT_TOKEN');
        if (!token) {
            navigate('/login');
        }
        const getPost = async () => {
            const response = await fetch(
                process.env.SERVER_URL.url + '/api/posts/' + postid,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status !== 200) {
                return alert(data.errors[0].msg);
            }
            const data = await response.json();
            setTitle(data.title);
            setText(data.text);
            setComments(data.comments);
        };
        getPost();
    }, []);

    const updateBtnClickHandler = async (e) => {
        const token = sessionStorage.getItem('JWT_TOKEN');
        const response = await fetch(
            process.env.SERVER_URL.url + '/api/posts/' + postid,
            {
                method: 'PUT',
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
        navigate('/');
    };

    const deleteBtnClickHandler = async (e) => {
        const token = sessionStorage.getItem('JWT_TOKEN');
        const response = await fetch(
            process.env.SERVER_URL.url + '/api/posts/' + postid,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
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
        navigate('/');
    };

    const deleteCommentBtnHandler = async (e, commentid) => {
        const token = sessionStorage.getItem('JWT_TOKEN');
        const response = await fetch(
            `${process.env.SERVER_URL.url}/api/posts/${postid}/comments/${commentid}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
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

        e.target.parentElement.remove();
    };
    return (
        <main className="post-content">
            <div className="update-post">
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
                    value="Update post"
                    onClick={updateBtnClickHandler}
                />
                <input
                    type="button"
                    value="Delete post"
                    onClick={deleteBtnClickHandler}
                />
            </div>
            <div className="comments">
                <h2>Comments</h2>
                {comments.map((comment, index) => {
                    return (
                        <div className="comment" key={index}>
                            <h3>{comment.name}</h3>
                            <h4>{comment.text}</h4>
                            <input
                                type="button"
                                value="Delete comment"
                                onClick={(e) =>
                                    deleteCommentBtnHandler(e, comment._id)
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Post.css';

export default function Post() {
    const [post, setPost] = useState();
    const [commentUser, setCommentUser] = useState('');
    const [commentText, setCommentText] = useState('');
    const { postid } = useParams();

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(
                `${process.env.SERVER_URL.url}/api/posts/${postid}`,
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
            setPost(data);
        };
        getPost();
    }, []);

    const createCommentBtnHandler = async (e) => {
        const response = await fetch(
            `${process.env.SERVER_URL.url}/api/posts/${postid}/comments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: commentUser, text: commentText }),
            }
        );
        const data = await response.json();
        if (response.status !== 200) {
            return alert(data.errors[0].msg);
        }
        alert("Refresh to see comment")
    };

    return (
        <main className="post-content">
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.text}</p>
                    <h3>
                        Date Created:{' '}
                        {new Date(post.dateCreated).toDateString()}
                    </h3>
                </>
            ) : (
                ''
            )}
            <h1 style={{ marginTop: '70px' }}>Create A Comment</h1>
            <div className="create-comment">
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setCommentUser(e.target.value)}
                    value={commentUser}
                />
                <input
                    type="text"
                    placeholder="comment"
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                />
                <input
                    type="button"
                    value="Create A Comment"
                    onClick={createCommentBtnHandler}
                />
            </div>
            <h1 style={{ marginTop: '70px' }}>Comments</h1>

            {post
                ? post.comments.map((comment, index) => {
                      return (
                          <div className="comment" key={index}>
                              <h3>By: {comment.name}</h3>
                              <h4>{comment.text}</h4>
                          </div>
                      );
                  })
                : ''}
        </main>
    );
}

import React from 'react'
import '../../static/Newwfeed.css'
import TextareaAutosize from 'react-autosize-textarea';
import { useEffect, useState } from 'react';
import {
    Accordion,
    Button,
} from "react-bootstrap";

import {
    useParams, useHistory
} from "react-router-dom";
import Post from '../Post'

import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
export default function Search(props) {
    const { key } = useParams()
    const history = useHistory()
    const token = sessionStorage.getItem("token")
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const doPost = async (e) => {
        const res = await fetch(process.env.REACT_APP_URL + 'createpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body: JSON.stringify({
                "content": content,
                "image_url": imageUrl
            })
        })
        if (res.ok) {
            getPosts()
            document.getElementById("textarea").value = ""
            document.getElementById("image-url").value = ""
            setImageUrl(null)
            setContent('')
        }
    }

    const getPosts = async () => {
        setLoading(true)
        const res = await fetch(process.env.REACT_APP_URL + 'postlist', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body: JSON.stringify({
                "post_id": "list",
                "user_id": null
            })
        })
        if (res.ok) {
            const data = await res.json();
            setPosts(data.posts)
            history.push('/')
            console.log('success', data)
            setLoading(false)
        } else { console.log('failed to get postlist') }
    }
    // list posts
    const doSearch = async () => {
        setLoading(true)
        const res = await fetch(process.env.REACT_APP_URL + 'search', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body: JSON.stringify({ "key": key })
        })
        const data = await res.json()
        if (data.success) {
            setPosts(data.posts)
            console.log('success', data)
            setLoading(false)
        }
        else console.log('failed search')
    }

    useEffect(() => {
        doSearch()
    }, [key])

    return (
        <>
            <div id="mainColumn" className="col-md-9 col-lg-6 px-0">
                <div id="header" className="row mx-0 px-0">
                    <div className="col-2">
                        <h5 style={{ fontWeight: 900 }}>Home</h5>
                    </div>
                    <div className="col-7 col-md-8" />
                </div>
                <div id="createPost" className="row mx-0 shadow-bottom">
                    <div id="avatar" className="col-2 rounded-lg">
                        <img src="https://i.ya-webdesign.com/images/icon-circle-png-6.png" alt="avatar" />
                    </div>
                    <div id="createPostArea" className="col-10 rounded-lg">
                        <Accordion>
                            <div id="inputArea" className="row">
                                <TextareaAutosize id='textarea' onChange={e => setContent(e.target.value)} placeholder="What's happening?" style={{ minHeight: 20 }} />
                                {imageUrl && <img id='postImage' className='mt-2' src={imageUrl} alt="Image"></img>}
                            </div>
                            <div id="footerCreatePost" className="row">
                                <div id="iconButton" className="col-4 justify-content-around">
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        <i className="far fa-image" />
                                    </Accordion.Toggle>
                                    <i className="fas fa-paperclip" />
                                    <i className="far fa-smile" />
                                </div>
                                <div id="postButton" className="col">
                                    <span id="remainingChars">{130 - content.length >= 0 ? `${130 - content.length} characters remaining` : <span className='text-danger'>No more than 130 characters</span>}</span>
                                    <button disabled={(!imageUrl && !content) || (content.length > 130)}
                                        onClick={() => doPost()} className="btn btn-primary ml-4 rounded-lg" >
                                        Post
                                </button>
                                </div>
                            </div>
                            <Accordion.Collapse eventKey="0">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon3">Link (https://...)</span>
                                    </div>
                                    <input onChange={e => setImageUrl(e.target.value)} type="text" class="form-control" id="image-url" aria-describedby="basic-addon3" />
                                </div>
                            </Accordion.Collapse>
                        </Accordion>
                    </div>
                </div>
                {loading ? <div className="px-0 m-0 row" id="refresh">
                    <button onClick={() => getPosts()} type="button" class="btn btn-outline-info btn-lg btn-block">
                        <FadeLoader
                            css={override}
                            sizeUnit={"px"}
                            size={10}
                            color={'#17a2b8'}
                        />
                    </button>
                </div> : ""}
                {/* List post*/}
                {posts && posts.map((post) => {
                    return <Post
                        key={post.post_id}
                        post={post}
                        token={token}
                        getPosts={getPosts}
                        currentUser={props.currentUser}
                    />
                })}
            </div>
        </>
    )
}

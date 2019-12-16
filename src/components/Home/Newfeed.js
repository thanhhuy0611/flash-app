import React from 'react'
import '../../static/Newwfeed.css'
import TextareaAutosize from 'react-autosize-textarea';
import { useEffect, useState } from 'react';
import {
    Accordion,
    Button,
} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';


import Post from '../Post'
import { css } from '@emotion/core';
import { FadeLoader, BeatLoader } from 'react-spinners';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default function Newfeed(props) {
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const token = sessionStorage.getItem("token")
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
    // list posts

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
            setLoading(false)
            console.log('success', data)
        } else { console.log('failed to get postlist') }
    }
    useEffect(() => {
        getPosts()
    }, [])

    const loadMore = async () => {
        if (posts.length > 1) {
            const res = await fetch(process.env.REACT_APP_URL + 'post/loadmore', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify({
                    "last_post": posts[posts.length - 1].post_id
                })
            })
            if (res.ok) {
                const data = await res.json();
                setPosts(posts.concat(data.posts))
                console.log('load more success', data)
            } else { console.log('load more failed') }
        }
    }

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
                                    <i className="fas fa-paperclip text-secondary" />
                                    <i className="far fa-smile text-secondary" />
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
                <div className="px-0 m-0 row" id="refresh">
                    <button onClick={() => getPosts()} type="button" class="btn btn-outline-info btn-lg btn-block">
                        {loading ? <FadeLoader
                            css={override}
                            sizeUnit={"px"}
                            size={6}
                            color={'white'}
                        /> : <i class="fas fa-sync-alt mr-2"></i>}
                    </button>
                </div>
                {/* List post*/}
                <InfiniteScroll
                    dataLength={posts.length}
                    next={loadMore}
                    hasMore={true}
                    loader={
                        <div className='mb-4 mt-4 d-flex justify-content-center flex-row'>
                            <BeatLoader
                                css={override}
                                sizeUnit={"px"}
                                size={18}
                                color={'#17a2b8'}
                            />
                        </div>}
                >
                    {posts && posts.map((post) => {
                        return <Post
                            key={post.post_id}
                            post={post}
                            token={token}
                            getPosts={getPosts}
                            currentUser={props.currentUser}
                        />
                    })}
                </InfiniteScroll>

            </div>
        </>
    )
}

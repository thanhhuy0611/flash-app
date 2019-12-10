import React from 'react'
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import {
    Accordion,
    Button,
    OverlayTrigger,
    Popover,
    ButtonGroup,
    Modal,
} from "react-bootstrap";
import moment from 'moment'

export default function Post(props) {
    const [post, setPost] = useState(props.post)
    const [passPost, setPassPost] = useState()
    const [contentEdit, setContentEdit] = useState('')
    const [imageUrlEdit, setImageUrlEdit] = useState(null)
    const [show, setShow] = useState(false);
    const [modalIsDelete, setModalIsDelete] = useState(true)
    const [liked, setLiked] = useState(false)

    const getSinglePost = async () => {
        const res = await fetch(process.env.REACT_APP_URL + 'postlist', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${props.token}`
            },
            body: JSON.stringify({ "post_id": post.post_id })
        })
        if (res.ok) {
            const data = await res.json();
            setPost(data.posts)
            // console.log('update post success',data)
        } else { console.log('failed to update post id:', post.post_id) }
    }

    const checkLiked = () => {
        if (props.currentUser) {
            const arrLikerId = post.likes.liker_id
            const isLiked = arrLikerId.indexOf(props.currentUser.user_id)
            if (isLiked >= 0) {
                setLiked(true)
            } else { setLiked(false) }
        }
    }

    useEffect(() => {
        checkLiked()
    }, [props.currentUser])

    const likePost = async (id) => {
        const res = await fetch(process.env.REACT_APP_URL + 'likepost', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${props.token}`
            },
            body: JSON.stringify({
                "post_id": id,
            })
        })
        const data = await res.json()
        if (data.success) {
            getSinglePost()
            setLiked(!liked)
        } else if (!res.ok) { console.log('post like failed') }
    }

    const editPost = async (id) => {
        const res = await fetch(process.env.REACT_APP_URL + 'editpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${props.token}`
            },
            body: JSON.stringify({
                "id": id,
                "content": contentEdit,
                "image_url": imageUrlEdit
            })
        })
        if (res.ok) {
            getSinglePost()
            setImageUrlEdit(null)
            setContentEdit('')
            setShow(false)
        }
    }
    const deletePost = async (id) => {
        const res = await fetch(process.env.REACT_APP_URL + 'postdelete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${props.token}`
            },
            body: JSON.stringify({ 'id': id })
        })

        const data = await res.json()
        if (data.success) {
            console.log('delete success post id:', id)
            props.getPosts()
            setPost(props.post)
        } else {
            console.log(data.status)
        }
    }
    return (
        <>
            <div className="row rounded-lg container-fluid p-0 m-0 mb-1 post">
                <div className="row m-0 mb-1 container-fluid p-0">
                    <div id="postHeader" className="col-11  mt-1">
                        <img className="avatarPost" src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" alt="avatar-img" />
                        <span><strong>{post.user.name}</strong></span> • <span style={{ fontWeight: '200', fontSize: '14px' }}>{moment(post.created_on).fromNow()}</span>
                    </div>
                    <div className="col-1 p-0 text-right text-center mt-2">
                        {/* Modal ------------------------------------------- */}
                        <MyModal
                            post={passPost}
                            show={show}
                            setShow={setShow}
                            modalIsDelete={modalIsDelete}
                            deletePost={deletePost}
                            contentEdit={contentEdit}
                            setContentEdit={setContentEdit}
                            imageUrlEdit={imageUrlEdit}
                            setImageUrlEdit={setImageUrlEdit}
                            editPost={editPost}
                        />
                        {/* END Modal ------------------------------------------- */}
                        <OverlayTrigger
                            trigger="click"
                            key='bottom'
                            placement='bottom'
                            rootClose='true'
                            overlay={
                                <Popover id={`popover-positioned-bottom`}>
                                    <Popover.Title as="h3">Options</Popover.Title>
                                    <Popover.Content id={`popover-content`}>
                                        <ButtonGroup vertical>
                                            <Button disabled={props.currentUser ? (props.currentUser.user_id === post.user.id ? false : true) : true} onClick={() => { setPassPost(post); setModalIsDelete(false); setShow(true); setContentEdit(post.content); setImageUrlEdit(post.image_url) }}
                                                id={`popover-button`} variant="outline-info">
                                                <strong>Edit this post</strong>
                                            </Button>
                                            <Button disabled={props.currentUser ? (props.currentUser.user_id === post.user.id ? false : true) : true} onClick={() => { setPassPost(post); setModalIsDelete(true); setShow(true) }}
                                                id={`popover-button`} variant="outline-danger">
                                                <strong>Delete this post</strong>
                                            </Button>

                                        </ButtonGroup>
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <Button variant="light">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <i className="fas fa-chevron-down rounder-circle" />
                                </a>
                            </Button>
                        </OverlayTrigger>
                    </div>
                </div>
                <div id="postBody" className="row m-0 mb-1 container-fluid">
                    <p className="text-left mt-2 ml-2 mr-2">
                        {post.content}
                    </p>
                    {post.image_url && <img id='postImage' src={post.image_url} alt="postImage"></img>}
                </div>
                <div id="postFooter" className="row m-0 mb-1 container-fluid">
                    <Accordion className="col-12">
                        <div className="mt-1 col-12" id='postStatistic'>
                            <div className="text-left">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    {post.likes.count === 0 ? '' : <p style={{ marginBottom: '0px' }}>{post.likes.count} <i className="far fa-thumbs-up ml-1"></i></p>}
                                </a>
                            </div>
                            <div className="text-left">
                                <a href='#'>
                                    {post.comment.count === 0 ? '' : <p style={{ marginBottom: '0px' }}>{post.comment.count} <i className="far fa-comment-alt ml-1"></i></p>}
                                </a>
                            </div>
                        </div>
                        <div className='col-12'><hr /></div>
                        <div className="mt-1 col-12" id='postReact'>
                            <button onClick={() => likePost(post.post_id)} className="btn btn-outline-light text-secondary font-weight-bold">
                                <span className={liked ? "clicked" : "tttt"}><i className="far fa-thumbs-up mr-1"></i> Like</span>
                            </button>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                <button className="btn btn-outline-light text-secondary font-weight-bold">
                                    <i className="far fa-comment-alt mr-1"></i> Comment
                            </button>
                            </Accordion.Toggle>
                            <button className="btn btn-outline-light text-secondary font-weight-bold">
                                <i className="far fa-share-square mr-1"></i> Share
                                    </button>
                        </div>
                        <Accordion.Collapse eventKey="0">
                            <div class="input-group mb-3" id="commentInput">
                                <img className="avatarPost" style={{ maxHeight: "42px" }} src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" alt="avatar-img" />
                                <TextareaAutosize id="commentTextarea" placeholder="Comment here" style={{ minHeight: 20 }} />
                                <div style={{ display: "flex", alignItems: "flex-end" }}>
                                    <button className="btn  text-secondary font-weight-bold" id="comment-button"><i class="far fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </div>
            </div>
        </>
    )
}


function MyModal(props) {
    return (
        <>
            <Modal show={props.show} backdrop={'static'} keyboard={false} onHide={() => props.setShow(false)}>
                {props.modalIsDelete ? <>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to delete this post?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { props.setShow(false) }}>
                            Cancel
                                                                </Button>
                        <Button variant="danger" onClick={() => { props.deletePost(props.post.post_id); props.setShow(false) }}>
                            Delete
                                                                </Button>
                    </Modal.Footer>
                </> : <>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="createPost" className="row mx-0 shadow-bottom">
                                <div id="avatar" className="col-2 rounded-lg">
                                    <img src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" alt="avatar" />
                                </div>
                                <div id="createPostArea" className="col-10 rounded-lg">
                                    <Accordion>
                                        <div id="inputArea" className="row">
                                            <TextareaAutosize id='textarea' onChange={e => props.setContentEdit(e.target.value)} defaultValue={props.post.content} style={{ minHeight: 20 }} />
                                            {props.imageUrlEdit && <img id='postImage' className='mt-2' src={props.imageUrlEdit} alt="Image"></img>}
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
                                                <span id="remainingChars">{130 - props.contentEdit.length >= 0 ? `${130 - props.contentEdit.length} characters remaining` : <span className='text-danger'>No more than 130 characters</span>}</span>
                                                <button disabled={(!props.imageUrlEdit && !props.contentEdit) || (props.contentEdit.length > 130)}
                                                    onClick={() => props.editPost(props.post.post_id)} className="btn btn-primary ml-4 rounded-lg" >
                                                    Post
                                                                        </button>
                                            </div>
                                        </div>
                                        <Accordion.Collapse eventKey="0">
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon3">Link (https://...)</span>
                                                </div>
                                                <input onChange={e => props.setImageUrlEdit(e.target.value)} defaultValue={props.post.image_url} type="text" class="form-control" id="image-url" aria-describedby="basic-addon3" />
                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                </div>
                            </div>
                        </Modal.Body>
                    </>}
            </Modal>
        </>

    )
}
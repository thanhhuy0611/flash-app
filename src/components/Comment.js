import React from 'react'
import { useEffect, useState } from 'react';
import {
    Button,
} from "react-bootstrap";
import moment from 'moment'
import {
    useHistory
  } from "react-router-dom";

export default function Comment(props) {
    const history = useHistory()
    const [comment, setComment] = useState(props.comment)
    const [liked, setLiked] = useState(false)

    const getSingleComment = async () => {
        const res = await fetch(process.env.REACT_APP_URL + 'getcomment', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${props.token}`
            },
            body: JSON.stringify({ "comment_id": comment.comment_id })
        })
        if (res.ok) {
            const data = await res.json();
            setComment(data.comments)
            // console.log('update post success',data)
        } else { console.log('failed to update post id:', comment.comment_id) }
    }

    const checkLiked = () => {
        if (props.currentUser) {
            const arrLikerId = comment.likes.liker_id
            const isLiked = arrLikerId.indexOf(props.currentUser.user_id)
            if (isLiked >= 0) {
                setLiked(true)
            } else { setLiked(false) }
        }
    }

    useEffect(() => {
        checkLiked()
    }, [props.currentUser])
    const likeComment = async () => {
        const res = await fetch(process.env.REACT_APP_URL + 'likecomment', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${props.token}`
            },
            body: JSON.stringify({
                "comment_id": comment.comment_id,
            })
        })
        const data = await res.json()
        if (data.success) {
            getSingleComment()
            setLiked(!liked)
        } else if (!res.ok) { console.log('like failed') }
    }

    const deleteComment = async () => {
        const res = await fetch(process.env.REACT_APP_URL + 'commentdelete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${props.token}`
            },
            body: JSON.stringify({ 'id': comment.comment_id })
        })
        const data = await res.json()
        if (data.success) {
            console.log('delete success post id:', comment.comment_id)
            props.getComments()
            setComment(props.comment)
        } else {
            console.log(data.status)
        }
    }
    return (
        <div className="container">
            <div class="input-group mb-3 row" id="commentRow">
                <img className="avatarPost" style={{ maxHeight: "42px" }} src="https://i.ya-webdesign.com/images/icon-circle-png-6.png" alt="avatar-img" />
                <div>
                    <span><a href='#' onClick={(e)=>{e.preventDefault();history.push(`/user/${comment.owner_id}`)}}><strong>
                        {comment && comment.owner}
                    </strong></a></span>
                    <span style={{ marginLeft: '10px' }}><a  className="text-secondary" href='#' onClick={(e) => { e.preventDefault(); likeComment() }}><i class={`fas fa-thumbs-up ${liked ? "clicked" : ""}`}></i></a></span>
                    {comment && comment.owner_id === props.currentUser.user_id ? <span style={{ marginLeft: '10px' }}><a href='#' onClick={(e) => { e.preventDefault(); deleteComment() }}><i className={`fas fa-trash-alt`}></i></a></span> : ""}
                    <br />
                    • <span style={{ fontWeight: '200', fontSize: '14px' }}>{comment && moment(comment.created_on).fromNow()} <a href="#" onClick={(e) => e.preventDefault()}>
                        {comment && comment.likes.count === 0 ? '' :
                            <span style={{ marginBottom: '0px' }}>
                                {comment && comment.likes.count} 
                                <i className={`far fa-thumbs-up ml-1`}></i>
                            </span>}
                    </a></span>
                </div>
            </div>
            <div className="col-12">
                <p id="comment-content" >{comment && comment.content}</p>
            </div>
        </div>
    )
}

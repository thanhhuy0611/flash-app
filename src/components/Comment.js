import React from 'react'
import { useEffect, useState } from 'react';
import {
    Button,
} from "react-bootstrap";
import moment from 'moment'

export default function Comment(props) {
    const [comment, setComment] = useState(props.comment)
    return (
        <>
            <div class="input-group mb-3 row" id="commentRow">
                <div className="col-12">
                    <img className="avatarPost" style={{ maxHeight: "42px" }} src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" alt="avatar-img" />
                    <span><strong>{comment.owner}</strong></span> • <span style={{ fontWeight: '200', fontSize: '14px' }}>{moment(comment.created_on).fromNow()}</span>
                </div>
                <div className="col-12">
                    <p id="comment-content" >{comment.content}</p>
                </div>
            </div>
        </>
    )
}

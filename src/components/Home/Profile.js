import React from 'react'
import { useEffect, useState } from 'react';
import '../../static/Newwfeed.css'
import '../../static/Profile.css'
import {
    useParams,
    useHistory
} from "react-router-dom";

import Post from '../Post'
export default function Profile(props) {
    const token = sessionStorage.getItem("token")
    const [posts, setPosts] = useState([])
    const { user_id } = useParams();
    const history = useHistory()
    const [user, setUser] = useState(null)
    const [followed, setFollowed] = useState(false)

    const checkFollowed = () => {
        if (props.currentUser && user) {
            let arrFollowId = [];
            for (let i = 0; i < user.follow.list_followers.length; i++){
                arrFollowId[i] = user.follow.list_followers[i].id
            }
            const isFollowed = arrFollowId.indexOf(props.currentUser.user_id)
            if (isFollowed >= 0) {
                setFollowed(true)
            } else { setFollowed(false) }
        }
    }
    useEffect(() => {
        checkFollowed()
    }, [user])

    const clickFollow = async () => {
        const res = await fetch(process.env.REACT_APP_URL + `follow/${user.user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            }
        })
        const data = await res.json()
        if (data.success) {
            setFollowed(!followed)
            getUser()
            console.log('success follow handle')
        }
    }

    const getUser = async () => {
        const res = await fetch(process.env.REACT_APP_URL + `user/${user_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            }
        })
        const data = await res.json()
        setUser(data)
        console.log(data)
    }

    // list posts
    const getPosts = async () => {
        const res = await fetch(process.env.REACT_APP_URL + 'postlist', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body: JSON.stringify({
                "post_id": "list",
                "user_id": user_id
            })
        })
        if (res.ok) {
            const data = await res.json();
            setPosts(data.posts)
            console.log('success', data)
        } else { console.log('failed to get postlist') }
    }
    useEffect(() => {
        getUser()
        getPosts()
    }, [user_id])

    return (
        <>
            <div id="mainColumn" className="col-md-9 col-lg-6 px-0">
                <div id="header" className="row mx-0 px-0">
                    <div className="col-2">
                        <h5 style={{ fontWeight: 900 }}>Profile</h5>
                    </div>
                    <div className="col-7 col-md-8" />
                </div>
                <div id="banner" className="row mx-0 mb-4 shadow-bottom">
                    <div id="avatarProfile" >
                        <img src="https://i.ya-webdesign.com/images/icon-circle-png-6.png" alt="avatar" />
                        <div id='nameProfile' className="rounded pl-4 ">
                            <span >{user && user.user_name}</span>
                            {user && (user.user_id === props.currentUser.user_id ? "" : <button onClick={() => clickFollow()}
                                className={`btn ${followed ? 'btn-outline-info' : 'btn-info'} ml-2 rounded`}>{followed ? 'Unfollow' : 'Follow'}
                            </button>)}
                        </div>

                        {/* <!-- Modal followers --> */}
                        <div class="modal fade" id="followersModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Followers</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        {user&& user.follow.list_followers.map(follower=>{
                                            return <div className="row mb-2">
                                                <div className="col-9">
                                                    <img src="https://i.ya-webdesign.com/images/icon-circle-png-6.png" alt="Avatar" width={35} height="auto" /><span>&nbsp; {follower.name}</span>
                                                </div>
                                                <div className="col-2">
                                                <button onClick={()=>history.push(`/user/${follower.id}`)} type="button" data-toggle="modal" data-target="#followersModal" className="btn-outline-primary rounded">Profile</button>
                                                </div>
                                                <div className="col"></div>
                                        </div>})}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Modal followers --> */}
                        <div class="modal fade" id="followingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Following</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        {user&& user.follow.list_following.map(following=>{
                                            return <div className="row mb-2">
                                                <div className="col-9">
                                                    <img src="https://i.ya-webdesign.com/images/icon-circle-png-6.png" alt="Avatar" width={35} height="auto" /><span>&nbsp; {following.name}</span>
                                                </div>
                                                <div className="col-2">
                                                <button onClick={()=>history.push(`/user/${following.id}`)} type="button" data-toggle="modal" data-target="#followingModal" className="btn-outline-primary rounded">Profile</button>
                                                </div>
                                                <div className="col"></div>
                                        </div>})}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end Modal------------------------------ */}
                        
                        <div id='nameProfile' className="rounded pl-2 mt-2 mb-1 pr-2">
                            <span><a className="text-white" href="#" onClick={(e) => { e.preventDefault() }} data-toggle="modal" data-target="#followersModal">
                                <i class="fas fa-user-friends text-info"></i> Followers: {user && user.follow.count_followers}
                            </a></span>
                        </div>
                        <div id='nameProfile' className="rounded pl-2 pr-2">
                            <span><a className="text-white" href="#" onClick={(e) => { e.preventDefault() }} data-toggle="modal" data-target="#followingModal">
                                <i class="fas fa-eye text-info"></i> Following: {user && user.follow.count_following}
                            </a></span>
                        </div>
                    </div>
                </div>
                <div className="px-0 m-0" id="refresh" />
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

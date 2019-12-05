import React from 'react'
import '../../static/Newwfeed.css'
import TextareaAutosize from 'react-autosize-textarea';
import { useEffect, useState } from 'react';

export default function Newfeed() {
    const [content, setContent] = useState('')
    function onChange(e) {
        setContent(e.target.value);
      }

    console.log('object', !!content)
    return (
        <div id="mainColumn" className="col-md-9 col-lg-6 px-0">
            <div id="header" className="row mx-0 px-0">
                <div className="col-2">
                    <h5 style={{ fontWeight: 900 }}>Home</h5>
                </div>
                <div className="col-7 col-md-8" />
                {/* <div className="col-3 col-md-2 text-right">
                <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal" data-whatever>Sign in</button>
            </div> */}
            </div>
            <div id="mainTweet" className="row mx-0 shadow-bottom">
                <div id="avatar" className="col-2">
                    <img id="mainTweetAvatar" src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" alt="avatar" />
                </div>
                <div id="tweetArea" className="col-10">
                    <div id="inputArea" className="row">
                        <TextareaAutosize id='textarea' onChange={onChange} placeholder="What's happening?" style={{ minHeight: 20 }} />
                        {/* <textarea id="text" cols={300} rows={1} placeholder="What's happening?" aria-expanded="false" defaultValue={""} /> */}
                    </div>
                    <div id="buttonMainTweet" className="row">
                        <div id="leftButtonMainTweet" className="col-4 justify-content-around">
                            <i className="far fa-image" />
                            <i className="fas fa-paperclip" />
                            <i className="far fa-smile" />
                        </div>
                        <div id="rightButtonMainTweet" className="col">
                            <span id="remainingChars">{130- content.length>=0? `${130- content.length} characters remaining`:<span>'No more than 130 characters'</span>}</span>
                            <button disabled={content.length>130 || !content} id="tweetButton" className="btn btn-primary ml-4" >Post</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-0 m-0" id="refresh" onclick="renderTweets(appState.tweets)" />
            {/* Tweet Feed by Hai*/}
            <div className="row p-0 m-0 container-fluid">
                <div id="feed" className="col container-fluid p-0 m-0">
                    <div id="tweet110" className="row container-fluid p-0 m-0 mb-1 tweet">
                        <div id="feedAvatar" className="col-2 pt-3 pl-3 pr-2">
                            <img src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" className="avatarLee" alt="avatar-img" />
                        </div>
                        <div id="content" className="col-10 py-2 pl-0 pr-1">
                            <div id="text" className="row container m-0 pl-0 pr-3">
                                <div className="row m-0 mb-1 container-fluid p-0">
                                    <div id="tweetTitle" className="col-9 pl-0 mt-1">
                                        <span><strong>Phong</strong> @Phong</span> • <span>2 days ago</span>
                                    </div>
                                    <div className="col" />
                                    <div className="col-1 p-0 text-right">
                                        <a id="expandBtn" className="faButton text-decoration-none rounded-circle expandBtn" onclick="deleteTweet(110)" href="#"><i className="fas fa-chevron-down rounder-circle" /></a>
                                    </div>
                                </div>
                                <p id="tweetBody110" className="text-left">
                                    {/* Parent tweet content */}
                                </p><div id="tweet102" className="retweet row container-fluid p-0 m-0 mb-1 rounded">
                                    <div id="feedAvatar" className="col-2 pt-3 pl-3 pr-0">
                                        <img src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" className="avatarLee" alt="avatar-img" />
                                    </div>
                                    <div id="content" className="col-10 py-2 pl-3 pr-1">
                                        <div id="text" className="row container m-0 pl-0 pr-3">
                                            <div className="row m-0 mb-1 container-fluid p-0">
                                                <div id="tweetTitle" className="col-12 pl-0 mt-1">
                                                    <span><strong>Phong</strong> @Phong</span> • <span>2 days ago</span>
                                                </div>
                                                <div className="col" />
                                            </div>
                                            <p id="tweetBody102" className="text-left">Code or die bitches!</p>
                                        </div>
                                    </div>
                                </div>
                                {/* End of parent tweet content */}
                                <p />
                            </div>
                            <div id="contentButton" className="row m-0">
                                <div className="col-12 col-md-12 col-lg-8 d-flex justify-content-between p-0">
                                    <a id="commentBtn" className="faButton text-decoration-none mr-2 commentBtn" href="#"><i className="far fa-comment rounded-circle" />20</a>
                                    <a id="retweetBtn110" className="faButton text-decoration-none mr-2" onclick="retweet(110)" href="#"><i className="fas fa-retweet rounded-circle" />130</a>
                                    <a id="likeBtn110" className="faButton text-decoration-none mr-2 likeBtn" onclick="toggleLike(110)">
                                        <i className="fas fa-heart rounded-circle " /></a>
                                    <a id="shareBtn" className="faButton text-decoration-none" href="#"><i className="far fa-share-square rounded-circle" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import '../../static/Home.css'

import Newfeed from './Newfeed'
import Profile from './Profile'
import Search from './Search'

//import router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
  } from "react-router-dom";

export default function Home(props) {
    const history = useHistory()
    return (
        <>
            <main className="container-fluid main">
                <div className="row">
                    {/* leftside */}
                    <div id="leftSideMenu" className="col-md-3 font-weight-bold d-flex flex-column justify-content-start align-items-start">
                        <div className="twittericon my-2">
                            <img src="https://i.ya-webdesign.com/images/icon-circle-png-6.png" className="birdimg" />
                            <p className='ml-2 mb-0'>{props.currentUser && props.currentUser.user_name}</p>
                        </div>
                        <div className=" border-0">
                            <div className="card-body">
                                <h5 className="card-title mb-4">
                                    <a href="/" onClick={(e) => {e.preventDefault();history.push('/')}}>
                                        <i  className="fas fa-home" />&nbsp; Home
                                    </a>
                                </h5>
                                <h5 className="card-title mb-4">
                                <a href="/" onClick={(e) => {e.preventDefault();history.push(`/user/${props.currentUser && props.currentUser.user_id}`)}}>
                                <i className="fas fa-user-circle" />&nbsp; Profile
                                    </a>
                                </h5>
                                <h5 className="card-title mb-4">
                                <a href="/" onClick={(e) => {e.preventDefault();history.push(`/user/${props.currentUser && props.currentUser.user_id}`)}}>
                                <i className="far fa-list-alt" />&nbsp; Posts reacted
                                    </a>
                                </h5>
                                <h5 className="card-title mb-4"><i className="fas fa-hashtag" />&nbsp; Explore</h5>
                                <h5 className="card-title mb-4"><i className="far fa-bell" />&nbsp; Notification</h5>
                                <h5 className="card-title mb-4"><i className="far fa-envelope" />&nbsp; Messages</h5>
                                <h5 className="card-title mb-4"><i className="far fa-bookmark" />&nbsp; Bookmarks</h5>
                                <h5 className="card-title mb-4"><i className="fas fa-info-circle" />&nbsp; More</h5>
                            </div>
                        </div>
                    </div>
                    <div id="leftColHide" className="col-md-3 font-weight-bold d-flex flex-column justify-content-start align-items-start"></div>

                    {/* centerColumn */}
                    <Switch>
                        <Route
                            exact path='/'
                            render={() => <Newfeed
                                currentUser={props.currentUser}
                            />}
                        />
                        <Route
                             path='/user/:user_id'
                            render={() => <Profile
                                currentUser={props.currentUser}
                            />}
                        />
                        <Route
                             path='/search/:key'
                            render={() => <Search
                                currentUser={props.currentUser}
                            />}
                        />
                    </Switch>
       
                    {/* rightside */}
                    <div id="rightSideMenu" className="col-lg-3">
                        <div className="trend list-group list-group-flush font-weight-bold">
                            <li className="h4 border-bottom">Who to follow</li>
                            <li className="myLi"><img src="https://i.ya-webdesign.com/images/icon-circle-png-6.png" alt="Avatar" width={35} height="auto" /><span>&nbsp; Huy <small>• 3M followers</small></span><button type="button" className="btn-outline-primary myBtn">Follow</button></li>
                            <li className="myLi"><img src="https://i.ya-webdesign.com/images/icon-circle-png-6.png" alt="Avatar" width={35} height="auto" /><span>&nbsp; Khoa <small>• 1M followers</small></span><button type="button" className="btn-outline-primary myBtn rounded-pill">Follow</button></li>
                            <li className="myLi mt-3"><a href="#">Show more</a></li>
                        </div>
                        <div className="rightFooter">
                            <div className="firstLine">
                                <ul className="ulFoot">
                                    <li><a href="#">Terms</a></li>
                                    <li><a href="#">Privacy policy</a></li>
                                    <li><a href="#">Cookies</a></li>
                                    <li><a href="#">Ads info</a></li>
                                </ul>
                            </div>
                            <div className="secondLine">
                                <ul className="ulFoot">
                                    <li><a href="#">More</a></li>
                                    <li><i className="far fa-copyright" />2019 Flash, Inc.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-0 col-xl-1 placeHolder" />
                </div>
            </main>
        </>
    )
}

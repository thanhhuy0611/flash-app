import React from 'react'
import '../../static/Home.css'
import Newfeed from './Newfeed'

export default function Home() {
    return (
        <>
            <main className="container-fluid main">
                <div className="row">
                    {/* leftside */}
                    <div id="leftSideMenu" className="col-md-3 font-weight-bold d-flex flex-column justify-content-start align-items-start">
                        <div className="twittericon my-2">
                            <img src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" className="birdimg" />
                        </div>
                        <div className="card border-0">
                            <div className="card-body">
                                <h5 className="card-title mb-4"><i className="fas fa-home" onclick="renderTweets(appState.tweets)" />&nbsp; Home</h5>
                                <h5 className="card-title mb-4"><i className="fas fa-hashtag" />&nbsp; Explore</h5>
                                <h5 className="card-title mb-4"><i className="far fa-bell" />&nbsp; Notification</h5>
                                <h5 className="card-title mb-4"><i className="far fa-envelope" />&nbsp; Messages</h5>
                                <h5 className="card-title mb-4"><i className="far fa-bookmark" />&nbsp; Bookmarks</h5>
                                <h5 className="card-title mb-4"><i className="far fa-list-alt" />&nbsp; Lists</h5>
                                <h5 className="card-title mb-4"><i className="fas fa-user-circle" />&nbsp; Profile</h5>
                                <h5 className="card-title mb-4"><i className="fas fa-info-circle" />&nbsp; More</h5>
                                <a href="#" className="btn btn-primary rounded-pill btn-lg largeTweetBtn">Tweet</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 font-weight-bold d-flex flex-column justify-content-start align-items-start"></div>
  
                    {/* centerColumn */}
                    <Newfeed/>

                    {/* rightside */}
                    <div id="rightSideMenu" className="col-lg-3">
                        <div className="input-group my-3">
                            <input className="form-control searchBar" placeholder="Search Tweeter" type="text" />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit"><i className="fas fa-search" /></button>
                            </div>
                        </div>
                        <div className="trend list-group list-group-flush font-weight-bold">
                            <li className="h4 border-bottom">Trends for you</li>
                            <li className="myLi">#Vietnam</li>
                            <li className="myLi">#Hong Kong</li>
                            <li className="myLi">#China</li>
                            <li className="myLi">#Ha Noi</li>
                            <li className="myLi">#CoderSchool</li>
                            <li className="myLi"><a href="#">Show more</a></li>
                        </div>
                        <div className="trend list-group list-group-flush font-weight-bold">
                            <li className="h4 border-bottom">Who to follow</li>
                            <li className="myLi"><img src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg"  alt="Avatar" width={35} height="auto" /><span>&nbsp; Huy <small>• 3M followers</small></span><button type="button" className="btn-outline-primary myBtn">Follow</button></li>
                            <li className="myLi"><img src="https://banner2.cleanpng.com/20180326/jxq/kisspng-the-flash-logo-wall-decal-wallpaper-flash-5ab89520bfea88.3799903215220462407861.jpg" alt="Avatar" width={35} height="auto" /><span>&nbsp; Khoa <small>• 1M followers</small></span><button type="button" className="btn-outline-primary myBtn rounded-pill">Follow</button></li>
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
                                    <li><i className="far fa-copyright" />2019 Twitter, Inc.</li>
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

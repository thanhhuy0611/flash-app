import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';


//import router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";


// import component
import NavBar from './components/NavBar';
import Home from './components/Home/Home'
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Forget from './components/Account/Forget';
import Reset from './components/Account/Reset';

console.log('Environment: ', process.env.REACT_APP_URL)

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [isLogin, setIsLogin] = useState(false)



  const getCurrentUser = async () => {
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?api_key"
        ? window.location.search.split("=")[1]
        : null;
    const token = existingToken || accessToken

    const res = await fetch(process.env.REACT_APP_URL + 'currentuser', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })
    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem('token', token)
      setCurrentUser(data)
      setIsLogin(true)
    } else {
      sessionStorage.clear('token')
      setIsLogin(false)
      setCurrentUser(null)
      alert("Please login again")
    }
  }


  useEffect(() => {
    getCurrentUser()
  }, [])



  // Mouting------------------------
  return (
    <>
      {isLogin ?
        <Router>
          <NavBar
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            currentUser={currentUser}
          />
          <Switch>
            <Route
              exact path='/'
              render={() => <Home
              />}
            />

          </Switch>
        </Router>
        :
        <Router>
          <Switch>
            <Route
              exact path='/'
              render={() => <Login
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />}
            />
            <Route
              path='/signup'
              render={() => <Signup
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />}
            />
            <Route
              path='/forget'
              render={() => <Forget
              />}
            />
            <Route
              path='/reset'
              render={() => <Reset
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />}
            />
          </Switch>
        </Router>
      }

    </>
  );
}

export default App;

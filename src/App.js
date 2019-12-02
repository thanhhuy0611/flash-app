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

function App(props) {
  const [isLogin, setIsLogin] = useState(false)
  const token = sessionStorage.getItem("token")
  useEffect(() => {
    if (token) {
      setIsLogin(true)
    }
  }, [token])
  

  console.log('token', token,'url:', process.env.REACT_APP_URL)
  // Mouting------------------------
  return (
    <>
      {isLogin ?
        <Router>
          <NavBar
            isLogin={isLogin}
            setIsLogin={setIsLogin}
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
          </Switch>
        </Router>
      }

    </>
  );
}

export default App;

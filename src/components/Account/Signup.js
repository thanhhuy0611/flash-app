import React from 'react'
import '../../static/login-signup.css'
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Signup(props) {
    const history = useHistory()
    const [status, setStatus] = useState('')
    const [newAccount, setNewAccount] = useState({})
    const handleOnchange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewAccount({ ...newAccount, [name]: value })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(process.env.REACT_APP_URL + 'signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(
                newAccount
            )
        });
        const data = await res.json()
        if (data.success) {
            setStatus("")
            sessionStorage.setItem('token', data.token)
            props.setIsLogin(true)
            history.push('/')
        }
        else {setStatus(data.status)}
    }

    return (
        <div id='login-table'>
            <form id='login-card' onSubmit={(e) => handleOnSubmit(e)}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>User name</label>
                    <input required onChange={(e) => handleOnchange(e)} name='name' type="text" className="form-control" placeholder="User name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input required onChange={(e) => handleOnchange(e)} name='email' type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input required onChange={(e) => handleOnchange(e)} name='password' type="password" className="form-control" placeholder="Enter password" />
                </div>
                <p className={`mb-4 forgot-password text-center text-danger`}>
                    {status}
                </p>
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <button className="mt-2 btn btn-primary btn-block" onClick={()=>window.location.replace(process.env.REACT_APP_URL +'login/facebook')}>Login with Facebook</button>

                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>
                <p className="forgot-password text-right">
                    Forgot <a href="/forget">password?</a>
                </p>
            </form>
        </div>
    )
}

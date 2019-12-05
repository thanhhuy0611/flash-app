import React from 'react'
import '../../static/login-signup.css'
import { useState, useEffect } from 'react'

export default function Login(props) {
    const [input, setInput] = useState({})
    const handleOnchange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInput({ ...input, [name]: value })
    }
    const doLogin = async (e) => {
        e.preventDefault()
        const res = await fetch(process.env.REACT_APP_URL + 'login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)
        })
        const data = await res.json()
        if (data.success) {
            sessionStorage.setItem('token', data.token)
            props.setIsLogin(true)
        }
        else console.log(data)
    }


    return (
        <div id='login-table'>
            <form onSubmit={(e) => doLogin(e)} id="login-card">
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input name='email' onChange={(e) => handleOnchange(e)} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name='password' onChange={e => handleOnchange(e)} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                <button className="mt-2 btn btn-primary btn-block" onClick={()=>window.location.replace(process.env.REACT_APP_URL +'login/facebook')}>Login with Facebook</button>
                <p className="forgot-password text-right">
                    Forgot <a href="/forget">password?</a>
                </p>
                <p className="forgot-password text-right">
                    You don't have account, <a href="/signup">sign up?</a>
                </p>
            </form>
        </div>

    )
}

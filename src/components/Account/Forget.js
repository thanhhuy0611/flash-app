import React from 'react'
import '../../static/login-signup.css'
import { useState, useEffect } from 'react'

export default function Forget(props) {
    const [email, setEmail] = useState(null)
    const handleOnchange = (e) => {
        setEmail(e.target.value)
    }
    const doLogin = async (e) => {
        e.preventDefault()
        const res = await fetch(process.env.REACT_APP_URL + 'login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email':email})
        })
        const data = await res.json()
        // if (data.success) {
        //     sessionStorage.setItem('token', data.token)
        //     props.setIsLogin(true)
        // }
        // else 
        console.log(data)
    }
    return (
        <div id='login-table'>
            <form onSubmit={(e) => doLogin(e)} id="login-card">
                <h3>Forget password</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input name='email' onChange={(e) => handleOnchange(e)} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <p className="forgot-password text-center">We will send to your email a email to recover your password. Please check your email!</p>
                <button type="submit" className="btn btn-primary btn-block">Send</button>
                <p className="forgot-password text-right">
                    Back to <a href="/">sign in</a>
                </p>
                <p className="forgot-password text-right">
                    You don't have account, <a href="/signup">sign up?</a>
                </p>
            </form>
        </div>
    )
}

import React from 'react'
import '../../static/login-signup.css'
import { useState, useEffect } from 'react'

export default function Forget(props) {
    const [email, setEmail] = useState(null)
    const [status, setStatus] = useState(null)
    const handleOnchange = (e) => {
        setEmail(e.target.value)
    }
    const sendEmail = async (e) => {
        e.preventDefault()
        const res = await fetch(process.env.REACT_APP_URL + 'user/forget', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'email': email })
        })
        const data = await res.json()
        console.log('status', data.status)
        if (data.success) {
            setStatus('Success! Please check your email')
        } else {
            setStatus('Email incorrect! Please try again')
        }
    }
    return (
        <div id='login-table'>
            <form onSubmit={(e) => sendEmail(e)} id="login-card">
                <h3>Forget password</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input name='email' onChange={(e) => handleOnchange(e)} type="email" className="form-control" placeholder="Enter email" />
                </div>

                <p className={`mb-4 forgot-password text-center ${!status?"":(status==='Success! Please check your email'?'text-success':'text-danger')}`}>
                    {status ? status : 'We will send to your email a email to recover your password'}
                </p>
                <button type="submit" className="btn btn-primary btn-block">{status==='Success! Please check your email'?'Resend':'OK'}</button>
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

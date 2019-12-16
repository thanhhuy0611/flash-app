import React from 'react'
import '../../static/login-signup.css'
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Login(props) {
    const history = useHistory()
    const accessToken =
      window.location.search.split("=")[0] === "?api_key"
        ? window.location.search.split("=")[1]
        : null;
    const [status, setStatus] = useState('')
    const [input, setInput] = useState({})
    const handleOnchange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInput({ ...input, [name]: value })
    }
    const doReset = async (e) => {
        e.preventDefault()
        if (input && input.password === input.confirm){
            setStatus("")
            console.log(accessToken)
            const res = await fetch(process.env.REACT_APP_URL + 'user/reset', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Token ${accessToken}`
                },
                body: JSON.stringify(input)
            })
            const data = await res.json()
            if (data.success) {
                sessionStorage.setItem('token', data.token)
                props.setIsLogin(true)
                history.push('/')
            }
            else console.log(data)
        } else {setStatus('Confirm password do not match')}
    }

    return (
        <div id='login-table'>
            <form onSubmit={(e) => doReset(e)} id="login-card">
                <h3>Reset password</h3>
                <div className="form-group">
                    <label>New password</label>
                    <input required name='password' onChange={e => handleOnchange(e)} type="password" className="form-control" placeholder="Enter new password" />
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input required name='confirm' onChange={e => handleOnchange(e)} type="password" className="form-control" placeholder="Confirm password" />
                </div>
                <p className={`mb-4 forgot-password text-center text-danger`}>
                    {status}
                </p>
                <button type="submit" className="btn btn-primary btn-block">Confirm</button>
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

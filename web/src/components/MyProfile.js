import React, { useState } from "react";
import { Nav } from "./Nav";

export const MyProfile = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    async function updateProfile(e) {
        e.preventDefault();
        let acc = {name, email, password}
        let res = await fetch(`/api/v1/auth/update/me`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`},

            body:JSON.stringify(acc)
        })
        
        let data = await res.json()
        console.log(data)
    }

    return(
        <div>
            <Nav/>
            <main>
            <h1>My Profile</h1>
            <form className="login-form" onSubmit={updateProfile}>
                    <label>
                        <span className="email-password">Email</span>
                        <input className="email-password-input" type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    </label>
                    <br />
                    <label>
                        <span className="email-password">Password</span>
                        <input className="email-password-input" type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    </label>
                    <br />
                    <label>
                        <span className="email-password">Name</span>
                        <input className="email-password-input" type="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
                    </label>
                    <br />
                    <button className="sign-in-button" type="submit"><span>UPDATE PROFILE</span></button>
                </form>
            </main>
        </div>
    )
}
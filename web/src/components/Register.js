import React, { useState } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const submit = async (e) => {
        let account = {name, email, password}
        console.log(account);

        try{
            let result = await fetch('/api/v1/auth/register', {
                method: 'POST',
                body: JSON.stringify(account),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if(!result.ok) {
                throw 'Error Signing in'
            }
            result = await result.json()
            localStorage.setItem("user-info", result)
            navigate('/')
        }catch (err) {
            alert(err)
        }
    }

    return(
        <div>
            <main>
           <Nav/>
           <h1>Create Account</h1>
           <div className="login-form">
               <div className="welcome-login">
                    <h4 className="welcome">Create your<h4 className="welcome-baby">account</h4></h4>
                    <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                         making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, 
                         combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. 
                         The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic 
                         words etc.</p>
               </div>
            <form onSubmit={submit}>
            <label>
                <span className="email-password">Full Name:</span>
                <input type='full_name' name='full_name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </label>
            <br/>
            <label>
                <span className="email-password">E-mail:</span>
                <input type='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </label>
            <br/>
            <label>
                <span className="email-password">Password:</span>
                <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </label>
            <br/>
            <button className="sign-in-button" type='submit'><span>Creat Account</span></button>

            </form>
            </div>
            </main>
            <Footer/>
        </div>
    )
}
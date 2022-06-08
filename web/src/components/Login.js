import React, {useState, useEffect} from "react";
import { Nav } from "./Nav";

export const Login = () => {

    const formDataInit = {
        email: String,
        password: String
    }

    const [formData, setFormData] = useState(formDataInit);
    const [loggedIn, setLoggedIn] = useState(false);

    const token = localStorage.getItem('jwt');

    useEffect(()=>{
        if(token === null) {
            setLoggedIn(false)
        }
        if(token) {
            setLoggedIn(true)
        }
        console.log(token)
    },[])

    const submit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try{
            let res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if(!res.ok) {
                throw 'Error Logging in';
            }
            let data = await res.json();
            localStorage.setItem('jwt', data.token);
            if(data.token){
                setLoggedIn(true)
            }
        }catch(err) {
            alert(err);
        }
    };  

    
    const removeToken = () => {
        localStorage.setItem('jwt', null)
        setLoggedIn(false)
        
    }
    
    const inputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div>
            <Nav/>
                {loggedIn === false ? 
            <form onSubmit={submit}>
            <label>
            <span>Username (email)</span>
            <input type="email" name="email" value={formData.email} onChange={inputChange}/>
            </label>
            <br/>
            <label>
                <span>Password</span>
                <input type="password" name="password" value={formData.password} onChange={inputChange}/>
            </label>
            <br/>
            <button type="submit" >Log in</button>

                </form> 

                :
                <div>
                <h1>Logged in</h1> 
                <button onClick={removeToken}>Log Out</button>
                </div>
            }
        </div>
    )
}
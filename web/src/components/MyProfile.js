import React, { useState } from "react";
import { Nav } from "./Nav";


export const MyProfile = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [img, setImg] = useState()

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0])
        setIsFileSelected(true)
        const [file] = event.target.files
        setImg(URL.createObjectURL(file))
        
        }

    async function updateProfile(e) {
        e.preventDefault();
        const formData = new FormData();
                    
                    formData.append('document', selectedFile)
                    
                    let result = await fetch('/api/v1/storage?key=document', 
                    {
                        method: 'POST',
                        body: formData,
                        headers: {
                            authorization: `bearer ${localStorage.getItem("jwt")}`
                            
                        }
                    }
                    )
                    let resp = await result.json()
                    let avatar = resp.file_name
        let acc = {firstName, lastName, email, password, birthDate, avatar}
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
                <div className="login-form">
            <form className="login-form" onSubmit={updateProfile}>
                <div className="welcome-login">
            <label className="img-label">
                        <span>Recipe Image</span>
                        <img className="selected-img" src={img} alt=""/>
                        <label className="choose-file-button">
                            <span className="select-img-span">Select Image</span>
                        <input className="choose-img" type='file' name='file' onChange={changeHandler}/>
                        </label>
                    </label>
                    <br/>
                </div>

                <div className="register-form">
                    <label>
                        <span className="email-password">First Name</span>
                        <input className="email-password-input" type="text" name="email" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
                    </label>
                    <br />
                    <label>
                        <span className="email-password">Last Name</span>
                        <input className="email-password-input" type="text" name="password" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
                    </label>
                    <br />
                    <label>
                        <span className="email-password">Email</span>
                        <input className="email-password-input" type="name" name="name" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    </label>
                    <br />
                    <label>
                        <span className="email-password">Birthday</span>
                        <input className="email-password-input" type="name" name="name" value={birthDate} onChange={(e)=>{setBirthDate(e.target.value)}} />
                    </label>
                    <br />
                </div>
                    <button className="sign-in-button" type="submit"><span>UPDATE PROFILE</span></button>
                </form>
                    </div>
            </main>
        </div>
    )
}
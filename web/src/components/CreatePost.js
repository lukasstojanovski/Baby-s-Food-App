import React, { useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import {ReactComponent as ArrowBack} from '../photos/Archive (1)/icon_back_white.svg'
import "../css/createPost.css"

export const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('Breakfast')
    const [time, setTime] = useState('')
    const [people, setPeople] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [bestServed, setBestServed] = useState('')

    const submit = async () => {
        let data = {title, photo, content, type, time, people, shortDescription, bestServed}
        fetch('/api/v1/blog/', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`
            }
        })
        .then((resp => {
            resp.json().then((result)=>{
                console.log(result)
            })
        }))
    }
    
    return(
        <div>
            <main>
                <Nav/>
                <div className="add-post">
                <h1>Create Post</h1>
                <button className="add-post-btn"><Link to='/my-recipes'><ArrowBack/></Link></button>
                </div>
                <form className="create-post-form" onSubmit={submit}>
                    <div className="link-img">

                <label >
                        <span>Link of Recipe Image</span>
                        <input type='photo' name='photo' onChange={(e)=>{setPhoto(e.target.value)}}/>
                    </label>
                    </div>
        
                    <div className="middle-container">

                    <label>
                        <span>Recipe Title</span>
                        <input type="title" name='title' placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}/>
                    </label>
                    <br />
                    
                    

                    <div className="category-time-people">

                    <label>
                        <span>Category</span>
                        <select type="type" name='type' onChange={(e)=>{setType(e.target.value)}}>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Brunch">Brunch</option>
                            <option value="Lunch">Lunch</option>
                            </select>
                    </label>
                    <label className="time">
                        <span>Preparation time</span>
                        <input className="people-time" placeholder="In Minutes" type="number" name='time' onChange={(e)=>{setTime(e.target.value)}}/>
                    </label>
                    <label className="people">
                        <span>No. people</span>
                        <input className="people-time" type="number" name='people' placeholder="Number of people" onChange={(e)=>{setPeople(e.target.value)}}/>
                    </label>
                    <br />
                    </div>
                    <label>
                        <span>Best served with</span>
                        <input type="bestServed" name='bestServed' placeholder="Best served with" onChange={(e)=>{setBestServed(e.target.value)}}/>
                    </label>
                    <br />

                    <label>
                        <span>Short desription</span>
                        <textarea className="short-description" type="shortDescription" name='shortDescription' placeholder="A short description about the recipe" onChange={(e)=>{setShortDescription(e.target.value)}}/>
                    </label>
                    

                    <button className="sign-in-button" type="submit"><span className="button-span">SAVE</span></button>
                    </div>
                    <div>

                    <label>
                        <span>Recipe</span>
                        <textarea type="content" name='content' placeholder="Recipe" onChange={(e)=>{setContent(e.target.value)}}/>
                    </label>
                    </div>
                </form>
            </main>
            <Footer/>
        </div>
    )
}
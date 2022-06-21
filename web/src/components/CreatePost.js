import React, { useState } from "react";
import { Nav } from "./Nav";
import { Link } from "react-router-dom";
import {ReactComponent as ArrowBack} from '../photos/Archive (1)/icon_back_white.svg'

export const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('')
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
                'Accept': 'application/json'
            }
        }).then((resp => {
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
                <div>
                <form onSubmit={submit}>
                    <label>
                        <span>Recipe Title</span>
                        <input type="title" name='title' onChange={(e)=>{setTitle(e.target.value)}}/>
                    </label>
                    <br />
                    <label>
                        <span>Link of Recipe Image</span>
                        <input type='link' name='photo'onChange={(e)=>{setPhoto(e.target.value)}}/>
                    </label>
                    <br />
                    <label>
                        <span>Short desription</span>
                        <input type="shortDescription" name='shortDescription' onChange={(e)=>{setShortDescription(e.target.value)}}/>
                    </label>
                    <label>
                        <span>Recipe</span>
                        <input type="content" name='content' onChange={(e)=>{setContent(e.target.value)}}/>
                    </label>
                    <label>
                        <span>Category</span>
                        <select type="type" name='type' onChange={(e)=>{setType(e.target.value)}}>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Brunch">Brunch</option>
                            <option value="Lunch">Lunch</option>
                            </select>
                    </label>
                    <label>
                        <span>Preparation time</span>
                        <input placeholder="In minutes" type="text" name='time' onChange={(e)=>{setTime(e.target.value)}}/>
                    </label>
                    <label>
                        <span>No. people</span>
                        <input type="people" name='people' onChange={(e)=>{setPeople(e.target.value)}}/>
                    </label>
                    <br />
                    <label>
                        <span>Best served with</span>
                        <input type="bestServed" name='bestServed' onChange={(e)=>{setBestServed(e.target.value)}}/>
                    </label>
                    <br />
                    <button className="sign-in-button" type="submit"><span>SAVE</span></button>
                </form>
                </div>
            </main>
        </div>
    )
}
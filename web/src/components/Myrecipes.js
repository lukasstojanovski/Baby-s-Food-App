import React, { useState, useEffect } from "react";
import { Nav } from "./Nav";
import '../css/my-recipes.css'
import {ReactComponent as IconTrashcan} from '../photos/Archive (1)/icon_trashcan.svg'
import {ReactComponent as WhitePlus} from '../photos/Archive (1)/icon_plus_white.svg'
import { Footer } from "./Footer";
import { Link } from "react-router-dom";
import {ReactComponent as ArrowBack} from '../photos/Archive (1)/icon_back_white.svg'

export const Myrecipes = () => {

    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState("")
    const [postId, setPostId] = useState("")
    const [isPostSelected, setIsPostSelected] = useState(false)
    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('Breakfast')
    const [time, setTime] = useState('')
    const [people, setPeople] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [bestServed, setBestServed] = useState('')
    const [selectedFile, setSelectedFile] = useState()
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [img, setImg] = useState()

    
    useEffect(()=>{
        getPosts()
    },[])

    const changeHandler = async (event) => {
        setSelectedFile(event.target.files[0])
        setIsFileSelected(true)
        const [file] = event.target.files
        setImg(URL.createObjectURL(file))
    }
    
    async function deletePost(id) {
        let res = await fetch('/api/v1/blog/'+id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`}
        })
        res = await res.json()
        getPosts();
        console.log(res)
    }
    
    const getPosts = async () => {
        try {
            let res = await fetch('/api/v1/blog', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    authorization: `bearer ${localStorage.getItem("jwt")}`}
            });
            let data = await res.json();
            setPosts(data);
            setPostId(data[0]._id)
            setTitle(data[0].title)
            setContent(data[0].content)
            setBestServed(data[0].bestServed)
            setPhoto(data.photo)
            setType(data.type)
            setTime(data.time)
            setPeople(data.people)
            setShortDescription(data.shortDescription)
            console.log(data)
        } catch (err) {
            console.log(err);
        }
    };

    const updatePost = async (id) => {
        // const formData = new FormData();

        // formData.append('document', selectedFile)

        // let result = await fetch('/api/v1/storage?key=document', 
        // {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         authorization: `bearer ${localStorage.getItem("jwt")}`

        //     }
        // }
        // )
        // let info = await result.json()
        // let photo = info.file_name

        let recipe = {title, content, photo, type, time, people, shortDescription, bestServed }
        console.log(recipe)
        console.log(id)
        let res = await fetch(`/api/v1/blog/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem("jwt")}`},
            body: JSON.stringify(recipe)
            })
            
            let data = await res.json()
            console.log(data)
 
        }
        
        const selectPost = (post) => {
            console.log("function called", post)
            setIsPostSelected(true)
            setPostId(post._id)
            setTitle(post.title)
            setContent(post.content)
            setBestServed(post.bestServed)
            setPhoto(post.photo)
            setType(post.type)
            setTime(post.time)
            setPeople(post.people)
            setShortDescription(post.shortDescription)
    }
    

    return(
        <div>
            <Nav/>
            {isPostSelected ? <main>
                <div className="add-post">
                <h1>Update Recipe</h1>
                <button className="add-post-btn" onClick={()=>{setIsPostSelected(false)}}><a><ArrowBack/></a></button>
                </div>
                <form className="create-post-form" onSubmit={updatePost(postId)}>
                    <div className="link-img">

                <label className="img-label">
                        <span>Recipe Image</span>
                        {isFileSelected ? 
                        <img className="selected-img" src={img} alt=""/> :
                        <img className="selected-img" src={`/api/v1/storage/${photo}`} alt=""/>}
                        <label className="choose-file-button">
                            <span className="select-img-span">Select Image</span>
                        <input className="choose-img" type='file' name='file' onChange={changeHandler}/>
                        </label>
                    </label>
                        
                    </div>
        
                    <div className="middle-container">

                    <label>
                        <span>Recipe Title</span>
                        <input type="title" name='title' placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                    </label>
                    <br />
                    
                    

                    <div className="category-time-people">

                    <label>
                        <span>Category</span>
                        <select type="type" name='type' value={type} onChange={(e)=>{setType(e.target.value);}}>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Brunch">Brunch</option>
                            <option value="Lunch">Lunch</option>
                            </select>
                    </label>
                    <label className="time">
                        <span>Preparation time</span>
                        <input className="people-time" placeholder="In Minutes" type="number" name='time' value={time} onChange={(e)=>{setTime(e.target.value)}}/>
                    </label>
                    <label className="people">
                        <span>No. people</span>
                        <input className="people-time" type="number" name='people' placeholder="Number of people" value={people} onChange={(e)=>{setPeople(e.target.value)}}/>
                    </label>
                    <br />
                    </div>
                    <label>
                        <span>Best served with</span>
                        <input type="bestServed" name='bestServed' placeholder="Best served with" value={bestServed} onChange={(e)=>{setBestServed(e.target.value)}}/>
                    </label>
                    <br />

                    <label>
                        <span>Short desription</span>
                        <textarea className="short-description" type="shortDescription" name='shortDescription' value={shortDescription} onChange={(e)=>{setShortDescription(e.target.value)}}/>
                    </label>
                    

                    <button className="sign-in-button" onClick={()=>{updatePost(postId)}}><span className="button-span">SAVE</span></button>
                    </div>
                    <div>

                    <label>
                        <span>Recipe</span>
                        <textarea type="content" name='content' placeholder="Recipe" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
                    </label>
                    </div>
                </form>
            </main> : 
        <main>
            <div className="add-post">
            <h1>My recipes</h1>
            <button className="add-post-btn"><Link to="/create-post"><WhitePlus/></Link></button>
            </div>
            {posts.length > 0 ?
                <table border='0'>
                <thead>
                <tr>
                <th><span>Recipe Name</span></th>
                <th><span>Category</span></th>
                <th><span>Created on</span></th>
                <th><span>Delete</span></th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post=>{
                    return(
                        <tr onClick={()=>{selectPost(post)}}>   
                        <td><span>{post.title}</span></td>
                        <td><span className="category">{post.type}</span></td>
                        <td><span>{post.publishDate}</span></td>
                        <td><button className="delete-btn" onClick={()=>{deletePost(post._id); window.location.reload()}}><IconTrashcan/></button></td>
                    </tr>
                        )
                    })
                }
                    
                </tbody>
            </table> 
            
            : <p>No posts yet</p>}
            
            
            
        </main>
        }
        <Footer/>
        </div>
    )
    }
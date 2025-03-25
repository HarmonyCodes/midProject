import { useEffect, useState } from "react";
import '../model.css'
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import Axios from "axios"
import AddPost from "./AddPost"
import UpdatePost from "./UpdatePost";
const DeletePost= ({post, onDelete})=>{
    const handleDelete= async()=>{
        const{data:responseData}= await Axios.delete("http://localhost:1234/Posts/", {
            data:{id:post._id}
        })
        console.log(responseData)
        if (onDelete) onDelete()
    }
    return<div>
        <Button onClick={handleDelete} aria-label="Cancel" icon="pi pi-trash" className="delete"/>
    </div>
}
const AllPosts=()=>{
    const [posts, setPosts]= useState([])
    const fetchPosts= async()=>{
        const {data}= await Axios.get("http://localhost:1234/Posts/")
        setPosts(data)
    }
    useEffect(()=>{
        fetchPosts()
    }, [])
    if(posts.length===0) return <h2>no posts</h2>
    return <>
    <div className="models">
        <AddPost onAdd={fetchPosts} />
        {posts.map((post, index)=>{
            return <div>
                {post.title}
                <UpdatePost onUpdate={fetchPosts} Id={post._id} />
                <DeletePost onDelete={fetchPosts} post={post}/>
                </div>
        })}
    </div>
    </>
}
export default AllPosts
import {useState} from "react"
import Axios from "axios"
const UpdatePhoto=({onUpdate, Id})=>{
    const [title, setTitle]= useState("")
    const [imageUrl, setImageUrl]= useState("")

    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.put("http://localhost:1234/Photos/", {_id:Id,title, imageUrl})
        console.log(data)
        if (onUpdate) onUpdate();
        setTitle("");
        setImageUrl("");
    }
    return<>
    <form onSubmit={submitForm}>
    <input
        value={title}
        placeholder="Add title"
        onChange={(e)=>setTitle(e.target.value)}/>
        <input
        value={imageUrl}
        placeholder="Add imageUrl"
        onChange={(e)=>setImageUrl(e.target.value)}/>

        <button type="submit">save</button>
    </form>
    
    </>
}
export default UpdatePhoto
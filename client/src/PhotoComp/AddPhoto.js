import {useState} from "react"
import Axios from "axios"
const AddPhoto=({onAdd})=>{
    const [title, setTitle]= useState("")
    const [imageUrl, setImageUrl]= useState("")
    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.post("http://localhost:1234/Photos/", {title, imageUrl})
        console.log(data)
        if (onAdd) onAdd()
        setTitle("")
        setImageUrl("")
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
export default AddPhoto
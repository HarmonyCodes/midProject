import { useEffect, useState } from "react";
//import '../model.css'
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import Axios from "axios"
import AddPhoto from "./AddPhoto";
import UpdatePhoto from "./UpdatePhoto";
const DeletePhoto= ({photo, onDelete})=>{
    const handleDelete= async()=>{
        const{data:responseData}= await Axios.delete("http://localhost:1234/Photos/", {
            data:{id:photo._id}
        })
        console.log(responseData)
        if (onDelete) onDelete()
    }
    return<div>
        <Button onClick={handleDelete} >delete</Button>
    </div>
}
const AllPhotos=()=>{
    const [photos, setPhotos]= useState([])
    const fetchPhotos= async()=>{
        const {data}= await Axios.get("http://localhost:1234/Photos/")
        setPhotos(data)
    }
    useEffect(()=>{
        fetchPhotos()
    }, [])
    if(photos.length===0) return <h2>no photos</h2>
    return <>
    <div>
        <AddPhoto onAdd={fetchPhotos} />
        {photos.map((photo, index)=>{
            return <div>
                {photo.title}
                <img src={`/images/${photo.imageUrl}`} alt="תמונה" />
                <UpdatePhoto onUpdate={fetchPhotos} Id={photo._id} />
                <DeletePhoto onDelete={fetchPhotos} photo={photo}/>
                </div>
        })}
    </div>
    </>
}
export default AllPhotos
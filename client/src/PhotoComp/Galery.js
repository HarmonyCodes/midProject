import { useEffect, useState } from "react";
import '../model.css'
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import Axios from "axios"
import AddPhoto from "./AddPhoto";
import UpdatePhoto from "./UpdatePhoto";
const DeletePhoto= ({Id, onDelete})=>{
    const handleDelete= async()=>{
        const{data:responseData}= await Axios.delete("http://localhost:1234/Photos/", {
            data:{id:Id}
        })
        console.log(responseData)
        if (onDelete) onDelete()
    }
    return<div>
        <Button onClick={handleDelete} aria-label="Cancel" icon="pi pi-trash" iconPos="center" className="delete"/>
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
            return <div style={{ backgroundColor: '#a0bc9c'}} className="item">
                {photo.title}
                <br/>
                <img src={`/images/${photo.imageUrl}`} alt="תמונה" />
                <br/>
                <UpdatePhoto onUpdate={fetchPhotos} Id={photo._id} />
                <DeletePhoto onDelete={fetchPhotos} Id={photo._id}/>
                </div>
        })}
    </div>
    </>
}  
export default AllPhotos
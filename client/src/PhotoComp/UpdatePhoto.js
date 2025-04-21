import {useState} from "react"
import Axios from "axios"
import { Button } from "primereact/button"
import '../model.css'
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext'; 
import { FloatLabel } from 'primereact/floatlabel';
const UpdatePhoto=({onUpdate, Id})=>{
    const [title, setTitle]= useState("")
    const [imageUrl, setImageUrl]= useState("")
    const [showForm, setShowForm] = useState(false);

    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.put("http://localhost:1234/Photos/", {_id:Id,title, imageUrl})
        console.log(data)
        if (onUpdate) onUpdate();
        setTitle("");
        setImageUrl("");
        setShowForm(false);
    }
    return<>
    <Button onClick={() => setShowForm(!showForm)} icon="pi pi-pencil" className="update"/>
    {showForm && (
    <form onSubmit={submitForm}>
    <InputText
        value={title}
        placeholder="Add title"
        onChange={(e)=>setTitle(e.target.value)}/>
        <InputText
        value={imageUrl}
        placeholder="Add imageUrl"
        onChange={(e)=>setImageUrl(e.target.value)}/>

<Button type="submit"  icon="pi pi-save" className="save"/>
</form>
    )}
    </>
}
export default UpdatePhoto
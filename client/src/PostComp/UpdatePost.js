import {useState} from "react"
import Axios from "axios"
import { Button } from "primereact/button"
import '../model.css'
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext'; 
import { FloatLabel } from 'primereact/floatlabel';
const UpdatePost=({onUpdate, Id})=>{
    const [title, setTitle]= useState("")
    const [body, setBody]= useState("")
    const [showForm, setShowForm] = useState(false);

    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.put("http://localhost:1234/Posts/", {_id:Id,title, body})
        console.log(data)
        if (onUpdate) onUpdate();
        setTitle("");
        setBody("");
        setShowForm(false);
    }
    return        <>
    
    <Button onClick={() => setShowForm(!showForm)} icon="pi pi-pen-to-square" className="update"/>

    {showForm && ( 
        <form onSubmit={submitForm}>

            <FloatLabel>
            <InputText
                value={title}
                placeholder="Add title"
                onChange={(e) => setTitle(e.target.value)}
            />
            </FloatLabel>
            <FloatLabel>
            <InputText
                value={body}
                placeholder="Add body"
                onChange={(e) => setBody(e.target.value)}
            />
            </FloatLabel>
            <Button type="submit"  icon="pi pi-save" className="save"/>
        </form>
    )}
</>
}
export default UpdatePost
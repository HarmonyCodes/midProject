import {useState} from "react"
import Axios from "axios"
import '../model.css'
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
const AddPhoto=({onAdd})=>{
    const [title, setTitle]= useState("")
    const [imageUrl, setImageUrl]= useState("")
    const [showForm, setShowForm] = useState(false);
    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.post("http://localhost:1234/Photos/", {title, imageUrl})
        console.log(data)
        if (onAdd) onAdd()
        setTitle("")
        setImageUrl("")
        setShowForm(false);
    }
    return<>
            <Button onClick={() => setShowForm(!showForm)} icon="pi pi-plus" className="add" />

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
                        value={imageUrl}
                        placeholder="Add imageUrl"
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    </FloatLabel>
                    <Button type="submit"  icon="pi pi-save" className="save"/>
                </form>
            )}
    
    </>
}
export default AddPhoto
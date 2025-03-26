import {useState} from "react"
import Axios from "axios"
import { Button } from "primereact/button"
import '../model.css'
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext'; 
import { FloatLabel } from 'primereact/floatlabel';
const UpdateTodo=({onUpdate, Id})=>{
    const [title, setTitle]= useState("")
    const [tags, setTags]= useState([])
    const [showForm, setShowForm] = useState(false);

    const handleTagsInput = (e) => {
        const tagsArray = e.target.value.split(",").map(tag => tag.trim()); 
        setTags(tagsArray);}

    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.put("http://localhost:1234/Todos/", {id:Id,title, tags})
        console.log(data)
        if (onUpdate) onUpdate();
        setTitle("");
        setTags([]);
        setShowForm(false);
    }
    return<>
        <Button onClick={() => setShowForm(!showForm)} icon="pi pi-pen-to-square" className="update"/>
    {showForm && (
    <form onSubmit={submitForm}>
        <FloatLabel>
    <InputText
        value={title}
        placeholder="Add title"
        onChange={(e)=>setTitle(e.target.value)}/></FloatLabel>
        <FloatLabel>
                <InputText
          value={tags.join(", ")} 
          placeholder="Add tags"
          onChange={handleTagsInput} 
        /></FloatLabel>

<Button type="submit"  icon="pi pi-save" className="save"/>

    </form>
    )}
    </>
}
export default UpdateTodo
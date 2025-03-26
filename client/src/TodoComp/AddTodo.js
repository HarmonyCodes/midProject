import {useState} from "react"
import Axios from "axios"
import '../model.css'
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
const AddTodo=({onAdd})=>{
    const [title, setTitle]= useState("")
    const [tags, setTags]= useState([])
    const [showForm, setShowForm] = useState(false);
    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.post("http://localhost:1234/Todos/", {title, tags})
        console.log(data)
        if(onAdd) onAdd()
        setTitle("")
        setTags([])
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
        value={tags}
        placeholder="Add tags"
        onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
/>
</FloatLabel>
<Button type="submit"  icon="pi pi-save" className="save"/>
    </form>
    )}
    </>
}
export default AddTodo
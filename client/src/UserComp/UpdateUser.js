import {useState} from "react"
import Axios from "axios"
import { Button } from "primereact/button"
import '../model.css'
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext'; 
import { FloatLabel } from 'primereact/floatlabel';
const UpdateUser=({onUpdate, Id})=>{
    const [name, setName]= useState("")
    const [email, setEmail]= useState("")
    const [address, setAddress]= useState("")
    const [phone, setPhone]= useState("")
    const [showForm, setShowForm] = useState(false);

    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.put("http://localhost:1234/Users/", {id:Id,name, email, address, phone})
        console.log(data)
        if (onUpdate) onUpdate();
        setName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setShowForm(false);
    }
    return<>
    <Button onClick={() => setShowForm(!showForm)} icon="pi pi-pen-to-square" className="update"/>
    {showForm && (
    <form onSubmit={submitForm}>
        <FloatLabel>
    <InputText
        value={name}
        placeholder="Add name"
        onChange={(e)=>setName(e.target.value)}/></FloatLabel>
        <FloatLabel>
        <InputText
        value={email}
        placeholder="Add email"
        onChange={(e)=>setEmail(e.target.value)}/></FloatLabel>
        <FloatLabel>
        <InputText
        value={address}
        placeholder="Add address"
        onChange={(e)=>setAddress(e.target.value)}/></FloatLabel>
        <FloatLabel>
        <InputText
        value={phone}
        placeholder="Add phone"
        onChange={(e)=>setPhone(e.target.value)}/></FloatLabel>
    <Button type="submit"  icon="pi pi-save" className="save"/>
    </form>
    )}
    </>
}
export default UpdateUser
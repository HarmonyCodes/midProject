import {useState} from "react"
import Axios from "axios"
import '../model.css'
import 'primeicons/primeicons.css';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
const AddUser=({onAdd})=>{
    const [name, setName]= useState("")
    const [username, setUsername]= useState("")
    const [email, setEmail]= useState("")
    const [address, setAddress]= useState("")
    const [phone, setPhone]= useState("")
    const [showForm, setShowForm] = useState(false);
    const submitForm= async(e)=>{
        e.preventDefault()
        const {data}= await Axios.post("http://localhost:1234/Users/", {name,username, email, address,phone})
        console.log(data)
        if (onAdd) onAdd();
        setName("");
        setUsername("");
        setEmail("");
        setAddress("");
        setPhone("");
        setShowForm(false);
    }
    return<>
    <Button onClick={() => setShowForm(!showForm)} icon="pi pi-plus" className="add" />
    {showForm && (
    <form onSubmit={submitForm}>
        <FloatLabel>
        <InputText
        value={name}
        placeholder="Add name"
        onChange={(e)=>setName(e.target.value)}/></FloatLabel>
        <FloatLabel>
        <InputText
        value={username}
        placeholder="Add username"
        onChange={(e)=>setUsername(e.target.value)}/></FloatLabel>
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
export default AddUser
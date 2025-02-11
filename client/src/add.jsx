import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import "./add.css";
function Form(){
    const {id} = useParams();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState();

    const navigate = useNavigate();

    const addToDo = (input) =>{
        input.preventDefault();
        axios.post(`http://localhost:8080/todo/${id}`, {user_id: id, title, description, status})
        .then((res)=>{
            console.log(res.data.message);
            console.log("Result:", res.data);
            navigate(`/home/${id}`);
        })
        .catch((err)=>{
            console.log("Error: ", err);
        })
    }
    return(
        <div>
            <div className="form-container">
                
                <form onSubmit={addToDo}>
                <h2>Add new To Do</h2>
                    <label for="title">Title</label><br></br>
                    <input type="text" name="title" id="title" placeholder="Enter the title of ToDo" required onChange={(e)=>setTitle(e.target.value)}></input><br></br>
                    <label for="description">Description</label><br></br>
                    <textarea name="description" id="description" rows={4} placeholder="(Optional)" onChange={(e)=>setDescription(e.target.value)}></textarea><br></br>
                    <label>Status</label><br></br>
                    <input type="radio" name="status" id="in-progress" value="In-progress" onChange={(e)=>setStatus(e.target.value)}></input>
                    <label htmlFor="in-progress">In-progress</label><br></br>
                    <input type="radio" name="status" id="pending" value="Pending" onChange={(e)=>setStatus(e.target.value)}></input>
                    <label htmlFor="pending">Pending</label><br></br>
                    <button class="add">Add To Do</button>
                </form>
            </div>
        </div>
    )
}

export default Form;
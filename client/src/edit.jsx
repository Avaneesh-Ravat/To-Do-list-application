import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit(){
    const { id, taskId } = useParams(); // Get user ID and task ID from URL
    const navigate = useNavigate();
    
    const [task, setTask] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/todo/${id}/${taskId}`)
            .then((res) => {
                setTask(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log("Error fetching task:", err));
    }, [id, taskId]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/todo/${id}/${taskId}`, task);
            navigate(`/home/${id}`);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div>
            <div class="form-container">
                <form onSubmit={submitForm}>
                <h2>Edit Task</h2>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={task?.title} onChange={handleChange} required />

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={task?.description} onChange={handleChange} ></textarea>
                    
                    <label>Status</label><br></br>
                    <input type="radio" name="status" id="in-progress" value="In-progress" checked={task?.status == "In-progress"}  onChange={handleChange}></input>
                    <label htmlFor="in-progress">In-progress</label><br></br>
                    <input type="radio" name="status" id="pending" value="Pending" checked={task?.status == "Pending"} onChange={handleChange}></input>
                    <label htmlFor="pending">Pending</label><br></br>
                    <input type="radio" name="status" id="completed" value="Completed" onChange={handleChange}></input>
                    <label htmlFor="completed">Completed</label><br></br>
                    <button class="add">Update Task</button>
                    
                </form>
            </div>
        </div>

    );
}

export default Edit;
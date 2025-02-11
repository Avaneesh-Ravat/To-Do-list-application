import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import "./home.css";

function List(){
    const {id} = useParams();
    const[task, setTask] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:8080/home/${id}`)
        .then((res)=>{
            console.log(res.data);
            setTask(res.data)
            console.log(task);
        }).catch((err)=>{
            console.log("Error fetching user:    ", err);
        });
    }, [id]);

    useEffect(() => {
        console.log("Updated Task State:", task);
    }, [task]); 

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8080/todo/${id}/${taskId}`);
            setTask(task.filter(t => t._id !== taskId));
            alert("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task.");
        }
    };

    return(
        <div>
            <h2>Welcome, here is your all to-do</h2>
            <button class="add">
                <Link to={`/todo/${id}`}>Add todo</Link>
            </button>
            <div class="cards-container">
                {task?.map((t, index) => (
                    <div class="card" key={index}>
                        {t.status === "Completed" && (
                            <p class="mark">Completed</p>
                        )}
                        <h3>{t.title}: </h3>
                        <p>{t.description}</p>
                        <p><h3>Status: </h3>{t.status}</p>
                        <button onClick={() => handleDelete(t._id)} style={{color: "red" }}>
                            Delete
                        </button>
                        {t.status !== "Completed" && (
                            <button onClick={()=> navigate(`/edit/${t.user_id}/${t._id}`)}>
                            Edit
                        </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

function Home(){

    return (
        <>
            <List />
        </>
    );
}

export default Home;
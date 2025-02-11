import axios from 'axios';
import {useState} from 'react';
import{Link, useNavigate} from 'react-router-dom';
import "normalize.css"
import "./register.css"
function Register(){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const submitForm = (input) =>{
        input.preventDefault();
        axios.post("http://localhost:8080/register", {name, email, password})
        .then((res)=>{
            console.log(res.data.message);
            let id = res.data.userId;
            console.log("Result:", res.data);
            navigate(`/home/${id}`);
        })
        .catch((err)=>{
            console.log("Error: ", err);
        })
    }

    return(
        <div class="form-container">
            <h2>Hey, let me help you to manage your To-Do</h2>
            <form onSubmit={submitForm}>
                <label for="name">Name:</label><br></br>
                <input type="text" name="name" id="name" placeholder="Enter Name" onChange={(input)=>setName(input.target.value)}></input><br></br>
                <label for="email">Email:</label><br></br>
                <input type="email" name="email" id="email" placeholder="Enter Email" onChange={(input)=>setEmail(input.target.value)}></input><br></br>
                <label for="password">Passowrd:</label><br></br>
                <input type="password" name="password" id="password" placeholder="Enter Password" onChange={(input)=>setPassword(input.target.value)}></input><br></br>
                <button>Sign up</button>
            </form>
            <div className="login">
                <p>Already have account?</p>
            <Link to="/">Login</Link>
            </div>
        </div>
    )
}

export default Register;
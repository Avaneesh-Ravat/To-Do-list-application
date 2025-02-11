import axios from 'axios';
import {useState} from 'react';
import{Link, useNavigate} from 'react-router-dom';

function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const submitForm = (input) =>{
        input.preventDefault();
        axios.post("http://localhost:8080/login", {email, password})
        .then((res)=>{
            console.log(res.data.message);
            let id = res.data.userId;
            console.log("Result:", res.data);
            navigate(`/home/${id}`);
        })
        .catch((err)=>{
            console.log("Error: ", err);
            navigate('/register');
        })
    }

    return(
        <div>
            <div className="form-container">
                <form onSubmit={submitForm}>
                    <label for="email">Email:</label><br></br>
                    <input type="email" name="email" id="email" placeholder="Enter Email" onChange={(input)=>setEmail(input.target.value)}></input><br></br>
                    <label for="password">Passowrd:</label><br></br>
                    <input type="password" name="password" id="password" placeholder="Enter Password" onChange={(input)=>setPassword(input.target.value)}></input><br></br>
                    <button>Sign up</button>
                </form>
                
                <div className="login">
                    <p>Don't have account?</p>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
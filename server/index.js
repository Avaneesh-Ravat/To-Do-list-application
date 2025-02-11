const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ToDo = require("./models/toDoSchema.js");
const User = require("./models/userSchema.js");
const app = express();

app.use(express.json());
app.use(cors());


async function connection(){
    await mongoose.connect("mongodb+srv://2021bcs128:Avaneesh128@todolist.tkb28.mongodb.net/?retryWrites=true&w=majority&appName=todoList");
}
 
connection().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

app.post('/register', async(req, res)=>{
    let {name, email, password} = req.body;
    const newUser = new User({name:name, email:email, password:password});

    await newUser.save();
    res.status(201).json({
        success: true, 
        message: "Registration successful!", 
        userId: newUser._id
    });

})


app.post('/login', async(req, res)=>{
    let{email, password} = req.body;
    try{
        const user = await User.findOne({email: email, password: password});
        res.json({success: true, message: "login successful", userId: user._id});
    }catch(err){
        res.status(404).json({message: "User no found"});
    }
});

app.get("/home/:id", async(req, res)=>{
    let {id} = req.params; 
    try{
        const user = await User.findOne({_id: id});
        console.log(user);
        if(user){
            const todos = await ToDo.find({user_id: id});
            console.log(todos);
            res.json(todos);
        }
        else{
            res.status(404).json({message: "User not found"});
        }
    }
    catch(error){
        console.log(error);
        res.status(404).json({message: "User not found...."});
    }
});



app.post("/todo/:id", async(req, res)=>{
    let {id} = req.params; 
    let {title, user_id, description, status} = req.body;
    try{
        const task = new ToDo({title, user_id, description, status});
        task.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
        res.redirect(`/home/${id}`);
         
    }
    catch(error){
        console.log(error);
        res.status(404).json({message: "User not found...."});
    }
});

app.delete("/todo/:id/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        await ToDo.findByIdAndDelete(taskId);
        res.json({ message: "Task deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
        console.log(error);
    }
});


app.get("/todo/:id/:taskId", async (req, res) => {
    let {id, taskId} = req.params;
    try {
        const task = await ToDo.findById(taskId);
        console.log(task);
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error fetching task" });
    }
});

app.put("/todo/:id/:taskId", async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const updatedTask = await ToDo.findByIdAndUpdate(
            req.params.taskId,
            { title, description, status },
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Error updating task" });
    }
});


app.listen(8080, ()=>{
    console.log("App is listening on 8080");
});
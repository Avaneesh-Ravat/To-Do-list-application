const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    status:{
        type: String,
        required: true,
    }

});

const ToDo = mongoose.model("ToDo", toDoSchema);
module.exports = ToDo;
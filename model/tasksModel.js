const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName : {
        type : String,
        required : true,
        unique: true
    },
    Finalized : Boolean
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;

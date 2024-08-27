const task = require("../model/tasksModel");

//GETS TASKS
exports.getAllTasks = async (req, res)=>{
    try{
        const taskList = await task.find();
        res.json(taskList);
    }
    catch(error){
        res.status(500).json({
            "error" : "An error has occured!"
        });
    }
}

//ADDS TASK
exports.addTask = async (req, res) => {
    try{
        const TaskName = req.params.id;
        const Task = new task({taskName : TaskName, Finalized : false});
        const savedTask = await Task.save();
        res.status(201).json(savedTask);
    }
    catch (err){
        //console.log(err)
        res.status(500).json({
            error : "An error has occured!"
        });
    }
}

//REMOVES TASKS (either by name or removes them all)
async function deleteTaskUsingFilter(req, res, useFilterName) {
    try{
        let deletedTasks = null;
        if (useFilterName == true){
            const TaskName = req.params.id;
            deletedTasks = await task.deleteMany({taskName: TaskName});
        }
        else{
            deletedTasks = await task.deleteMany({});
        }

        if(!deletedTasks)
            return res.status(404).json({error: "Tasks not found!"});
        return res.status(201).json(deletedTasks);
    }
    catch(err){
        return res.status(500).json({
            error : "An error has occured!"
        });
    }
}

exports.deleteTaskByName = async (req, res) => {
    return await deleteTaskUsingFilter(req, res, true);
}

exports.deleteAllTasks = async (req, res) => {
    return await deleteTaskUsingFilter(req, res, false);
}

//switches task finalization
exports.switchTaskByName = async (req, res) => {
    try{
        const TaskName = req.params.id;
        const Task = await task.find({taskName : TaskName});
        const TaskIdToUpdate = Task[0]["_id"];

        const updatedTask = await task.findByIdAndUpdate(TaskIdToUpdate, {Finalized : !(Task[0]["Finalized"])});

        return res.status(201).json(updatedTask);
    }
    catch(err){
        return res.status(500).json({
            error : "An error has occured!"
        });
    }
}
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000

//Connecting to mongodb
mongoose.connect("mongodb://localhost:27017/ToDoListProject");

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.html");
})

const taskRoutes = require("./routes/tasksRoutes");
app.use("/api", taskRoutes);

app.use(express.json());

app.listen(port, ()=>{
    console.log(`App is listening on the port ${port}`)
})
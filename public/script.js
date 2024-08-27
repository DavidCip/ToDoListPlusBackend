//Retrieve todo from local storage / initialize an empty array*/

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput= document.getElementById("todoInput");
const todoList= document.getElementById("todoList");
const todoCount= document.getElementById("todoCount");
const addButton= document.querySelector(".btn");
const deleteButton=document.getElementById("deleteButton");
const counterTask=document.getElementById("counterTask");

//Initiere
document.addEventListener("DOMContentLoaded",function(){
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener('keydown',function(event){
        if(event.key==="Enter"){
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

async function displayTasks(){
    todo = await getAllTasks();
    todoList.innerHTML="";
    todo.forEach((item,index) =>{
        const p = document.createElement("p");
        console.log(item.disabled);
        p.innerHTML= `
            <div class="todo-container">

                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.Finalized ? "checked":""}/>

                <p id="todo-${index}" class="${item.Finalized ? "disabled":""}"
                onclick="editTask(${index})">
                    ${item.taskName}
                </p>

            </div>
        `;

        p.querySelector(".todo-checkbox").addEventListener("change",()=>{
            toggleTask(index);
        })
        todoList.appendChild(p)
    } )
    counterTask.innerText=todo.length;
}

async function getAllTasks() {
    try{
        let allTasks = await fetch("http://localhost:3000/api/tasksGetList");
        return await allTasks.json();    
    }
    catch(err){
        console.log("error: "+err);
    }
}

async function addTask(){

    const newTask=todoInput.value.trim();

    if(newTask=="")
        return console.log("TASK IS EMPTY!");

    try{
        let response = await fetch("/api/taskAdd/"+newTask);
        let TaskSuccess = await response.json();
        console.log(TaskSuccess);
        await displayTasks();
    }
    catch(error){
        console.log(error);
    }
}

async function deleteAllTasks(){
    try{
        let response = await fetch("/api/taskRemoveAll");
        let TaskSuccess = await response.json();
        console.log(TaskSuccess);
        displayTasks();
    }
    catch(error){
        console.log(error);
    }
}

async function toggleTask(index){
    /*
    todo[index].disabled=!todo[index].disabled;
    saveToLocalStorage();*/

    try{
        todoName = todo[index].taskName;
        let response = await fetch("/api/taskSwitchFinalized/"+todoName);
        let TaskSuccess = await response.json();
        console.log(TaskSuccess);
        displayTasks();
    }
    catch(error){
        console.log(error);
    }
}



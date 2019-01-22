 function Task(taskName,isDone){
    this.taskName = taskName;
    this.isDone = isDone;
}


function insertTaskCount(val){
    p = document.querySelector("#taskCount");
    p.textContent = val + " Tasks TO DO";
}


function addTask(e){

    e.preventDefault();
    item = document.querySelector("#value");
    
    val = item.value;
    item.value = "";
    addTaskInsertHtml(val);
    storageTasks = JSON.parse(window.localStorage.getItem('toDoTasks'));

    if(!storageTasks)
        storageTasks = [];
    
    task = new Task(val,false);
    storageTasks.push(task);
    insertTaskCount(storageTasks.length);
    console.log(storageTasks)
    window.localStorage.setItem('toDoTasks',JSON.stringify(storageTasks));

}

function addTaskInsertHtml(val,ind){
    
    //console.log(val);

    li = document.createElement("li")
    checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("class","mr-2");
    checkbox.setAttribute("id","taskCheckbox");
    checkbox.addEventListener("change",handleCheckbox);

    //if(storageTasks[ind ].isDone == true){
      //  checkbox.checked = true;
    //}

    li.className = "list-group-item";
    li.id = "task"

    ul = document.querySelector(".list-group");

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(val));
    ul.appendChild(li);
  
}


function DeletAllTask(){
    debugger;
    ul = document.querySelector(".list-group");
    length = ul.children.length;
    console.log("saurabh");
    console.log(length);
    var i = 0;
    while (i < length) {
        
        if(ul.children[i] && ul.children[i].firstChild){
            if(ul.children[i].firstChild.checked){
                ul.removeChild(ul.children[i]);
                storageTasks.splice(i-1,1);
                --i;
            }

        }
        ++i;
    }

    insertTaskCount(storageTasks.length);
    window.localStorage.setItem('toDoTasks',JSON.stringify(storageTasks));
    //window.localStorage.removeItem('toDoTasks');

}


function handleCheckbox(e){
    if(e.target.checked){
         //debugger;
        val = e.target.parentNode.textContent;
        par = e.target.parentNode;
        par.textContent = "";
        console.log(par.innerHTML)
        del = document.createElement("s");
        del.appendChild(document.createTextNode(val));
        console.log(par);
        par.appendChild(e.target);
        par.appendChild(del);
        

        
    }
    
    else{
        
        par = e.target.parentNode
        val = e.target.parentNode.textContent;
        par.textContent = "";
        par.appendChild(e.target);
        par.appendChild(document.createTextNode(val));
        //e.target.parentNode.appendChild(e.target);
        //e.target.parentNode.appendChild(document.createTextNode(val));
    }
}




document.querySelector("#toDoForm")
.addEventListener("submit",addTask);


document.querySelector("#delete")
.addEventListener("click",DeletAllTask);




storageTasks = JSON.parse(window.localStorage.getItem('toDoTasks'));

if(storageTasks){
console.log(storageTasks.length);

insertTaskCount(storageTasks.length);
storageTasks.forEach((element,ind) => {
    addTaskInsertHtml(element.taskName,ind);
});
}

const submitBtn = document.querySelector('.submit');
const pendingTasksList = document.querySelector('.pending-tasks-list');
const completedTasksList = document.querySelector('.completed-tasks-list');
const inpElement = document.querySelector('#todo');
//state = 0 for adding,state = 1 for updating
let state = 0;

function addTodo() {
    let liElement = document.createElement('li');
    let checkBox = document.createElement('input');
    let spanElement = document.createElement('span');
    let editElement = document.createElement('i');
    let deleteElement = document.createElement('i');
    let upElement = document.createElement('i');
    let downElement = document.createElement('i');

    checkBox.type = "checkbox";
    spanElement.textContent = inpElement.value;
    editElement.classList.add('far','fa-edit');
    deleteElement.classList.add('far','fa-trash-alt');
    upElement.classList.add('fas','fa-arrow-up');
    downElement.classList.add('fas','fa-arrow-down');

    liElement.appendChild(checkBox);
    liElement.appendChild(spanElement);
    liElement.appendChild(editElement);
    liElement.appendChild(deleteElement);
    liElement.appendChild(upElement);
    liElement.appendChild(downElement);

    pendingTasksList.appendChild(liElement);
    inpElement.value = "";
}


submitBtn.addEventListener('click',function() {
    if(inpElement.value == "") {
        alert("Enter something first!");
        return;
    }
    if(state == 0) {
        addTodo();
    }
});

function deleteTodo(element) {
    element.parentNode.remove();
}

pendingTasksList.addEventListener('click',function(e) {
    let work;
    let targetElement = e.target;
    if(targetElement.classList.contains('fa-edit')) {
        work = 1;
    } else if(targetElement.classList.contains('fa-trash-alt')) {
        work = 2;
        deleteTodo(targetElement);
    } else if(targetElement.classList.contains('fa-arrow-up')) {
        work = 3;
    } else if(targetElement.classList.contains('fa-arrow-down')) {
        work = 4;
    } else if(targetElement.type == "checkbox") {
        work = 5;
    }
});
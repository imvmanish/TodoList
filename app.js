const submitBtn = document.querySelector('.submit');
const pendingTasksList = document.querySelector('.pending-tasks-list');
const completedTasksList = document.querySelector('.completed-tasks-list');
const inpElement = document.querySelector('#todo');
//state = 0 for adding,state = 1 for updating
let state = 0;
let updateElement;

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
    } else if(state == 1) {
        updateElement.textContent = inpElement.value;
        submitBtn.textContent = "Add Todo";
        inpElement.value = "";
        state = 0;
    }
});

function deleteTodo(element) {
    element.parentNode.remove();
}

function updateTodo(element) {
    submitBtn.textContent = "Update";
    inpElement.value = element.parentNode.firstChild.nextSibling.textContent;
    state = 1;
    updateElement = element.parentNode.firstChild.nextSibling;
} 

function moveUp(element,pending) {
    let li = element.parentNode;
    if(pending) {
        if(li.previousElementSibling)
            pendingTasksList.insertBefore(li,li.previousElementSibling);
    } else {
        if(li.previousElementSibling)
            completedTasksList.insertBefore(li,li.previousElementSibling);
    }
}

function moveDown(element,pending) {
    let li = element.parentNode;
    if(pending) {
        if(li.nextElementSibling)
            pendingTasksList.insertBefore(li.nextElementSibling,li);
    } else {
        if(li.nextElementSibling)
            completedTasksList.insertBefore(li.nextElementSibling,li);
    }
}

function moveToCompleted(element) {
    let a = element.parentNode;
    completedTasksList.append(a);
    a.firstChild.nextElementSibling.style.textDecoration = "line-through";
    a.firstChild.nextElementSibling.style.color = "gray";
}

pendingTasksList.addEventListener('click',function(e) {
    let targetElement = e.target;
    if(targetElement.classList.contains('fa-edit')) {
        updateTodo(targetElement);
    } else if(targetElement.classList.contains('fa-trash-alt')) {
        deleteTodo(targetElement);
    } else if(targetElement.classList.contains('fa-arrow-up')) {
        moveUp(targetElement,true);
    } else if(targetElement.classList.contains('fa-arrow-down')) {
        moveDown(targetElement,true);
    } else if(targetElement.type == "checkbox") {
        moveToCompleted(targetElement);
    }
});

function moveToPending(element) {
    let a = element.parentNode;
    pendingTasksList.append(a);
    a.firstChild.nextElementSibling.style.textDecoration = "none";
    a.firstChild.nextElementSibling.style.color = "black";
}

completedTasksList.addEventListener('click',function(e) {
    let targetElement = e.target;
    if(targetElement.classList.contains('fa-edit')) {
        updateTodo(targetElement);
    } else if(targetElement.classList.contains('fa-trash-alt')) {
        deleteTodo(targetElement);
    } else if(targetElement.classList.contains('fa-arrow-up')) {
        moveUp(targetElement,false);
    } else if(targetElement.classList.contains('fa-arrow-down')) {
        moveDown(targetElement,false);
    } else if(targetElement.type == "checkbox") {
        moveToPending(targetElement);
    }
});
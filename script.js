const input = document.getElementById('input')
const addBtn = document.getElementById('addBtn')
const list = document.getElementById('list')
const checkBtn = document.querySelector('.checkBtn')
const closeBtn = document.querySelector('.closeBtn')
const form = document.getElementById('form')

let LIST, id;

let checkTrue = 'fa-check-circle';
let checkFalse = 'fa-circle';
let lineTrough = 'line-through';

let data = localStorage.getItem('todos');

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadItems(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadItems(array) {
    array.forEach((arr) => {
        addItem(arr.text, arr.id, arr.done);
    })
}

// Variables

function addItem(text, id, done) {

    let DONE = done ? checkTrue : checkFalse;
    let LINE_TROUGH = done ? lineTrough : '';

    let li =
        `
    <li>
        <i class="far ${DONE} checkBtn" job="complete" id="${id}"></i>
        <div class="text-item ${LINE_TROUGH} id="text">${text}</div>
        <i class="fas fa-times-circle closeBtn" job="delete" id="${id}"></i>
    </li>
    `

    list.insertAdjacentHTML('beforeend', li);
}

addBtn.addEventListener('click', setItem);

function setItem(e) {
    let text = input.value;

    if (text) {
        addItem(text, id, false);

        LIST.push({
            text: text,
            id: id,
            done: false
        });

        localStorage.setItem('todos', JSON.stringify(LIST))

        id++;

    }
    input.value = '';


    e.preventDefault();
}

function completeToDo(element) {
    element.classList.toggle(checkTrue);
    element.classList.toggle(checkFalse);
    element.parentNode.querySelector(".text-item").classList.toggle(lineTrough);

    LIST[element.id].done = LIST[element.id].done ? false : true;

    localStorage.setItem('todos', JSON.stringify(LIST));
}

list.addEventListener('click', (e) => {

    if (e.target.attributes.job.value == 'complete') {
        completeToDo(e.target)
    }
    else if (e.target.attributes.job.value == 'delete') {
        deleteItem(e.target);

    }
})



let deleteItem = (element) => {
    if (element.classList == 'fas fa-times-circle closeBtn') {
        element.parentElement.remove();
        LIST.forEach((item, index) => {
            if (item.id == element.id) {
                LIST.splice(index, 1);
            }
            localStorage.setItem('todos', JSON.stringify(LIST));
            id = LIST.length
        })
    }
}

// let checkItem = (element) => {
//     LIST[element.id].done = LIST[element.id].done ? false : true;
//     localStorage.setItem('todos', JSON.stringify(LIST));
// }


function calculateDaysBetwwenDates(begin, end){
    
}
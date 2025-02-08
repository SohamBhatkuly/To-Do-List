let addModal = document.querySelector('.add');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
// console.log(modal)


let saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', () => {
    addTasks();
    modal.style.display = 'none';
    display();
})


function display() {
    console.log(tasks);
    let taskDisplay = document.querySelector('.tasks');
    taskDisplay.style.display = "grid";
    taskDisplay.style.gridTemplateColumns = "repeat(4, 1fr)";
    taskDisplay.style.padding = "1rem";
    // taskDisplay.style.border = "1px solid black";
    taskDisplay.style.height = "4rem";
    taskDisplay.innerHTML = ``;
    tasks.forEach((x) => {
        let { title, description, taskDate } = x;
        let entry = document.createElement('div');
        entry.innerHTML = `
        <div class="tiles">
            <div class="tile-title">${title}</div>
            <div class="tile-description">${description}</div>
            <div class="tile-date">${taskDate}</div>
        </div>
        `;
        taskDisplay.appendChild(entry);
    });
}

let tasks = [];
function addTasks() {
    let title = document.querySelector('.title-value').value;
    let description = document.querySelector('.description-text').value;
    let datetime = document.querySelector('.date-time').value;
    let date = datetime.split(" ");
    let [year, month, day] = date[0].split("-");
    let [hours, minuites] = date[1].split(":");
    let taskDate = new Date(year, month, day, hours, minuites);
    let task = {
        title, description, taskDate
    };
    tasks.push(task);
}




addModal.addEventListener('click', () => {
     modal.style.display = 'block';
})

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    display();
})


flatpickr("input[type=datetime-local", {
      enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
});
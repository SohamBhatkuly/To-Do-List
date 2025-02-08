let addModal = document.querySelector('.add');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
// console.log(modal)
let tasks = JSON.parse(localStorage.getItem("data")) || [];
display();
let saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', () => {
    addTasks();
    modal.style.display = 'none';
    display();
})

let body = document.querySelector('body');
let tiles=document.querySelector('.tiles')

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


function tileDetail(e) {
    alert(e);
}



function display() {
    console.log(tasks);
    
    tasks.sort((a, b) => {
        let d1 = new Date(a.taskDate);
        let d2 = new Date(b.taskDate);
        return d1 - d2;
    })
    // console.log(tasks);

    let taskDisplay = document.querySelector('.tasks');
    taskDisplay.style.display = "grid";
    taskDisplay.style.gridTemplateColumns = "repeat(5, 1fr)";
    taskDisplay.style.padding = "1rem";
    // taskDisplay.style.border = "1px solid black";
    taskDisplay.style.height = "4rem";
    taskDisplay.innerHTML = ``;
    tasks.forEach((x) => {
        let { title, description, taskDate, id } = x;
        taskDate=new Date(taskDate);
        let dt = taskDate.toDateString();
        let tm = taskDate.toTimeString();
        tm = tm.split(" ");
        let entry = document.createElement('div');
        entry.style.height = "150px";
        // entry.style.overflow = "auto";
        entry.style.display = "flex";
        entry.style.paddingBottom = "1rem";
   

        entry.innerHTML = `
        <div class="tiles" onclick="tileDetail('${id}')">
            <div class="tile-title">${title}</div>

            <div class="tile-date">${dt}</div>

            <div class="tile-time">${tm[0]}</div>
        </div>
        `;
        taskDisplay.appendChild(entry);
    });
}



function addTasks() {
    let title = document.querySelector('.title-value').value;
    let description = document.querySelector('.description-text').value;
    let datetime = document.querySelector('.date-time').value;
    let id = crypto.randomUUID();
    let date = datetime.split(" ");
    let [year, month, day] = date[0].split("-");
    let [hours, minuites] = date[1].split(":");
    let taskDate = new Date(year, month-1, day, hours, minuites);
    let task = {
        title, description, taskDate, id
    };
  
    tasks.push(task);
    localStorage.setItem("data", JSON.stringify(tasks));
}

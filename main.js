let addModal = document.querySelector('.add');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
let tasks = JSON.parse(localStorage.getItem("data")) || [];
let closePopup = document.querySelector('.close-popup')
let body = document.querySelector('body');
let tiles = document.querySelector('.tiles')
let popup = document.querySelector('.popup');
    let taskDisplay = document.querySelector('.tasks');

function deleteTask(id) {
    // console.log(id)
    console.log(tasks instanceof Array);
    tasks = tasks.filter(x => x.id != id);
    console.log(tasks);
    localStorage.setItem("data", JSON.stringify(tasks));
    closePopup.dispatchEvent(new Event("click"));
}


display();

let saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', () => {
    addTasks();
    modal.style.display = 'none';
      document.body.style.position = '';
    document.body.style.width = '';
    display();
})


function popupDisplay(title, date, time, description, id){
    popup.style.display = 'block';

    requestAnimationFrame(() => {
        displayPopup(title, date, time, description, id);
    });

}

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    display();
})


addModal.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.position = "fixed";
    document.body.style.width = `100%`;
})

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
      document.body.style.position = '';
    document.body.style.width = '';
})


flatpickr("input[type=datetime-local", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",

});

function displayPopup(title, date, time, description, id) {

   title =  title.charAt(0).toUpperCase() + title.slice(1);
const detail = document.querySelector('.details');
    detail.innerHTML = `
        <div class="popup-title">${title}</div>
            <div class="popup-date">${date}</div>
            <div class="popup-time">${time}</div>
            <div class="popup-description"><p>${description}</p></div>
        <div class="delete" onclick="deleteTask('${id}')">
                <i class="bi bi-trash3"></i>
        </div>
    `;

}

function display() {
    if (tasks) {
        tasks.sort((a, b) => {
            let d1 = new Date(a.taskDate);
            let d2 = new Date(b.taskDate);
            return d1 - d2;
        })
    }
        let fragment = document.createDocumentFragment();

    taskDisplay.style.display = "grid";
    taskDisplay.style.gap = "2rem";
    taskDisplay.style.gridTemplateColumns = "repeat(5, 1fr)";
    taskDisplay.style.padding = "2rem";
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

        entry.style.display = "flex";
        entry.style.paddingBottom = "1rem";


        entry.innerHTML = `
        <div class="tiles" onclick="popupDisplay('${title}', '${dt}', '${tm[0]}', '${description}', '${id}')">
            <div class="tile-title">${title}</div>

            <div class="tile-date">${dt}</div>

            <div class="tile-time">${tm[0]}</div>
        </div>
        `;
        fragment.appendChild(entry);
    });

    requestAnimationFrame(() => {
        taskDisplay.appendChild(fragment); 
    });
}



function addTasks() {
    let title = document.querySelector('.title-value').value;
 let description = document.querySelector('.description-text').value.replace(/\n/g, " ");;

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

let addModal = document.querySelector('.add');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
// console.log(modal)
let tasks = JSON.parse(localStorage.getItem("data")) || [];
let closePopup = document.querySelector('.close-popup')
let body = document.querySelector('body');
let tiles = document.querySelector('.tiles')
let popup = document.querySelector('.popup');
    let taskDisplay = document.querySelector('.tasks');




display();

let saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', () => {
    addTasks();
    modal.style.display = 'none';
      document.body.style.position = '';
    document.body.style.width = '';
    //    document.body.style.overflowY = "auto";
    display();
})


function popupDisplay(title, date, time, description){
    popup.style.display = 'block';
    //   document.body.style.position = "fixed";
    // document.body.style.width = `100%`;

    requestAnimationFrame(() => {
        displayPopup(title, date, time, description);
    });

}

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    //       document.body.style.position = '';
    // document.body.style.width = '';
    // document.body.style.overflowY = "auto";
})


addModal.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.position = "fixed";
    document.body.style.width = `100%`;
    // const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // document.body.style.paddingRight=`${scrollbarWidth}px`
})

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
      document.body.style.position = '';
    document.body.style.width = '';
    //   document.body.style.overflowY = "auto";
})


flatpickr("input[type=datetime-local", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",

// onOpen: () => {
//   document.body.classList.add("no-scroll");
// },

// onClose: () => {
//   document.body.classList.remove("no-scroll");
    // }
    // onValueUpdate: function (selectedDates, dateStr, instance) {

    // }

});



function displayPopup(title, date, time, description) {
   title =  title.charAt(0).toUpperCase() + title.slice(1);
const detail = document.querySelector('.details');
    detail.innerHTML = `
  
        <div class="popup-title">${title}</div>
            <div class="popup-date">${date}</div>
            <div class="popup-time">${time}</div>
            <div class="popup-description">${description}</div>
    `;

}



function display() {
    console.log(tasks);
    
    tasks.sort((a, b) => {
        let d1 = new Date(a.taskDate);
        let d2 = new Date(b.taskDate);
        return d1 - d2;
    })
    // console.log(tasks);
        let fragment = document.createDocumentFragment();

    taskDisplay.style.display = "grid";
    taskDisplay.style.gap = "2rem";
    taskDisplay.style.gridTemplateColumns = "repeat(5, 1fr)";
    taskDisplay.style.padding = "2rem";
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
        <div class="tiles"  onclick="popupDisplay('${title}', '${dt}', '${tm[0]}', '${description}')"">
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

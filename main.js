let addModal = document.querySelector('.add');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
// console.log(modal)
let tasks = JSON.parse(localStorage.getItem("data")) || [];
let closePopup = document.querySelector('.close-popup')
let body = document.querySelector('body');
let tiles = document.querySelector('.tiles')
let popup = document.querySelector('.popup');
display();

let saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', () => {
    addTasks();
    modal.style.display = 'none';
    display();
})

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
})


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


function popupDisplay(title, date, time, description){
    popup.style.display = 'block';
    requestAnimationFrame(() => {
        displayPopup(title, date, time, description);
    });

}

function displayPopup(title, date, time, description) {
    console.log(title, date, time, description);
    popup.innerHTML = ``;
    let fragment1 = document.createDocumentFragment();
    fragment1.innerHTML = ``;
    let div2 = document.createElement('div');
    div2.innerHTML = " ";
    div2.innerHTML = `
         <button class="close-popup">
                    <i class="bi bi-x-lg"></i>
            </button>
        <div class="popup-title">${title}</div>
            <div class="popup-date">${date}</div>
            <div class="popup-time">${time}</div>
            <div class="popup-description">${description}</div>
    `;
    fragment1.appendChild(div2);
    requestAnimationFrame(() => {
        popup.appendChild(fragment1);
    })
}



// function tileDetail(e) {
//     alert(e);
//     let div1 = document.createElement('div'); 
//     div1.setAttribute('class', 'modal');
//     div1.innerHTML = `
//     <div class="display-modal">
//                 <button class="close">
//                     <i class="bi bi-x-lg"></i>
//                 </button>
//                 <form class="form">
//                     <div class="title">
//                         <h4>Title</h4>
//                         <input type="text" class="title-value">
//                     </div>
//                     <div class="description">
//                         <h4>Description</h4>
//                         <textarea name="description-text" class="description-text" maxlength="200"></textarea>
//                     </div>
//                     <div class="date">
//                         <h4>Date</h4>
//                         <input type="datetime-local" class="date-time">
//                     </div>
//                 </form>`;
//     body.appendChild(div1);
// }



function display() {
    console.log(tasks);
    
    tasks.sort((a, b) => {
        let d1 = new Date(a.taskDate);
        let d2 = new Date(b.taskDate);
        return d1 - d2;
    })
    // console.log(tasks);
        let fragment = document.createDocumentFragment();
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

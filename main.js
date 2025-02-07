let addModal = document.querySelector('.add');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
// console.log(modal)


let saveButton = document.querySelector('.save-button');
saveButton.addEventListener('click', () => {
    addTasks();
        modal.style.display = 'none';
})



let tasks = [];
function addTasks(){
    let title = document.querySelector('.title-value').value;
    let description = document.querySelector('.description-text').value;
    let datetime = document.querySelector('.date-time').value;
    let date = datetime.split(" ");
    let [ year, month, day ]= date[0].split("-");
    let [hours, minuites] = date[1].split(":");
    let taskDate = new Date(year, month, day, hours, minuites);
    let task = {
title, description, taskDate
    };
    tasks.push(task);
    console.log(task);
}

addModal.addEventListener('click', () => {
     modal.style.display = 'block';
})



closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
})


flatpickr("input[type=datetime-local", {
      enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
});
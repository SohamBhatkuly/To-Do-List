let addModal = document.querySelector('.add');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
console.log(modal)

addModal.addEventListener('click', () => {
     modal.style.display = 'block';
})



closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
})


flatpickr("input[type=datetime-local", {
      enableTime: true,
    dateFormat: "d-m-Y H:i",
    minDate: "today",
});
// console.log('Client Side Javascript file is loaded!');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    // event.preventDefault() function will prevent browser to refresh or render a new page when we click on search button and allow us 
    // to do whatever we want and let the callback function rum.
    event.preventDefault();

    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';

    const location = search.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error;
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        });
    });
});
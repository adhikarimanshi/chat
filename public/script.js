console.log("Hello i am script.js");

const form = document.querySelector('form');
const messageList = document.querySelector('#message-list');

if (messageList === null) {
  console.error('The #message-list element does not exist in the HTML');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const message = document.querySelector('#message').value;

  const data = {
    username: username,
    message: message
  };

  fetch('/api/message', 
  {
    method: 'POST',
    headers: 
    {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const li = document.createElement('li');
    li.textContent = `${data.username}: ${data.message}`;
    messageList.appendChild(li);
  })
  .catch(error => console.error(error));
});

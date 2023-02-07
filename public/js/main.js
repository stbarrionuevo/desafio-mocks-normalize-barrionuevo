const socket = io.connect();

function validateEmail(email) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if(email.match(mailformat)) {
    return true
  } else {
    alert("You have entered an invalid email address!");
    return false
  }
}




const formulario = document.getElementById('formulario')
formulario.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formulario[0].value,
        price: formulario[1].value,
        thumbnail: formulario[2].value
    }
    socket.emit('update', producto)
    formulario.reset()
})


socket.on('productos', data => {
  let productos = data
 
  let htmlToRender = `
  <table class="table container">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Picture</th>
      </tr>
    </thead>
    </tbody>`
  
  productos.forEach(( element ) => {
    htmlToRender = htmlToRender + `
    <tr>
      <td>${element.title}</td>
      <td>${element.price}</td>
      <td><img src=${element.thumbnail} style="max-width: 50px; height: auto;"</td>
    </tr>` 
  })
  
  htmlToRender = htmlToRender + '</tbody></table>'
  document.querySelector('#tabla').innerHTML = htmlToRender
})


const userEmail = document.getElementById("userEmail")
const userName = document.getElementById("userName")
const userSurname = document.getElementById("userSurname")
const userAge = document.getElementById("userAge")
const userMensaje = document.getElementById("userMsj")

document.getElementById("sendBtn").addEventListener("click", ev => {
  if ( validateEmail(userEmail.value) ) {
    if ( userMensaje.value ){
    
      socket.emit('newMsj', {
        author: {
          id: userEmail.value,
          name: userName.value,
          surname: userSurname.value,
          age: userAge.value,
         
        },
        text: userMensaje.value
       })

       userMensaje.value = ''

    } else {
      alert("Write your message")
    }
  }
})



socket.on('mensajes', data => {
  
  let htmlChatToRender = ``
  
  data.forEach(( element ) => {
    htmlChatToRender = htmlChatToRender + `
    <div>
      <div class="user">User: ${element.user} </div>
      <div class="date">${element.date} </div>
      <div class="mensaje">${element.message}</div>
    </div>
    `
    console.log(element)
  })

  document.querySelector('#chat').innerHTML = htmlChatToRender
})
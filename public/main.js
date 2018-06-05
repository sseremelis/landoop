//input fields animations
let inputFields = document.getElementsByClassName('input')
let blurHandler = function() {
  if (this.value.trim() != '') {
    this.classList.add('has-val')
  } else {
    this.classList.remove('has-val')
  }
}
Array.from(inputFields).forEach(element => {
  element.addEventListener('blur', blurHandler)
})

var authTimeout = 3000

//Ajax form submit
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault()
  let form = document.getElementById('login-form')
  let formData = new FormData(form)

  document.getElementById('login-form-btn').disabled = true
  document.getElementById('login-form-btn').classList.add('disabled-btn')

  var request = new XMLHttpRequest()
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //if everything is ok, and pass correct, wait and redirect
      document.getElementById('message').innerHTML =
        'Login successfull! You are being redirected'
      document.getElementById('message').classList.add('success')
      document.getElementById('message').classList.remove('hidden')
      setTimeout(() => {
        window.location.replace('http://landoop.com')
      }, authTimeout)
    }
    if (this.readyState == 4 && this.status != 200) {
      document.getElementById('login-form-btn').disabled = false
      document.getElementById('login-form-btn').classList.remove('disabled-btn')
      document.getElementById('message').innerHTML = this.responseText
      document.getElementById('message').classList.add('error')
      document.getElementById('message').classList.remove('hidden')
    }
  }

  request.addEventListener('error', function(event) {
    alert('Oops! Something went wrong.')
  })
  request.open('POST', '/login')
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  var params = ''
  formData.forEach(function(value, key) {
    params += key + '=' + value + '&'
  })
  request.send(params)
})

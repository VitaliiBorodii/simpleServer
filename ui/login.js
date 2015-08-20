require('./css/login.css');
window.onload = function () {
    var form = document.forms[0];
    /* form.addEventListener('submit', function (e) {
     e.preventDefault();
     var url = location.pathname;
     var emailField = document.getElementById('email');
     var passField = document.getElementById('password');
     var nameField = document.getElementById('name');
     var data = {
     email: emailField ? emailField.value : null,
     password: passField ? passField.value : null,
     name: nameField ? nameField.value : null
     };
     var xhr = new XMLHttpRequest();
     xhr.open('POST', url, true);
     xhr.setRequestHeader('Content-type', 'application/json');
     xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
     var respone;
     try {
     respone = JSON.parse(xhr.responseText);
     } catch (err) {
     console.log(err);
     return
     }
     if (xhr.status === 400) {
     emailField.setCustomValidity(respone.message);
     }
     }
     };
     xhr.send(JSON.stringify(data));
     });*/
};
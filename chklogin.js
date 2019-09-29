console.log('chklogin');

const loginForm = document.querySelector('#signin-form');
loginForm.reset();
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['inputEmail'].value;
    const password = loginForm['inputPassword'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        document.getElementById("wrong-password").style.display = "none";
        document.getElementById("right-password").style.display = "block";
        location.href = "../index.html";
    }).catch(function (error) { // * Edited here
        document.getElementById("wrong-password").style.display = "block";
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
    });;
});
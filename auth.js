
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDIjUPS6jhr6gLoGN7fMpBSURclVKvbRjA",
    authDomain: "craftonline-b7236.firebaseapp.com",
    databaseURL: "https://craftonline-b7236.firebaseio.com",
    projectId: "craftonline-b7236",
    storageBucket: "",
    messagingSenderId: "365512980588",
    appId: "1:365512980588:web:c326978fb4d1f285558049"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.href == 'http://127.0.0.1:5500/views/resister.html') {

    const signupForm = document.querySelector('#signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = signupForm['email'].value;
        const password = signupForm['password'].value;
        console.log(email, password);

        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            localStorage.setItem("user", true);
            signupForm.reset();
        }).catch(function (error) { // * Edited here
            document.getElementById("wrong-password").style.display = "block";
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });
    });
}

if (window.location.href == 'http://127.0.0.1:5500/') {
    // logout
    auth.onAuthStateChanged(user => {
        console.log(user);
        if (user) {
            document.getElementById('navbar-logout').style.display = "block";
            document.getElementById('navbar-signin').style.display = "none";
        } else {
            document.getElementById('navbar-logout').style.display = "none";
            document.getElementById('navbar-signin').style.display = "block";
        }
    })

    function LogOut() {
        auth.signOut().then(() => {
            console.log('logouting!');
            localStorage.setItem("user1", true);
        });
    }
}

if (window.location.href == 'http://127.0.0.1:5500/views/login.html') {
    const loginForm = document.querySelector('#signin-form');
    loginForm.reset();
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm['inputEmail'].value;
        const password = loginForm['inputPassword'].value;

        auth.signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);
            document.getElementById("right-password").style.display = "block";
            location.href = "http://127.0.0.1:5500";
        }).catch(function (error) { // * Edited here
            document.getElementById("wrong-password").style.display = "block";
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });;
    });



}


if (window.location.href == 'http://127.0.0.1:5500/views/products.html') {
    // get Data
    db.collection('comments').get().then(snapshot => {

        console.log(snapshot.docs);
        setupGuides(snapshot.docs);
    });

    const setupGuides = (data) => {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            console.log(guide);

            // comment start

            const productsDom = document.getElementById("ok");
            const div = document.createElement('div');
            div.className = 'media comment-box mt-4';
            div.innerHTML = `
            <div class="media-left">
                <a href="#">
                <img class="img-fluid user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">${guide.User_Name}</h4>
                <p>${guide.Comment}</p>
            </div>
            `;
            productsDom.appendChild(div);
            document.getElementById('comment-section').value = '';

            // comment end
        });
    }

    // only logged in can comment
    auth.onAuthStateChanged(user => {
        console.log(user);
        document.getElementById("alart-msg").style.display = "none";
        if (user) {
            console.log("logged in");
            document.getElementById('btn').addEventListener('click', clicked);
            var i = 0;
            function clicked() {
                var input_value = document.getElementById('comment-section').value;
                const productsDom = document.getElementById("ok");
                const div = document.createElement('div');
                div.className = 'media comment-box mt-4';
                div.innerHTML = `
                    <div class="media-left">
                        <a href="#">
                        <img class="img-fluid user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">${user.email}</h4>
                        <p>${input_value}</p>
                    </div>
                `;
                productsDom.appendChild(div);
                document.getElementById('comment-section').value = '';
                db.collection('comments').add({
                    User_Name: user.email,
                    Comment: input_value
                }).then(() => {
                    document.getElementById('comment-section').value = '';
                    console.log('Comment Added!');
                });
            }
        } else {
            console.log("logged out");
            document.getElementById("btn").addEventListener("click", function () {
                document.getElementById("alart-msg").style.display = "block";
            });
        }
    })
}
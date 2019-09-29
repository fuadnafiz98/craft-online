console.log('form contact js');

const contactForm = document.querySelector('#contactForm');

auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        console.log('1');
        // var name = document.getElementById("name");
        // var email = document.getElementById("email").value;
        document.getElementById("name").value = user.displayName;
        document.getElementById("email").value = user.email;
    } else {
        contactForm.reset();
        console.log('0');
    }
})

contactForm.reset();
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var subject = document.getElementById("msg_subject").value;

    db.collection('feedbacks').add({
        Name: name,
        Email: email,
        Message: message,
        Subject: subject
    }).then(() => {
        contactForm.reset();
        console.log('Message Added!');
        alert("Feedback send!");
    });
});

function LogOut() {
    auth.signOut().then(() => {
        console.log('logouting!');
    });
}

document.getElementById("navbar-logout").addEventListener('click', () => {
    LogOut();
});
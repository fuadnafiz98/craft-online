console.log('from chkindex.js');

auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        document.getElementById('navbar-logout').style.display = "block";
        document.getElementById('navbar-signin').style.display = "none";
        document.getElementById("user_name").innerHTML = `<a href = "./views/account.html"  style="text-decoration: none; color:black;">${user.displayName}</a>`;
        if (user.email == 'admin@gmail.com') {
            console.log(user.email);
            document.getElementById('navbar-feedback').style.display = "block";
        } else {
            document.getElementById("navbar-feedback").style.display = "none";
        }
    } else {
        document.getElementById("user_name").style.display = "none";
        document.getElementById('navbar-logout').style.display = "none";
        document.getElementById('navbar-signin').style.display = "block";
        document.getElementById("navbar-feedback").style.display = "none";
    }
})

function LogOut() {
    auth.signOut().then(() => {
        console.log('logouting!');
        localStorage.setItem("user1", true);
    });
}
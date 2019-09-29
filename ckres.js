console.log('from ckres.js');

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userName = signupForm['name'].value;
    const user_Name = signupForm['userName'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    console.log(email, password);

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        localStorage.setItem("user", true);
        signupForm.reset();
        console.log(cred);

        //* testing 



        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {


                db.collection("account").doc(user.uid).set({
                    Name: userName,
                    Email: email,
                    User_Name: user_Name,
                    Mobile: "Not Provided",
                    City: "Not Provided",
                    Phone: "Not Provided",
                    Address: "Not Provided",
                    Postal_Code: "Not Provided"
                })
                // Updates the user attributes:

                user.updateProfile({ // <-- Update Method here

                    displayName: userName,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"

                }).then(function () {
                    var displayName = user.displayName;
                    // "https://example.com/jane-q-user/profile.jpg"
                    var photoURL = user.photoURL;
                    console.log(displayName);

                }, function (error) {
                    // An error happened.
                });

            }
        });

        //tesing end
    }).catch(function (error) { // * Edited here
        document.getElementById("wrong-password").style.display = "block";
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
    });
});
console.log('productjs');


// get Data
db.collection('comments').get().then(snapshot => {

    console.log(snapshot.docs);
    setupGuides(snapshot.docs);
});

const setupGuides = (data) => {

    var product_id = sessionStorage.getItem('id');
    let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        console.log(guide);
        console.log(product_id);
        if (guide.Product_ID == product_id) {
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
        }
    });
}

// only logged in can comment
auth.onAuthStateChanged(user => {
    console.log(user);
    document.getElementById("alart-msg").style.display = "none";
    if (user) {
        console.log("logged in");
        var product_id = sessionStorage.getItem('id');
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
                        <h4 class="media-heading">${user.displayName}</h4>
                        <p>${input_value}</p>
                    </div>
                `;
            productsDom.insertBefore(div, productsDom.childNodes[0]);
            document.getElementById('comment-section').value = '';
            db.collection('comments').add({
                User_Name: user.displayName,
                Comment: input_value,
                Product_ID: product_id
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
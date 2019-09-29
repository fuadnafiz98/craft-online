console.log('accountjs');

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.displayName);
        var userRealName = user.displayName;

        db.collection('account').get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data().Email);
                if (user.email == doc.data().Email) {
                    document.getElementById("user-name").innerHTML = doc.data().Name;
                    document.getElementById("name").innerHTML = doc.data().Name;
                    document.getElementById("email").innerHTML = doc.data().Email;
                    document.getElementById("phone").innerHTML = doc.data().Phone;
                    document.getElementById("mobile").innerHTML = doc.data().Mobile;
                    document.getElementById("address").innerHTML = doc.data().Address;
                    document.getElementById("city").innerHTML = doc.data().City;
                    document.getElementById("pcode").innerHTML = doc.data().Postal_Code;
                }
            })
        });

        const subBtn = document.getElementById("submit");
        subBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let name = document.getElementById('edit_name').value;
            let phone = document.getElementById('edit_phone').value;
            let mobile = document.getElementById('edit_mobile').value;
            let address = document.getElementById('edit_address').value;
            let city = document.getElementById('edit_city').value;
            let code = document.getElementById('edit_code').value;

            if (name.length == 0) name = userRealName;


            // Set the "capital" field of the city 'DC'
            db.collection("account").doc(user.uid).update({
                Name: name,
                Mobile: mobile,
                City: city,
                Phone: phone,
                Address: address,
                Postal_Code: code
            }).then(() => {
                console.log('Done');
                window.location.reload();

            });
        });

    } else {
        console.log('not');
        // * MUSt add today
        window.alert('Please Login to access Account Details');
        window.location = "../index.html";
    }
});